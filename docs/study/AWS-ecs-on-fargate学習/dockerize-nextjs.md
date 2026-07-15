# Next.js アプリを Docker 化する（ECS デプロイ用）

対象は [Next.js学習ページ フルスタック化ハンズオン](../Next.js学習/フルスタック化ハンズオン.html) で作成した `next-learning` アプリです。まだ手を付けていない場合は先にそちらを完了させてください。

修正が必要なのは以下の 4 ファイル。アプリのロジックは書き換えない。

## ① next.config に `output: 'standalone'` を追加

対象ファイルは `next.config.ts`

```ts
const nextConfig = {
  output: 'standalone',
};
export default nextConfig;
```

これがないと `node_modules` 一式込みの重いイメージになる。

## ② Dockerfile を新規作成

ビルドステージと実行ステージを1セットにした**1ファイル**をアプリのルート（`package.json` がある場所）に置く。`FROM` が2回あるのがマルチステージ構成で、最終イメージには2つ目の `FROM` 以降だけが残る。

ファイルパス: `next-learning/Dockerfile`

```dockerfile
# --- ビルドステージ ---
# bun.lockなのでnpmではなくbun
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
# buildの前に必須。忘れると@prisma/clientエラー
RUN bunx prisma generate
RUN bun run build

# --- 実行ステージ ---
# 既知のHigh 1件(npm同梱tarのCVE-2026-26960)は実行時に使わないnpm由来のため許容。
FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
# コンテナ外(ALB等)からの接続を受けるため全インターフェースで待ち受ける
ENV HOSTNAME=0.0.0.0
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

## ③ .dockerignore を新規作成

ファイルパス: `next-learning/.dockerignore`

```.dockerignore
node_modules
.git
.next
.env*
```

### 作成理由

Dockerfileの `COPY . .` がコピーする範囲を制限するファイル。無くてもビルドは通るが、以下の実害がある。

| 項目           | やらない場合                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `.env*`        | ローカルの `.env`（DB接続文字列など）がイメージに焼き込まれ、ECRにpushした全員が見られる。**セキュリティ事故**                  |
| `node_modules` | ローカルの数百MBがビルドコンテキスト転送に含まれ、ビルドが数分遅くなる。OS違い（Mac/Windows→Linux）のバイナリ混入の原因にもなる |
| `.next`        | ローカルの古いビルド結果が混入し、「手元では直ったのにイメージは古いまま」という不整合の原因になる                              |
| `.git`         | 履歴全体（過去にコミットした秘密情報も含む）がコンテキストに乗り、転送が遅くなる                                                |

## ④ `/api/health` を新規作成（ALB ヘルスチェック用）

ファイルパス: `next-learning/app/api/health/route.ts`

```ts
export function GET() {
  return Response.json({ status: 'ok' });
}
```

ALB がタスクの生死判定に叩くエンドポイント。DB に触らないので、DB 障害時にタスクが巻き添えで再起動されない。

## 動作確認

RDSはプライベート（SGでECSからのみ許可）なのでローカルからは繋げない。ここではローカルのDB（docker compose で起動済みのもの）に繋いで、コンテナが正常起動することだけを確認する。

```bash
docker build -t myapp .
# コンテナ内から見ると localhost は自分自身なので、
# host.docker.internal でホスト側のDBを指す（Linuxは --add-host が必要）
docker run -p 3000:3000 \
  --add-host=host.docker.internal:host-gateway \
  -e DATABASE_URL=postgresql://postgres:postgres@host.docker.internal:5454/recipe_app \
  myapp
```

ブラウザで `localhost:3000` が開いてデータが表示され、`curl localhost:3000/api/health` が `{"status":"ok"}` を返せばECSに載せる準備は完了。RDSとの接続確認はECSデプロイ後にALB経由で行う。

## 次の準備: AWS CLI v2 のセットアップ

ハンズオン6章（ECRへのpush）でAWS CLIを使う。未セットアップなら `aws configure` まで済ませておく。

アクセスキー発行〜configure をスクショ付きで追える記事:
<https://qiita.com/pekosyu/items/743670e8afcc365969ca>

参考（公式）:

- インストール（OS別）: <https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/getting-started-install.html>
- 初期設定 `aws configure`（クイックスタート）: <https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/getting-started-quickstart.html>

`aws sts get-caller-identity` が自分のアカウントIDを返せば設定完了。

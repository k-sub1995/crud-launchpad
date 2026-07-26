# Next.js アプリを Vercel + Neon デプロイ用に整える

対象は [yhk-0707/recipe-app](https://github.com/yhk-0707/recipe-app) の `nextjs-learning` フォルダです。

修正が必要なのは以下の **1ファイルのみ**です。

アプリのロジックは書き換えません。

## ① `package.json` に `postinstall` を追加

対象ファイルは `nextjs-learning/package.json` です。

```json
"scripts": {
  "dev": "next dev --webpack",
  "build": "next build",
  "start": "next start",
  "lint": "biome check",
  "format": "biome format --write",
  "postinstall": "prisma generate"
}
```

このアプリは `@prisma/adapter-pg`（Driver Adapters）を使っています。

`prisma generate` で生成される `@prisma/client` が無いと、`next build` は失敗します。

Vercel には Dockerfile のような「ビルド手順を自分で書く場所」がありません。

その代わり、Vercel は `install` 直後に `postinstall` スクリプトを**自動実行**します。

そこに `prisma generate` を仕込むことで、ビルド前に確実に `@prisma/client` を生成させます。

`recipe-app` に `postinstall` 1行を追加してください。

追加を忘れると、Vercel 上のビルドだけが失敗します。

ローカルの `bun run build` は（一度 generate 済みなら）通ってしまうため、気づきにくい点に注意してください。

## 動作確認

Neon作成前でも、先に手元でビルドが通ることを確認しておきます。

ローカル用 `.env` の `DATABASE_URL` を指したまま、以下を実行してください。

```bash
bun install
bun run build
bun run start
```

`bun run start` の実行後、ターミナルに以下のようなログが出れば成功です。

```text
▲ Next.js xx.x.x
- Local:        http://localhost:3000

✓ Ready in 300ms
```

この状態で `http://localhost:3000` を開き、検索トップページが表示されれば、次の章に進んでOKです。

`bun run build` が通らない場合、疑うべきは `bunx prisma generate` の実行有無です（＝①の `postinstall` が効いているか）。

## Vercel CLI

このハンズオンではVercel CLIを用いてCLIでデプロイします。

事前にインストールします。

```bash
bun install -g vercel
vercel --version
```

アカウント作成・GitHub連携・Neonプロジェクト作成は、ハンズオン1章（環境準備）で扱います。

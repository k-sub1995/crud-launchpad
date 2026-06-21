# CRUD Launchpad Hosting Hands-on

CRUD Launchpadは、GitHub PagesやAWSなどの静的サイト公開方法を比較して学ぶためのハンズオン教材です。  
アプリ本体はlocalStorageで動く小さなCRUDサンプルで、公開方法の違いを確認するための題材として使います。

## 公開サンプル

- [GitHub Pages](https://k-sub1995.github.io/crud-launchpad/)

## このハンズオンで学ぶこと

同じ静的サイトを複数の方法で公開し、設定手順、公開URL、HTTPS、運用のしやすさを比較します。

- GitHub Pagesで静的サイトを公開する
- GitHub ActionsでGitHub Pages公開を自動化する
- AWSアカウントを作成し、初期設定を行う
- S3単体で静的サイトを公開する
- S3 + CloudFrontでHTTPS配信する
- EC2やECS、Amplifyなど他のホスティング方法も比較観点として整理する

## 事前準備

GitHubアカウントとVSCodeを準備します。

- [GitHubアカウント作成手順](https://docs.github.com/ja/get-started/start-your-journey/creating-an-account-on-github)
- [Visual Studio Codeインストール手順](https://qiita.com/ryosuke_tsuda/items/11fd5965e4c965f67e0c)

## ハンズオン目次

### 1. GitHub Pages

GitHub Pagesで公開すると、作成した静的サイトをURLで共有してブラウザから利用できます。  
まずはAWSに入る前に、静的サイト公開の基本を軽く確認します。

- [GUI公開手順](docs/github-pages/01-gui.md)
- [Actions公開手順](docs/github-pages/02-actions.md)

### 2. AWSアカウント作成・初期設定

AWSで作業するために、アカウント作成、rootユーザーMFA、作業用IAMユーザー作成を行います。  
IAM、MFA、リージョンなど、AWSを安全に使うための基本を確認します。

- [AWS公開手順の入口](docs/aws/README.md)
- [AWSアカウント作成手順](docs/aws/00-account-signup.md)
- [AWSアカウント初期設定手順](docs/aws/01-account-initial-setup.md)

### 3. S3単体

S3の静的ウェブサイトホスティングで、最小構成の静的サイト公開を確認します。  
構成は簡単ですが、HTTPSや公開設定の制約もあわせて確認します。

- [必要サービスと構成](docs/aws/02-services.md)
- [S3単体の静的ウェブサイトホスティング手順](docs/aws/03-s3-static-hosting.md)

### 4. S3 + CloudFront

S3を非公開にし、CloudFront経由でHTTPS配信する本番寄りの構成を確認します。  
OAC、キャッシュ、HTTPS、CDNの基本を学べるため、ソリューションアーキテクト志望でも説明しやすい構成です。

- [S3 + CloudFrontの静的サイト公開手順](docs/aws/04-s3-cloudfront-hosting.md)

### 5. EC2

EC2にWebサーバーを立てて公開する方法を確認します。  
静的サイトだけならS3やCloudFrontのほうが軽量ですが、OS、SSH、セキュリティグループ、Webサーバー管理を学ぶにはEC2が向いています。

### 6. Amplify Gen 2

Amplify Gen 2は、認証付きフロントエンドや小さなフルスタックアプリを作る入口として扱います。  
Cognito認証、バックエンド、AI/Agent系アプリへの拡張を見据えやすく、AI活用をアピールしたい場合の加点枠にします。

## 参考サービス

ハンズオンでは扱わないものの、用途のイメージとして知っておきたいサービスです。

| サービス | 使われる場面 | 代表的なアプリ例 | 工数感 |
| --- | --- | --- | --- |
| Lambda + API Gateway | 小さなAPIやサーバーレス処理を作りたいとき | お問い合わせAPI、画像処理API、AI APIの呼び出し口 | 中。API設計、CORS、権限設定が出てくる |
| Amazon Cognito | ユーザー登録、ログイン、認証を入れたいとき | 会員制サイト、管理画面、AIチャットアプリのユーザー認証 | 中〜高。認証・認可の理解が必要 |
| Amazon ECS | コンテナ化したアプリをAWSで動かしたいとき | Node.js / Python API、業務Webアプリ、マイクロサービス | 高。ECR、タスク定義、ALB、VPCなどが必要 |
| AWS App Runner | コンテナやWebアプリを少ない運用負荷で公開したいとき | 小規模API、社内ツール、プロトタイプWebアプリ | 中。ECSより軽いが、静的サイトだけならやや重い |
| Vercel / Netlify | フロントエンドを素早く公開したいとき | React / Next.jsサイト、LP、ポートフォリオ | 低〜中。AWS学習よりフロント公開向き |
| Lightsail | VPS感覚でサーバーを持ちたいとき | WordPress、簡易Webサーバー、小規模検証環境 | 低〜中。分かりやすいがAWS設計力の題材としては弱め |

## 比較まとめ

ハンズオン対象の公開方法を比較すると、次のようになります。

| 公開方法 | 向いている用途 | 特徴 |
| --- | --- | --- |
| GitHub Pages | GitHub上の静的サイト公開 | 無料で始めやすく、教材やドキュメント公開に向く |
| S3単体 | 最小構成の静的ホスティング | 構成は単純だがHTTPSや公開設定に注意が必要 |
| S3 + CloudFront | 本番寄りの静的サイト配信 | HTTPS、キャッシュ、S3非公開化に対応できる |
| EC2 | サーバー構築の学習 | OSやWebサーバー管理を学べるが運用負荷が高い |
| Amplify Gen 2 | 認証付きフロントエンド、AI/Agent系アプリ | Cognito連携やバックエンドを含めて小さく始めやすく、拡張やスケールも見据えやすい |

## 自分のアプリで試す場合

このリポジトリのサンプルアプリを、自分の静的サイトに置き換えて同じ公開手順を試せます。

```text
index.html
styles.css
script.js
assets/
```

`docs/` と `.github/workflows/` は公開手順の資料なので、アプリ本体としては置き換え不要です。

## Appendix: サンプルアプリ

CRUD Launchpadは、ブラウザだけで文章を管理できる小さな静的Webアプリです。  
登録した文章はlocalStorageに保存されるため、サーバーやデータベースは不要です。

機能:

- 文章登録
- 文章検索
- 登録文章の更新
- 登録文章の削除
- localStorageへの保存

使い方:

1. 文章入力欄に保存したい文章を入力する
2. `登録` ボタンで保存する
3. 検索欄にキーワードを入力して文章を絞り込む
4. 登録済み文章の `更新` で編集する
5. 登録済み文章の `削除` で削除する

ローカルで確認する場合:

```bash
python3 -m http.server 8000
```

その後、`http://localhost:8000/` を開きます。

保存データ:

```text
static-launchpad.entries.v1
```

詳しい仕様は [docs/spec.md](docs/spec.md) を参照してください。

## ドキュメント

- [docs/README.md](docs/README.md): ドキュメント目次
- [docs/spec.md](docs/spec.md): サンプルアプリ仕様

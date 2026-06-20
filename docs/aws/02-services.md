# AWS公開に必要なサービス

CRUD Launchpadは静的ファイルだけで動くため、AWSではS3を中心に公開できます。
学習用には、まずS3単体、その後S3 + CloudFrontを比較すると違いが分かりやすいです。

## 構成1: S3単体の静的ウェブサイトホスティング

必要サービス:

- Amazon S3

使う主な機能:

- S3バケット
- 静的ウェブサイトホスティング
- インデックスドキュメント `index.html`
- バケットポリシーによる公開読み取り許可
- S3ウェブサイトエンドポイント

特徴:

- 構成が単純
- S3のウェブサイトエンドポイントで公開できる
- HTTPSに対応しない
- 公開サイトにするには、対象オブジェクトをパブリックに読めるようにする必要がある

教育用の確認ポイント:

- GitHub Pagesと同じ静的ファイルをS3へアップロードするだけで表示できること
- `index.html` が入口になること
- S3ウェブサイトエンドポイントのURL形式
- パブリックアクセス設定とバケットポリシーの意味

## 構成2: S3 + CloudFront

必要サービス:

- Amazon S3
- Amazon CloudFront

使う主な機能:

- S3バケット
- CloudFront distribution
- CloudFront default root object `index.html`
- Origin Access Control (OAC)
- S3バケットポリシー
- CloudFront cache invalidation

特徴:

- CloudFrontのURLでHTTPS公開できる
- S3バケットを非公開にしたままCloudFront経由だけで配信できる
- キャッシュにより更新反映に注意が必要
- S3単体より設定項目が多い

教育用の確認ポイント:

- S3単体ではHTTP、CloudFrontではHTTPSで公開できること
- S3を直接公開しない構成にできること
- OACとバケットポリシーの関係
- ファイル更新後にCloudFrontキャッシュが残る場合があること

## 任意サービス

カスタムドメインを使う場合:

- AWS Certificate Manager (ACM)
- Amazon Route 53、または外部DNSサービス

補足:

- CloudFrontでカスタムドメインを使う場合、ACM証明書は通常 `us-east-1` で発行します。
- CloudFrontのデフォルトドメインを使うだけなら、ACMとRoute 53は不要です。

運用を意識する場合:

- AWS Billing and Cost Management
- AWS Budgets
- Amazon CloudWatch

学習用でも、想定外の料金を避けるために予算アラートは設定しておくと安全です。

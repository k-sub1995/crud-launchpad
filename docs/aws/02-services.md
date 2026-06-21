# AWS公開に必要なサービス

静的ファイルのみで動くアプリを、AWSではS3を用いて簡単に公開できます。

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
- キャッシュによる高速表示が期待できるが、更新反映に注意が必要
- S3単体より設定項目が多い

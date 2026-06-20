# AWS参考ソース

確認日: 2026-06-20

AWS関連の手順は、できるだけ日本語の公式ドキュメントを優先します。
AWSの画面や推奨構成は変わるため、作業前にリンク先の最新内容も確認します。

## AWSアカウント登録と初期設定

- [AWS アカウントを作成する](https://docs.aws.amazon.com/ja_jp/accounts/latest/reference/manage-acct-creating.html)
  - AWSアカウント作成、メール検証、支払い方法、電話確認、サポートプラン選択までの公式手順。
- [AWS アカウントのルートユーザーのベストプラクティス](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/root-user-best-practices.html)
  - ルートユーザーを日常利用しない、MFAを有効化する、アクセスキーを作らないなどの初期セキュリティ確認。
- [AWS アカウントのルートユーザーの多要素認証](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/enable-mfa-for-root.html)
  - ルートユーザーMFAの公式手順。

## S3単体の静的ウェブサイトホスティング

- [Amazon S3 を使用して静的ウェブサイトをホスティングする](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/WebsiteHosting.html)
  - S3で静的ウェブサイトをホストする場合の入口。
- [チュートリアル: Amazon S3 での静的ウェブサイトの設定](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html)
  - バケット作成、静的ウェブサイトホスティング有効化、公開ポリシー、エンドポイント確認までの公式チュートリアル。
- [ウェブサイトエンドポイント](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/WebsiteEndpoints.html)
  - S3ウェブサイトエンドポイントのURL形式、HTTPS非対応、REST APIエンドポイントとの違い。

## S3 + CloudFront

- [安全な静的ウェブサイトの開始方法](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/getting-started-secure-static-website-cloudformation-template.html)
  - S3、CloudFront、OAC、HTTPSを組み合わせた安全な静的サイト構成の公式ガイド。
- [CloudFront 標準ディストリビューションの開始方法](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.SimpleDistribution.html)
  - CloudFront distribution作成の基本。
- [Amazon S3 オリジンへのアクセスを制限する](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html)
  - S3オリジンをOACで保護する公式手順。OAIではなくOACを推奨。

## 料金確認

- [Amazon S3 料金](https://aws.amazon.com/jp/s3/pricing/)
- [Amazon CloudFront 料金](https://aws.amazon.com/jp/cloudfront/pricing/)
- [AWS Pricing Calculator](https://calculator.aws/)

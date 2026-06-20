# AWS公開手順

確認日: 2026-06-20

AWSで静的サイトを公開するための手順入口です。
アカウント作成、初期設定、S3単体公開、S3 + CloudFront公開の順に確認します。

## AWSアカウント登録と初期設定

AWSを初めて使う場合は、アカウント作成後に最低限のセキュリティ設定と料金確認の準備をしてから作業します。

1. 新規アカウント作成
   - [AWSアカウント作成手順](00-account-signup.md)に沿って作成します。
   - 参考サイト：
     - [新規 AWS アカウント作成手順](https://qiita.com/su_j0shuA/items/b1522a770fcb6495a42b)
     - AWSアカウント作成の流れを確認します。

2. アカウント初期設定
   - [AWSアカウント初期設定手順](01-account-initial-setup.md)に沿って設定します。
   - 参考サイト：
     - [AWS アカウント作成後にすぐやるべきこと](https://qiita.com/su_j0shuA/items/d6092e3b4fbae3b513d4)
     - [AWS無料プランで個人開発環境を作る 第1回：アカウント初期設定と課金対策](https://qiita.com/rabbit2145/items/6accf375db722a7daa1f)
     - アカウント作成後に必要な初期設定を実施します。
     - Freeプランを選択して一定期間はコストかからないため、課金対策は任意です。

公式情報:

- [AWS アカウントを作成する](https://docs.aws.amazon.com/ja_jp/accounts/latest/reference/manage-acct-creating.html)
- [AWS アカウントのルートユーザーのベストプラクティス](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/root-user-best-practices.html)
- [AWS アカウントのルートユーザーの多要素認証](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/enable-mfa-for-root.html)

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

## 【参考】料金確認

- [Amazon S3 料金](https://aws.amazon.com/jp/s3/pricing/)
- [Amazon CloudFront 料金](https://aws.amazon.com/jp/cloudfront/pricing/)
- [AWS Pricing Calculator](https://calculator.aws/)

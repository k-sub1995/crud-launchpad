# docs

このディレクトリには、CRUD Launchpadの仕様と公開手順を置きます。
教材として読む順番が分かるように、公開手順は番号付きファイルにしています。

## まず読む

- [spec.md](spec.md): アプリの仕様、localStorage保存形式、動作条件

## GitHub Pages

1. [github-pages/01-gui.md](github-pages/01-gui.md): GitHub PagesをGUIで公開する手順
2. [github-pages/02-actions.md](github-pages/02-actions.md): GitHub ActionsでGitHub Pagesへ公開する手順

補足:

- [images/github-pages/](images/github-pages/): GitHub Pages手順用スクリーンショット

## AWS

- [aws/README.md](aws/README.md): AWS公開手順の入口

1. [aws/00-account-signup.md](aws/00-account-signup.md): AWSアカウント作成手順
2. [aws/01-account-initial-setup.md](aws/01-account-initial-setup.md): AWSアカウント初期設定手順
3. [aws/02-services.md](aws/02-services.md): 必要サービスと構成の整理
4. [aws/03-s3-static-hosting.md](aws/03-s3-static-hosting.md): S3単体の静的ウェブサイトホスティング手順
5. [aws/04-s3-cloudfront-hosting.md](aws/04-s3-cloudfront-hosting.md): S3 + CloudFrontの静的サイト公開手順

読む順番は、AWS公開手順の入口を確認し、AWSアカウント作成、初期設定、必要サービス、S3単体、最後にS3 + CloudFrontへ進む流れです。

補足:

- [images/aws/](images/aws/): AWS手順用スクリーンショット

## スライド

- [slides/](slides/): 説明用スライド

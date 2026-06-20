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

1. [aws/01-sources.md](aws/01-sources.md): AWSアカウント登録、S3、CloudFrontの参考ソース
2. [aws/02-services.md](aws/02-services.md): 必要サービスと構成の整理
3. [aws/03-s3-static-hosting.md](aws/03-s3-static-hosting.md): S3単体の静的ウェブサイトホスティング手順
4. [aws/04-s3-cloudfront-hosting.md](aws/04-s3-cloudfront-hosting.md): S3 + CloudFrontの静的サイト公開手順

読む順番は、まずAWSの参考ソースと必要サービスを確認し、次にS3単体、最後にS3 + CloudFrontへ進む流れです。

## スライド

- [slides/](slides/): 説明用スライド

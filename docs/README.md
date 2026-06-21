# CRUD Launchpad Docs

CRUD Launchpadの仕様と公開手順をまとめたドキュメントです。  
GitHub Pagesでは静的サイトをURLで共有する方法を確認し、AWSではS3やCloudFrontを使った公開方法を比較します。

ご自身のアプリを用いる場合は、以下のファイル本体を置き換えてください。

```text
index.html
styles.css
script.js
assets/
```

## 事前準備

GitHub Pagesで公開する前に、GitHubアカウントとVSCodeを準備します。

- [GitHubアカウント作成手順](https://docs.github.com/ja/get-started/start-your-journey/creating-an-account-on-github)
- [Visual Studio Codeインストール手順](https://qiita.com/ryosuke_tsuda/items/11fd5965e4c965f67e0c)

## 1. GitHub Pages公開

GitHub Pagesで公開すると、作成した静的サイトをURLで共有してブラウザから利用できます。

1. [GUI公開手順](github-pages/01-gui.md)  
   目安: 30分
2. [Actions公開手順](github-pages/02-actions.md)  
   目安: 60分

## 2. AWS公開

AWSでは、S3単体の静的ホスティングと、S3 + CloudFront構成の違いを確認します。

1. [AWS公開手順の入口](aws/README.md)  
   目安: 15分
2. [AWSアカウント作成手順](aws/00-account-signup.md)  
   目安: 60分
3. [AWSアカウント初期設定手順](aws/01-account-initial-setup.md)  
   目安: 90分
4. [AWS公開前の確認事項](aws/02-services.md)  
   目安: 15分
5. [S3単体の静的ウェブサイトホスティング手順](aws/03-s3-static-hosting.md)  
   目安: 90分
6. [S3 + CloudFrontの静的サイト公開手順](aws/04-s3-cloudfront-hosting.md)  
   目安: 90分

## アプリ仕様

- [spec.md](spec.md): アプリの仕様、localStorage保存形式、動作条件

## 画像・資料

- [images/github-pages/](images/github-pages/): GitHub Pages手順用スクリーンショット
- `docs/aws/` 直下の画像: AWS手順用スクリーンショット
- [slides/](slides/): 説明用スライド

## 戻る

- [root README](../README.md)

# S3 + CloudFront 静的サイト公開手順

この手順は、CRUD LaunchpadをS3に置き、CloudFront経由で公開するためのものです。
S3バケットは公開せず、CloudFront Origin Access Control (OAC) を使ってCloudFrontからだけアクセスできる構成にします。

## 構成

```text
Browser
  -> CloudFront
    -> S3 bucket
```

この構成では、S3の静的ウェブサイトホスティングは有効化しません。
CloudFrontのS3オリジンとして通常のS3 RESTエンドポイントを使います。

## 前提

- AWSアカウントが作成済みである
- AWSマネジメントコンソールへサインインできる
- このリポジトリの静的ファイルが手元にある

公開に必要なファイル:

```text
index.html
styles.css
script.js
assets/icon.svg
```

## 手順

### 1. S3バケットを作成する

1. AWSマネジメントコンソールでS3を開く
2. `バケットを作成` を選ぶ
3. バケット名を入力する
4. リージョンを選ぶ
5. `ブロックパブリックアクセス` は有効のままにする
6. バケットを作成する

### 2. 静的ファイルをアップロードする

1. 作成したバケットを開く
2. `オブジェクト` タブを開く
3. 次のファイルとフォルダをアップロードする

```text
index.html
styles.css
script.js
assets/
```

### 3. CloudFront distributionを作成する

1. CloudFrontコンソールを開く
2. `ディストリビューションを作成` を選ぶ
3. Origin domainで作成したS3バケットを選ぶ
4. Origin accessで `Origin access control settings` を選ぶ
5. OACを新規作成する、または既存のOACを選ぶ
6. Viewer protocol policyは `Redirect HTTP to HTTPS` を選ぶ
7. Default root objectに `index.html` を入力する
8. Distributionを作成する

### 4. S3バケットポリシーを設定する

CloudFront distribution作成後、S3バケットにCloudFrontからの読み取りを許可するポリシーを追加します。
CloudFrontコンソールに表示されるポリシー案を使える場合は、それをコピーしてS3バケットポリシーに貼り付けます。

手動で書く場合の形は次の通りです。
`<bucket-name>`、`<account-id>`、`<distribution-id>` は実際の値に置き換えます。

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipalReadOnly",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::<bucket-name>/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::<account-id>:distribution/<distribution-id>"
        }
      }
    }
  ]
}
```

### 5. 公開URLを確認する

CloudFront distributionのデプロイが完了すると、CloudFrontのドメイン名が表示されます。

```text
https://<distribution-domain>.cloudfront.net/
```

このURLを開き、CRUD Launchpadが表示されることを確認します。

## 更新時の注意

S3へファイルを上書きしても、CloudFrontのキャッシュが残っている場合があります。
すぐ反映したい場合は、CloudFrontでinvalidationを作成します。

例:

```text
/*
```

## S3ウェブサイトエンドポイントとの違い

S3単体公開ではS3ウェブサイトエンドポイントを使います。
この場合はHTTPのみで、公開読み取りが必要です。

S3 + CloudFront構成では、S3 RESTエンドポイントをオリジンにし、OACでS3を非公開にできます。
HTTPS公開もCloudFront側で扱えます。

注意点:

- S3ウェブサイトエンドポイントをCloudFrontのオリジンにする場合は、カスタムオリジン扱いになる
- S3ウェブサイトエンドポイントにはOACを使えない
- OACを使う場合は、通常のS3バケットオリジンを使う

## カスタムドメインを使う場合

CloudFrontのデフォルトドメインだけで確認する場合、追加設定は不要です。
独自ドメインを使う場合は、追加で次を設定します。

- ACMで証明書を発行する
- CloudFrontに代替ドメイン名を設定する
- Route 53または外部DNSでCloudFrontへ向ける

CloudFront用のACM証明書は通常 `us-east-1` で作成します。

## 確認ポイント

- CloudFront URLで `index.html` が表示されること
- S3バケットを直接公開していないこと
- CSSとJavaScriptが読み込まれること
- `assets/icon.svg` が表示されること
- 文章の登録、検索、更新、削除が動くこと
- ファイル更新後、必要に応じてinvalidationで反映できること

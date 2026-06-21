# S3 + CloudFront 静的サイト公開手順

この手順では、`03-s3-static-hosting.md` で作成したS3バケットを使い、CloudFront経由で静的サイトを公開します。  
S3単体公開から、S3を非公開にしてCloudFront経由で配信する構成へ変更します。

目安: 90分

## 構成

```text
Browser
  -> CloudFront
    -> S3 bucket
```

この構成では、S3ウェブサイトエンドポイントではなく、CloudFrontのS3オリジンを使います。  
CloudFront Origin Access Control (OAC) を使い、S3バケットはCloudFrontからだけ読める状態にします。

## 前提

- `03-s3-static-hosting.md` の手順が完了している
- S3バケットに静的ファイルがアップロード済みである
- S3単体のウェブサイトエンドポイントで表示確認済みである
- AWSマネジメントコンソールへサインインできる

S3に格納済みのファイル:

```text
index.html
styles.css
script.js
assets/
```

## 手順

### 1. S3単体公開の設定を見直す

03では、S3ウェブサイトエンドポイントで表示するために、S3バケットをパブリックに読み取れる状態にしました。  
CloudFront構成ではS3を直接公開しないため、この公開設定を見直します。

1. S3で対象バケットを開きます。
2. `アクセス許可` タブを開きます。
3. 03で設定した公開読み取り用のバケットポリシーを確認します。
4. CloudFront設定後にOAC用ポリシーへ置き換えるため、現在の公開ポリシーを把握しておきます。

この時点では、まだS3単体公開の設定を削除しなくても構いません。  
CloudFrontで表示確認できてから、S3の直接公開を閉じます。

### 2. CloudFront distributionを作成する

1. CloudFrontコンソールを開きます。
2. `ディストリビューションを作成` を押下します。
3. Origin domainで、03で作成したS3バケットを選択します。
4. S3ウェブサイトエンドポイントではなく、S3バケットのオリジンを選択します。
5. Origin accessで `Origin access control settings` を選択します。
6. OACを新規作成する、または既存のOACを選択します。
7. Viewer protocol policyは `Redirect HTTP to HTTPS` を選択します。
8. Default root objectに `index.html` を入力します。
9. Distributionを作成します。

### 3. S3バケットポリシーをOAC用に置き換える

CloudFront distribution作成後、S3バケットにCloudFrontからの読み取りを許可するポリシーを追加します。  
CloudFrontコンソールに表示されるポリシー案を使える場合は、それをコピーしてS3バケットポリシーに貼り付けます。

03で設定した `Principal: "*"` の公開読み取りポリシーは、CloudFront用のポリシーへ置き換えます。  
これにより、S3を直接公開せず、CloudFront経由だけで読める構成にします。

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

### 4. ブロックパブリックアクセスを有効に戻す

CloudFrontからの読み取り許可を設定したら、S3の直接公開を閉じます。

1. S3で対象バケットを開きます。
2. `アクセス許可` タブを開きます。
3. `ブロックパブリックアクセス` を編集します。
4. `パブリックアクセスをすべてブロック` を有効にします。
5. 変更を保存します。

これで、S3バケットを直接パブリック公開せず、CloudFront経由で配信する状態になります。

### 5. 静的ウェブサイトホスティングを無効化する

CloudFront構成では、S3の静的ウェブサイトホスティングは使いません。  
設定が残っていてもCloudFrontのS3オリジン配信には使いませんが、教材としては混乱しないように無効化します。

1. S3で対象バケットを開きます。
2. `プロパティ` タブを開きます。
3. `静的ウェブサイトホスティング` を編集します。
4. `無効にする` を選択して保存します。

### 6. CloudFront URLを確認する

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

## お片付け

03で作成したS3バケットと、04で作成したCloudFront distributionはここでまとめて削除します。

削除するもの:

- CloudFront distribution
- S3バケット内のオブジェクト
- S3バケット
- 必要に応じてOAC

CloudFront distributionは、先に無効化してデプロイ完了を待ってから削除します。  
反映に時間がかかるため、削除作業は少し待ち時間が発生します。

## 確認ポイント

- CloudFront URLで `index.html` が表示されること
- S3バケットを直接公開していないこと
- CSSとJavaScriptが読み込まれること
- `assets/icon.svg` が表示されること
- 文章の登録、検索、更新、削除が動くこと
- ファイル更新後、必要に応じてinvalidationで反映できること

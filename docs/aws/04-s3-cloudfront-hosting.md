# S3 + CloudFront 静的サイト公開手順

この手順では、`03-s3-static-hosting.md` で作成したS3バケットを使い、CloudFront経由で静的サイトを公開します。  
S3単体公開から、S3を非公開にしてCloudFront経由で配信する構成へ変更します。

目安: 90分

## 参考サイト

- [S3 の静的ウェブサイトホスティングに CloudFront を追加する](https://dev.classmethod.jp/articles/cloudfront-s3web/)
  - ※記事時点からCloudFrontのUIが変わっているため注意。

## S3単体公開から変更すること

S3単体公開では、S3ウェブサイトエンドポイントを使い、S3バケットをパブリックに読み取れる状態にしました。  
本ハンズオンでは以下の構成に変更します。

- S3ウェブサイトエンドポイントではなく、CloudFrontのURLで公開する
- S3バケットの直接公開をやめる
- CloudFront経由の場合のみS3オブジェクトを読めるようにする
- S3の公開読み取り用バケットポリシーを、CloudFront用ポリシーへ置き換える
- S3の静的ウェブサイトホスティングを無効化する
- CloudFront側でHTTPS配信とキャッシュを扱う

## 構成

![alt text](s3-cloudfront-architecture.svg)

この構成図では、AWS公式アーキテクチャアイコンで、ユーザーアクセス、WAF、CloudFront、OAC、非公開S3バケットの関係を示します。

## 前提

- `03-s3-static-hosting.md` の手順が完了している
  - S3バケットに静的ファイルがアップロード済みである
  - S3単体のウェブサイトエンドポイントで表示確認済みである

## 手順

### 1. CloudFront distributionを作成する

1. CloudFrontを開きます。
   ![alt text](image-34.png)
   ※「ご紹介」が出たら✕で閉じます。
2. `ディストリビューションを作成` を押下します。
   ![alt text](image-35.png)
3. Planは無料を選択します。
   ![alt text](image-36.png)
4. Get startedで任意の名前を入力して次へ。
   ![alt text](image-37.png)
5. Specify originのBrowse S3から03で公開したS3バケットを選択して次へ。
   ![alt text](image-38.png)
   ※後ほどS3は非公開にするため、警告が出ても空欄のまま進めます。
6. Enable securityはそのまま次へ。
   ![alt text](image-39.png)
   ※WAFによるセキュリティ保護が有効になります。
7. Create distributionで作成します。
   ![alt text](image-40.png)
   ![alt text](image-41.png)
8. `一般`タブ > 設定 > 編集を押下します。
   Default root objectに `index.html` を入力して変更を保存します。
   ![alt text](image-42.png)

### 2. CloudFront経由で静的サイトにアクセスする

ここまでの設定でCloudFrontが構築できたため、アクセス確認を行う。

1. ディストリビューションの詳細 > ディストリビューションドメイン名をコピーする。
   ![alt text](image-43.png)
   ![alt text](image-44.png)
2. ブラウザにペーストすると、CloudFront経由で静的サイトにアクセスできる。
   ![alt text](image-45.png)
3. URLリンクを見ると、httpsでアクセスしていることが分かる。
   ![alt text](image-46.png)

   ```text
   https://<distribution-domain>.cloudfront.net/
   ```

### 3. ブロックパブリックアクセスを有効に戻す

現状ではS3からも直接アクセスできてしまいます。
CloudFront経由のアクセスに制限するため、S3の直接公開を閉じます。

1. S3 > 公開対象のバケット > `アクセス許可` タブを開きます。
   ![alt text](image-47.png)
2. `ブロックパブリックアクセス` を編集 > `パブリックアクセスをすべてブロック` をチェックして変更を保存します。
   ![alt text](image-48.png)
3. `プロパティ` タブ > `静的ウェブサイトホスティング` > バケットウェブサイトエンドポイントを開き、403でアクセスできなくなります。

![alt text](image-49.png)

### 4. 静的ウェブサイトホスティングを無効化する

3.で確認した通り、CloudFront構成では、S3の静的ウェブサイトホスティングは使わないため無効化します。

1. `プロパティ` タブ > `静的ウェブサイトホスティング`を編集します。
2. 静的ウェブサイトホスティングを無効にして変更を保存します。
   ![alt text](image-50.png)
3. S3を直接開くと404になります。
   ![alt text](image-51.png)
4. CloudFront経由では正常にアクセスできます。
   ![alt text](image-52.png)

## サービス削除

03で作成したS3バケットと、04で作成したCloudFrontをまとめて削除します。  
※特にハンズオンでは消し忘れで思わぬコストが発生するリスクがあります。  
※削除するまでがハンズオンです。

削除するもの:

- CloudFront
- S3

1. CloudFront
   1. CloudFront > ディストリビューションから作成したディストリビューションをチェックします。
      ![alt text](image-53.png)
   2. 無効を選択します。
      ディストリビューションは無効にしてから削除が可能になります。
      ![alt text](image-54.png)
      ※無効化には時間がかかるため数分待ちます。
   3. 無効化されたディストリビューションを開き、Billing > Manage plan > プランをキャンセルします。
      ![alt text](image-57.png)
      ![alt text](image-58.png)
      数分待って再読込すると、Billingの無料プランがキャンセルされてPay-as-yo-goと表示が変わります。
      ![alt text](image-59.png)
   4. ディストリビューション一覧に戻り、無効化されたディストリビューションをチェック、削除を選択します。
      ![alt text](image-60.png)
      ![alt text](image-61.png)
      ※3. を行わないと削除できずエラーとなるため、必ず削除前にプランをキャンセルしてください。  
      ※ディストリビューション作成時にWAFを作っていますが、CloudFrontに紐付いて自動削除されるため個別削除は不要です。
   5. 無効化、削除後は静的サイトにアクセスできなくなります。
      ![alt text](image-62.png)
2. S3
   1. S3 > 静的サイトのS3バケットを選択 > 空にするを選択します。
      ![alt text](image-63.png)
   2. `完全に削除`と入力して空にします。
      ![alt text](image-64.png)
   3. S3 > 静的サイトのS3バケットを選択 > 削除を選択します。
      ![alt text](image-65.png)
   4. バケット名を入力してバケットを削除します。
      ![alt text](image-66.png)
   5. S3バケットが削除され、ハンズオンで使用したサービスの全削除が完了です。
      ![alt text](image-67.png)

## Appendix

### 確認ポイント

- CloudFront URLで `index.html` が表示されること
- S3バケットを直接公開していないこと
- CSSとJavaScriptが読み込まれること
- `assets/icon.svg` が表示されること
- 文章の登録、検索、更新、削除が動くこと
- ファイル更新後、必要に応じてinvalidationで反映できること

### S3ウェブサイトエンドポイントとの違い

S3単体公開ではS3ウェブサイトエンドポイントを使います。  
この場合はHTTPのみで、公開読み取りが必要です。

S3 + CloudFront構成では、S3 RESTエンドポイントをオリジンにし、OACでS3を非公開にできます。  
HTTPS公開もCloudFront側で扱えます。

注意点:

- S3ウェブサイトエンドポイントをCloudFrontのオリジンにする場合は、カスタムオリジン扱いになる
- S3ウェブサイトエンドポイントにはOACを使えない
- OACを使う場合は、通常のS3バケットオリジンを使う

### カスタムドメインを使う場合

CloudFrontのデフォルトドメインだけで確認する場合、追加設定は不要です。  
独自ドメインを使う場合は、追加で次を設定します。

- ACMで証明書を発行する
- CloudFrontに代替ドメイン名を設定する
- Route 53または外部DNSでCloudFrontへ向ける

CloudFront用のACM証明書は通常 `us-east-1` で作成します。

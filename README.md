# CRUD Launchpad

ブラウザだけで文章を管理できる小さな静的Webアプリです。

## URL

- GitHub Pages: 未設定

GitHub PagesのGUI公開手順は [docs/github-pages-gui.md](docs/github-pages-gui.md) を参照してください。

## 機能

- 文章登録
- 文章検索
- 登録文章の更新
- 登録文章の削除
- localStorage への保存

## 使い方

1. 文章入力欄に保存したい文章を入力する
2. `登録` ボタンで保存する
3. 検索欄にキーワードを入力して文章を絞り込む
4. 登録済み文章の `更新` で編集する
5. 登録済み文章の `削除` で削除する

## ローカル起動

ビルドは不要です。`index.html` をブラウザで開くと動作します。

簡易サーバーで開く場合:

```bash
python3 -m http.server 8000
```

その後、`http://localhost:8000/` を開きます。

## ファイル構成

- `index.html`: アプリ本体
- `styles.css`: 画面スタイル
- `script.js`: localStorage を使ったCRUD処理
- `assets/icon.svg`: ヘッダー用アイコン
- `docs/spec.md`: 仕様メモ
- `docs/github-pages-gui.md`: GitHub PagesのGUI公開手順

## 保存データ

文章データはブラウザの localStorage に保存します。

```text
static-launchpad.entries.v1
```

詳しい仕様は [docs/spec.md](docs/spec.md) を参照してください。

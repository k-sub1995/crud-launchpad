# GitHub Pages GUI公開手順

この手順は、GitHubの画面操作だけで CRUD Launchpad を GitHub Pages に公開するためのものです。
このアプリはビルド不要なので、ブランチからそのまま公開します。

## 前提

- GitHubリポジトリにこのプロジェクトがpushされている
- `main` ブランチ直下に `index.html` がある
- リポジトリの `Settings` を変更できる権限がある

## 手順

1. GitHubで対象リポジトリを開く
2. リポジトリ上部の `Settings` を開く
3. 左サイドバーの `Code and automation` から `Pages` を開く
4. `Build and deployment` の `Source` で `Deploy from a branch` を選ぶ
5. `Branch` で `main` を選ぶ
6. フォルダで `/(root)` を選ぶ
7. `Save` を押す

## なぜ `/(root)` を選ぶのか

このプロジェクトでは、公開したいトップページの `index.html` がリポジトリ直下にあります。

```text
crud-launchpad/
  index.html
  styles.css
  script.js
  assets/
  docs/
```

GitHub Pages は、選択した公開フォルダの中にある `index.html` をトップページとして表示します。
そのため、この構成では `/(root)` を選びます。

例えば `hoge/index.html` を公開したい場合は、公開フォルダとして `/hoge` を選びます。
つまり、公開したい `index.html` が入っているフォルダを選びます。

## 公開URLの確認

設定後、同じ `Pages` 画面に公開URLが表示されます。
表示されたURLをREADMEの `GitHub Pages` 欄に記録します。

公開URLの形式は通常、次のどちらかです。

```text
https://<user>.github.io/<repository>/
https://<organization>.github.io/<repository>/
```

反映には数分かかることがあります。

## このアプリで見るポイント

- `index.html` が表示されること
- アイコン、CSS、JavaScriptが読み込まれること
- localStorageに登録した文章が、同じURLでリロード後も残ること

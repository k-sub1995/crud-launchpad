# GitHub Pages Actions公開手順

この手順は、GitHub Actionsを使って CRUD Launchpad を GitHub Pages に公開するためのものです。
GUI公開ではGitHub Pagesがブランチのファイルを直接公開しますが、Actions公開ではworkflowが公開用artifactを作り、そのartifactをGitHub Pagesへデプロイします。

## 前提

- GitHubリポジトリにこのプロジェクトがpushされている
- `.github/workflows/pages.yml` がリポジトリに含まれている
- リポジトリの `Settings` を変更できる権限がある

## 手順

1. GitHubで対象リポジトリを開く
2. リポジトリ上部の `Settings` を開く
3. 左サイドバーの `Code and automation` から `Pages` を開く
4. `Build and deployment` の `Source` で `GitHub Actions` を選ぶ
5. `main` ブランチへpushする
6. リポジトリ上部の `Actions` を開く
7. `Deploy GitHub Pages` workflow が成功していることを確認する
8. `Pages` 画面、またはActions実行結果の `github-pages` environment から公開URLを確認する

## workflowの流れ

`.github/workflows/pages.yml` は、次の順番で動きます。

1. `actions/checkout` でリポジトリのファイルを取得する
2. `actions/configure-pages` でGitHub Pages向けの準備をする
3. `actions/upload-pages-artifact` で公開対象ファイルをartifactとしてアップロードする
4. `actions/deploy-pages` でartifactをGitHub Pagesへデプロイする

このアプリはビルド不要なので、npm install や build はありません。
公開対象はリポジトリ直下です。

## GUI公開との違い

GUI公開では、GitHub Pagesが指定したブランチとフォルダを直接公開します。
このアプリの場合は `main` + `/(root)` です。

Actions公開では、workflowが公開対象をartifactとしてアップロードし、そのartifactをデプロイします。
将来、ビルド処理やテストを追加したい場合は、Actions公開のほうが処理の流れを拡張しやすくなります。

## 注意点

- Pagesの `Source` は `GitHub Actions` にします。
- GUI公開の `Deploy from a branch` とは同時に使いません。
- workflowの `path: .` は、リポジトリ直下を公開対象にする設定です。
- build成果物だけを公開する構成に変えた場合は、`path` を `dist` や `_site` などに変更します。

## 参考

- [GitHub Docs: Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [actions/configure-pages](https://github.com/actions/configure-pages)
- [actions/upload-pages-artifact](https://github.com/actions/upload-pages-artifact)
- [actions/deploy-pages](https://github.com/actions/deploy-pages)

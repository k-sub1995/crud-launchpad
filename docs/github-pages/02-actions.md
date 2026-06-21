# GitHub Pages Actions公開手順

この手順は、GitHub Actionsを使って CRUD Launchpad を GitHub Pages に公開するためのものです。
GUI公開ではGitHub Pagesがブランチのファイルを直接公開しますが、Actions公開ではworkflowが公開用artifactを作り、そのartifactをGitHub Pagesへデプロイします。

目安: 60分

## 前提

- GitHubリポジトリにこのプロジェクトがpushされている
- `.github/workflows/pages.yml` がリポジトリに含まれている
- リポジトリの `Settings` を変更できる権限がある

## GitHub Actionsの権限設定

GitHub Actionsを使うには、リポジトリ側でActionsの実行が許可されている必要があります。
Actionsが無効化されている場合、workflowファイルをpushしても実行されません。

確認場所:

1. GitHubで対象リポジトリを開く
2. `Settings` を開く
3. 左サイドバーの `Code and automation` から `Actions` -> `General` を開く

確認する項目:

- `Actions permissions` でActionsの実行が許可されていること
- 利用できるActionが制限されている場合、このworkflowで使うGitHub公式Actionが許可されていること
- `Workflow permissions` で `GITHUB_TOKEN` の権限設定を確認すること

このworkflowで使うActionはすべてGitHub公式のActionです。

```text
actions/checkout
actions/configure-pages
actions/upload-pages-artifact
actions/deploy-pages
```

GitHub Pagesへデプロイするには、workflow内で次の権限を明示します。

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

それぞれの意味は次の通りです。

- `contents: read`: リポジトリのファイルを読むため
- `pages: write`: GitHub Pagesへデプロイするため
- `id-token: write`: デプロイ元を検証するためのOIDCトークンを取得するため

`id-token: write` がない場合、`actions/deploy-pages` が `Unable to get ACTIONS_ID_TOKEN_REQUEST_URL` で失敗します。

## Developer settingsのClassic token権限

GitHub Actionsの実行自体は、リポジトリの `Settings` -> `Actions` -> `General` と、workflow内の `permissions` で制御します。
一方、`Developer settings` は、GitHubへpushするときにPersonal Access Tokenを使う場合の設定です。

SSHキーやGitHub CLIの認証でpushしている場合は、通常この確認は不要です。
Classic tokenを使って `.github/workflows/pages.yml` をpushする場合は、トークンにworkflowファイルを更新できる権限が必要です。

確認場所:

1. GitHub右上のプロフィールメニューから `Settings` を開く
2. 左サイドバー下部の `Developer settings` を開く
3. `Personal access tokens` を開く
4. `Tokens (classic)` を開く
5. 使用しているClassic tokenを開く
6. `Select scopes` を確認する

確認するscope:

- `workflow`: workflowファイルを作成・更新するために必要
- `repo`: private repositoryへpushする場合に必要

public repositoryで、すでに通常のpush権限がある場合でも、`.github/workflows/*.yml` を作成・更新するpushでは `workflow` scope が必要です。
このscopeが不足していると、workflowファイルのpush時に拒否されたり、workflowファイルを更新できなかったりします。

ただし、push済みのworkflowがGitHub上で実行されるかどうかは、リポジトリ側のActions設定とworkflow内の `permissions` によって決まります。

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
- [GitHub Docs: Use GITHUB_TOKEN for authentication in workflows](https://docs.github.com/en/actions/tutorials/authenticate-with-github_token)
- [actions/configure-pages](https://github.com/actions/configure-pages)
- [actions/upload-pages-artifact](https://github.com/actions/upload-pages-artifact)
- [actions/deploy-pages](https://github.com/actions/deploy-pages)

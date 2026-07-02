# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

静的サイト公開方法（GitHub Pages / AWS S3 / CloudFront）を学ぶためのハンズオン教材リポジトリ。アプリ本体はビルド不要の HTML/CSS/JS のみで構成されています。

## アプリの起動

```bash
python3 -m http.server 8000
# → http://localhost:8000/ で動作確認
```

ビルド・依存インストール・トランスパイル等は一切不要です。

## デプロイ

- **GitHub Pages**: `main` ブランチへ push すると [.github/workflows/pages.yml](.github/workflows/pages.yml) が自動デプロイ
- **AWS S3**: `index.html`・`styles.css`・`script.js`・`assets/` をバケットにアップロード

## アーキテクチャ

| ファイル          | 役割                                                                                                                   |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `index.html`      | UI 全体。`<template id="entry-template">` で文章カードを動的生成                                                       |
| `script.js`       | localStorage CRUD ロジック。グローバル変数 `entries` を真とし、変更のたびに `saveEntries()` → `renderEntries()` を呼ぶ |
| `styles.css`      | スタイル                                                                                                               |
| `assets/icon.svg` | ヘッダー画像（静的）                                                                                                   |

`script.js` は外部ライブラリなし。DOM 操作はすべてバニラ JS。イベントは `entriesContainer` への委譲（event delegation）で処理しています。

## localStorage スキーマ

```
キー: static-launchpad.entries.v1
値: [{ id, text, createdAt, updatedAt }]  // 新しい順
```

## ドキュメント構成

- `docs/spec.md` — アプリ仕様
- `docs/github-pages/` — GitHub Pages ハンズオン手順
- `docs/aws/` — AWS 関連ハンズオン手順（アカウント作成・S3・CloudFront）

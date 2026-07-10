# --- ビルドステージ ---
# bun.lockなのでnpmではなくbun
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
# buildの前に必須。忘れると@prisma/clientエラー
RUN bunx prisma generate
RUN bun run build

# --- 実行ステージ ---
# 既知のHigh 1件(npm同梱tarのCVE-2026-26960)は実行時に使わないnpm由来のため許容。
FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
# コンテナ外(ALB等)からの接続を受けるため全インターフェースで待ち受ける
ENV HOSTNAME=0.0.0.0
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]

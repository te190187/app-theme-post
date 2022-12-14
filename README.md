# アプリ開発のお題投稿サイト

## 使用技術

### 技術

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [React Query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/)
- [Mantine](https://mantine.dev/)
- [NextAuth](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)
- [Zod](https://zod.dev/)

### インフラ(予定)

- [Cloud Run](https://cloud.google.com/run?hl=ja)
- [PlanetScale](https://planetscale.com/)

## 開発環境の整備

1. プロジェクトのディレクトリを作成したい場所で `git clone https://github.com/te190187/app-theme-post` を実行する。
1. 作成した app-theme-post ディレクトリに cd し、`npm i`を実行して、必要なライブラリを導入する。
1. app-theme-post 直下に.env ファイルを作成し、google drive にある.env ファイルというドキュメントの内容をコピーする。
1. `npx prisma db push` を実行し、DB に必要なテーブルを反映させる。
1. `npx prisma db seed` を実行し、初期データを DB に追加する。
1. `npm run dev` でサーバーを立ち上げ、ターミナルに表示されている URL にアクセスする。

手順 6 まで終わった後は、手順 1 で作成したディレクトリの中で`npm run dev`を実行することでサーバーを起動できる。  
`npx prisma studio` を実行することで、ブラウザ上で DB の内容を確認することができる。

GitHub から最新のコミットを取り込んだ後は、ライブラリの追加や DB のスキーマ変更を反映させるため、手順 2 から行う。

## ディレクトリ構成概要

- src/
  - pages/ --- URL にアクセスしたときに実行されるコード
  - client/ --- クライアント側のコード
    - components/ --- React のコンポーネント
    - hooks/ --- React のカスタムフック
  - server --- サーバー側のコード
    - lib/ --- サーバー全体で共有するコード
    - routers/ --- API サーバーのコード

## その他コマンド

- `npx tsc --noEmit`: TypeScript のエラーをチェック
- `npm run create:dummy`: DB にダミーデータの作成

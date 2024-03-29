import { NextPage } from "next";
import { HomePage } from "../client/components/HomePage";
import { pickedUpThemesQueryKey } from "../client/hooks/usePickedUpThemesQuery";
import {
  top10LikesDevelopersInThisMonthQueryKey,
  top10LikesPostersInThisMonthQueryKey,
  top10LikesThemesInThisMonthQueryKey,
} from "../client/hooks/useRankingQuery";
import { withReactQueryGetServerSideProps } from "../server/lib/GetServerSidePropsWithReactQuery";
import { appRouter } from "../server/routers/_app";

export const getServerSideProps = withReactQueryGetServerSideProps(
  async ({ queryClient, callerContext }) => {
    const caller = appRouter.createCaller(callerContext);

    // ランキング
    await queryClient.prefetchQuery(top10LikesThemesInThisMonthQueryKey, () =>
      caller.theme.getTop10LikesThemesInThisMonth()
    );
    await queryClient.prefetchQuery(
      top10LikesDevelopersInThisMonthQueryKey,
      () => caller.theme.getTop10LikesDevelopersInThisMonth()
    );
    await queryClient.prefetchQuery(top10LikesPostersInThisMonthQueryKey, () =>
      caller.theme.getTop10LikesPostersInThisMonth()
    );

    //　ピックアップされたお題
    await queryClient.prefetchQuery(pickedUpThemesQueryKey("createdDesc"), () =>
      caller.theme.pickUp({ order: "createdDesc" })
    );
    await queryClient.prefetchQuery(pickedUpThemesQueryKey("likeDesc"), () =>
      caller.theme.pickUp({ order: "likeDesc" })
    );
    await queryClient.prefetchQuery(
      pickedUpThemesQueryKey("developerDesc"),
      () => caller.theme.pickUp({ order: "developerDesc" })
    );
  }
);

// TODO:
// ユーザーランキングとピックアップされたお題の取得をアクセスが行われるたびに計算しているため、DBに負荷がかかりそう。
// こういった集計はリアルタイム性を必要としないから、バッチ処理として集計用のテーブルに追加していった方が良い？
const Home: NextPage = () => {
  return <HomePage />;
};
export default Home;

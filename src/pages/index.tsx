import { NextPage } from "next";
import { HomePage } from "../client/components/HomePage";
import { paginatedThemesQueryKey } from "../client/hooks/usePaginatedThemesQuery";
import {
  top10LikesDevelopersInThisMonthQueryKey,
  top10LikesPostersInThisMonthQueryKey,
  top10LikesThemesInThisMonthQueryKey,
} from "../client/hooks/useRankingQuery";
import { withReactQueryGetServerSideProps } from "../server/lib/GetServerSidePropsWithReactQuery";
import { appRouter } from "../server/routers/_app";

export const getServerSideProps = withReactQueryGetServerSideProps(
  async ({ params: { query }, queryClient, session }) => {
    const caller = appRouter.createCaller({ session });

    const { page } = query;
    if (typeof page === "object") {
      throw new Error();
    }

    await queryClient.prefetchQuery(paginatedThemesQueryKey(Number(page)), () =>
      caller.theme.getMany({ page })
    );
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
  }
);

const Home: NextPage = () => {
  return <HomePage />;
};
export default Home;

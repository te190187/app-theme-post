import { NextPage } from "next";
import { useRouter } from "next/router";
import { UserLikedThemesPage } from "../../../client/components/UserDetail/UserLikedThemesPage";
import { likedThemesQueryKey } from "../../../client/hooks/useLikedThemesQuery";
import { sumThemeLikesQueryKey } from "../../../client/hooks/useSumThemeLikesQuery";
import { themeDeveloperLikesQueryKey } from "../../../client/hooks/useThemeDeveloperLikesQuery";
import { userQueryKey, useUserQuery } from "../../../client/hooks/useUserQuery";
import { withReactQueryGetServerSideProps } from "../../../server/lib/GetServerSidePropsWithReactQuery";
import { appRouter } from "../../../server/routers/_app";

export const getServerSideProps = withReactQueryGetServerSideProps(
  async ({ params: { query }, queryClient, session }) => {
    const caller = appRouter.createCaller({ session });
    const { page } = query;

    const { id: userId } = query;

    if (typeof userId !== "string") {
      return;
    }
    if (typeof page === "object") {
      throw new Error();
    }

    await queryClient.prefetchQuery(userQueryKey(userId), () =>
      caller.user.get({ userId })
    );

    await queryClient.prefetchQuery(
      likedThemesQueryKey(userId, Number(page)),
      () => caller.user.getLikeTheme({ userId, page })
    );

    await queryClient.prefetchQuery(sumThemeLikesQueryKey, () =>
      caller.user.getThemeLike({ userId })
    );

    await queryClient.prefetchQuery(themeDeveloperLikesQueryKey, () =>
      caller.user.getThemeDeveloperLike({ userId })
    );
  }
);

/**
 *  ユーザーの詳細ページ
 *  ユーザーがいいねしたお題一覧を表示する
 */
const UserDetail: NextPage = () => {
  const router = useRouter();
  const userId = router.query.id as string;
  const { user } = useUserQuery(userId);

  if (user === undefined) {
    return null;
  } else {
    return <UserLikedThemesPage user={user} />;
  }
};
export default UserDetail;
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ThemeLikelistPage } from "../../../client/components/ThemeLikelistPage";
import {
  themeQueryKey,
  useThemeQuery,
} from "../../../client/hooks/useThemeQuery";
import { usersLikedThemeQueryKey } from "../../../client/hooks/useUsersLikedThemeQuery";
import { withReactQueryGetServerSideProps } from "../../../server/lib/GetServerSidePropsWithReactQuery";
import { appRouter } from "../../../server/routers/_app";

export const getServerSideProps = withReactQueryGetServerSideProps(
  async ({ params: { query }, queryClient, session }) => {
    const { id: themeId } = query;
    if (typeof themeId !== "string") {
      return { notFound: true };
    }

    const caller = appRouter.createCaller({ session });

    await queryClient.prefetchQuery(themeQueryKey(themeId), () =>
      caller.theme.get({ themeId })
    );
    await queryClient.prefetchQuery(usersLikedThemeQueryKey(themeId), () =>
      caller.theme.getLikedUsers({ themeId })
    );
  }
);

const ThemeLikelist: NextPage = () => {
  const router = useRouter();
  const themeId = router.query.id as string;
  const { theme } = useThemeQuery(themeId);

  if (!theme) {
    return <div>error</div>;
  }

  return <ThemeLikelistPage theme={theme} />;
};
export default ThemeLikelist;

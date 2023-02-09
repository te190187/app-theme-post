import { NextPage } from "next";
import { useRouter } from "next/router";
import { DeveloperLikingUsersPage } from "../../../../../client/components/DeveloperLikingUsersPage";
import { useDeveloperQuery } from "../../../../../client/hooks/useDeveloperQuery";
import { themeLikingUsersQueryKey } from "../../../../../client/hooks/useThemeLikingUsersQuery";
import {
  themeQueryKey,
  useThemeQuery,
} from "../../../../../client/hooks/useThemeQuery";
import { withReactQueryGetServerSideProps } from "../../../../../server/lib/GetServerSidePropsWithReactQuery";
import { appRouter } from "../../../../../server/routers/_app";

export const getServerSideProps = withReactQueryGetServerSideProps(
  async ({ params: { query }, queryClient, session }) => {
    const { id: themeId, developerId, page } = query;
    if (typeof themeId !== "string" || typeof developerId !== "string") {
      return { notFound: true };
    }
    if (typeof page === "object") {
      throw new Error();
    }

    const caller = appRouter.createCaller({ session });
    const theme = await caller.theme.get({ themeId });
    const developer = await caller.themeDeveloper.get({ developerId });
    if (!theme || !developer) {
      return { notFound: true };
    }

    await queryClient.prefetchQuery(themeQueryKey(themeId), () =>
      caller.theme.get({ themeId })
    );
    await queryClient.prefetchQuery(
      themeLikingUsersQueryKey(themeId, Number(page)),
      () => caller.theme.getThemeLikingUsers({ themeId, page })
    );
  }
);

/**
 * 開発者にいいねしているユーザー一覧を表示するページ
 */
const DeveloperLikingUsers: NextPage = () => {
  const router = useRouter();
  const developerId = router.query.developerId as string;
  const themeId = router.query.id as string;
  const { theme } = useThemeQuery(themeId);
  const { developer } = useDeveloperQuery(developerId);

  if (!developer || !theme) {
    return <></>;
  }

  return <DeveloperLikingUsersPage developer={developer} theme={theme} />;
};
export default DeveloperLikingUsers;

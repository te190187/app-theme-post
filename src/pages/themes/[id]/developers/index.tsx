import { NextPage } from "next";
import { useRouter } from "next/router";
import { ThemeDeveloperPage } from "../../../../client/components/ThemeDeveloperPage";
import { paginatedDevelopersQueryKey } from "../../../../client/hooks/usePaginatedDeveloperQueery";
import {
  themeQueryKey,
  useThemeQuery,
} from "../../../../client/hooks/useThemeQuery";
import { withReactQueryGetServerSideProps } from "../../../../server/lib/GetServerSidePropsWithReactQuery";
import { appRouter } from "../../../../server/routers/_app";

export const getServerSideProps = withReactQueryGetServerSideProps(
  async ({ params: { query }, queryClient, session, callerContext }) => {
    const { id: themeId, page } = query;
    if (typeof themeId !== "string") {
      return { notFound: true };
    }
    if (typeof page === "object") {
      throw new Error();
    }

    const caller = appRouter.createCaller(callerContext);
    const theme = await caller.theme.get({ themeId });
    if (!theme) {
      return { notFound: true };
    }

    await queryClient.prefetchQuery(themeQueryKey(themeId), () =>
      caller.theme.get({ themeId })
    );
    await queryClient.prefetchQuery(
      paginatedDevelopersQueryKey(themeId, Number(page)),
      () => caller.theme.getDeveloperAllpage({ themeId, page })
    );
  }
);

const DeveloperPage: NextPage = () => {
  const router = useRouter();
  const themeId = router.query.id as string;
  const { theme } = useThemeQuery(themeId);

  if (!theme) {
    return <></>;
  }

  return <ThemeDeveloperPage theme={theme} />;
};
export default DeveloperPage;

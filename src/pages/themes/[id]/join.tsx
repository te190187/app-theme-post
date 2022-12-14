import { NextPage } from "next";
import { useRouter } from "next/router";
import { ThemeJoinPage } from "../../../client/components/ThemeJoinPage";
import {
  themeQueryKey,
  useThemeQuery,
} from "../../../client/hooks/useThemeQuery";
import { withReactQueryGetServerSideProps } from "../../../server/lib/GetServerSidePropsWithReactQuery";
import { appRouter } from "../../../server/routers/_app";

export const getServerSideProps = withReactQueryGetServerSideProps(
  async ({ params: { query }, queryClient, session }) => {
    if (!session) {
      return { redirect: { destination: "/", permanent: false } };
    }

    const { id: themeId } = query;
    if (typeof themeId !== "string") {
      return { notFound: true };
    }

    const caller = appRouter.createCaller({ session });

    await queryClient.prefetchQuery(themeQueryKey(themeId), () =>
      caller.theme.get({ themeId })
    );
  }
);

const JoinTheme: NextPage = () => {
  const router = useRouter();
  const themeId = router.query.id as string;
  const { theme } = useThemeQuery(themeId);

  if (!theme) {
    return <div></div>;
  }

  return <ThemeJoinPage theme={theme} />;
};
export default JoinTheme;

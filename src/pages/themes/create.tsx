import { ThemeCreatePage } from "../../client/components/ThemeCreatePage";
import { allTagsQueryKey } from "../../client/hooks/useAllTagsQuery";
import { withReactQueryGetServerSideProps } from "../../server/lib/GetServerSidePropsWithReactQuery";
import { appRouter } from "../../server/routers/_app";

export const getServerSideProps = withReactQueryGetServerSideProps(
  async ({ queryClient, session, callerContext }) => {
    if (!session) {
      return { redirect: { destination: "/", permanent: false } };
    }

    const caller = appRouter.createCaller(callerContext);
    await queryClient.prefetchQuery(allTagsQueryKey, () =>
      caller.theme.getAllTags()
    );
  }
);

export default function CreateTheme() {
  return <ThemeCreatePage />;
}

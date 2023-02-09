import { useQuery } from "@tanstack/react-query";
import { trpc } from "../trpc";
import { themesQueryKey } from "./useThemeQuery";

export const developerLikingUsersQueryKey = (themeId: string, page: number) => {
  const p = isNaN(page) ? 1 : page;
  return [...themesQueryKey, themeId, "liking-users", { page: p }] as const;
};

/**
 * 指定されたお題をいいねしたユーザー一覧を返す
 */
export const useDeveloperLikingUsersQuery = (themeId: string, page: number) => {
  const result = useQuery({
    queryKey: developerLikingUsersQueryKey(themeId, page),
    queryFn: () => {
      return trpc.theme.getDeveloperLikingUsers.query({
        themeId,
        page: page.toString(),
      });
    },
    keepPreviousData: true,
  });

  return result;
};

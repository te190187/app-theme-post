import { useQuery } from "@tanstack/react-query";
import { trpc } from "../trpc";

export const usersQueryKey = ["users", "likes"] as const;
export const themelikesQueryKey = (themeId: string, page: number) => {
  themeId
  const p = isNaN(page) ? 1 : page;
  return [...usersQueryKey, { page: p }] as const;
};

export const useThemeLikesQuery = (themeId: string, page: number) => {
  const result = useQuery({
    queryKey: themelikesQueryKey(themeId, page),
    queryFn: () => {
      //const { page } = queryKey[1];
      return trpc.theme.getLikedUsers.query({ themeId, page: page.toString() });
    },
    initialData: [],
  });

  return result;
};

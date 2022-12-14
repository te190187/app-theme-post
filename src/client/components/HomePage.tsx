import { Box, Flex, MediaQuery, Pagination, Stack, Title } from "@mantine/core";

import { usePaginatedThemesQuery } from "../hooks/usePaginatedThemesQuery";
import { usePaginationState } from "../hooks/usePaginationState";
import {
  useTop10LikesDeveloperInThisMonth,
  useTop10LikesPostersInThisMonth,
  useTop10LikesThemesInThisMonth,
} from "../hooks/useRankingQuery";
import { PopularThemeCarousel } from "./PopularThemeCarousel/PopularThemeCarousel";
import { RankingCard } from "./RankingCard";

import { ThemeCard, themeCardMinWidthPx } from "./ThemeCard/ThemeCard";
import { UserLikeRankingItem } from "./UserLikeRankingItem";

export const HomePage: React.FC = () => {
  const [page, setPage] = usePaginationState({});
  const { data } = usePaginatedThemesQuery(page);

  const { top10LikesThemesInThisMonth } = useTop10LikesThemesInThisMonth();
  const { top10LikesDevelopersInThisMonth } =
    useTop10LikesDeveloperInThisMonth();
  const { top10LikesPostersInThisMonth } = useTop10LikesPostersInThisMonth();

  return (
    <Flex gap={30} justify="space-between">
      <Flex direction="column" w="100%" gap="md">
        <Flex justify="space-between" gap="lg">
          <Stack miw={0} sx={{ flexGrow: 1 }}>
            <Stack spacing="sm" w="100%">
              <Title order={4}>人気のお題</Title>
              <PopularThemeCarousel
                themes={top10LikesThemesInThisMonth}
                miw={`${themeCardMinWidthPx}px`}
              />
            </Stack>

            <Stack>
              <Title order={4}>全てのお題</Title>
              <Box
                sx={(theme) => ({
                  display: "grid",
                  gridTemplateColumns: `repeat(auto-fit, minmax(${themeCardMinWidthPx}px, 1fr))`,
                  gap: theme.spacing.md,
                })}
              >
                {data?.themes.map((theme) => {
                  return <ThemeCard key={theme.id} theme={theme} />;
                })}
              </Box>
              <Pagination
                page={page}
                onChange={setPage}
                total={data?.allPages ?? 0}
              />
            </Stack>
          </Stack>
          <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
            <Flex direction="column" gap={30}>
              <Box>
                <RankingCard title="今月のいいねが多かった開発者">
                  {top10LikesDevelopersInThisMonth?.map((developer, i) => (
                    <UserLikeRankingItem
                      ranking={i + 1}
                      key={developer.id}
                      user={developer}
                      likeCount={developer.developerLikes}
                    />
                  ))}
                </RankingCard>
              </Box>
              <Box>
                <RankingCard title="今月のいいねが多かった投稿者">
                  {top10LikesPostersInThisMonth?.map((poster, i) => (
                    <UserLikeRankingItem
                      ranking={i + 1}
                      key={poster.id}
                      user={poster}
                      likeCount={poster.themeLikes}
                    />
                  ))}
                </RankingCard>
              </Box>
            </Flex>
          </MediaQuery>
        </Flex>
      </Flex>
    </Flex>
  );
};

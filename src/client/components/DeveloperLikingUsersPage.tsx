import { Box, Flex, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { MdOutlineFavorite } from "react-icons/md";
import { Theme } from "../../server/models/theme";
import { ThemeDeveloper } from "../../server/models/themeDeveloper";
import { useDeveloperLikingUsersQuery } from "../hooks/useDeveloperLikingUsersQuery";
import { usePaginationState } from "../hooks/usePaginationState";
import { useThemeDevelopersQuery } from "../hooks/useThemeDevelopersQuery";
import { AppPagination } from "./AppPagination";
import { ThemeDeveloperCard } from "./DeveloperCard/ThemeDeveloperCard";
import { DeveloperLikingUserCard } from "./DeveloperLikingUserCard";
import { NothingThemeLikingUsers } from "./NothingThemeLikingUsers";
import { userCardMinWidthPx } from "./UserCard";

type Props = { developer: ThemeDeveloper; theme: Theme };
export const DeveloperLikingUsersPage: React.FC<Props> = ({
  developer,
  theme,
}) => {
  const [page, setPage] = usePaginationState({});
  const { data } = useDeveloperLikingUsersQuery(theme.id, page);
  const { likeDeveloperMutation } = useThemeDevelopersQuery(theme.id);
  const mantineTheme = useMantineTheme();

  return (
    <Stack maw={800} m="auto" spacing="lg">
      <Flex align="center" gap="sm">
        <MdOutlineFavorite
          size="30px"
          color={mantineTheme.colors.red[7]}
          style={{ marginTop: "2px" }}
        />
        <Title order={3}>開発者へのいいね</Title>
      </Flex>
      <Stack spacing="sm">
        <Text c="gray.5">いいねされた開発者</Text>
        <ThemeDeveloperCard
          key={developer.id}
          theme={theme}
          developer={developer}
          onLikeDeveloper={(developerId, like) => {
            likeDeveloperMutation.mutate({ developerId, like });
          }}
        />
      </Stack>
      {developer.likes === 0 ? (
        <NothingThemeLikingUsers />
      ) : (
        <Stack spacing="sm">
          <Text c="gray.5" align="left">
            いいねしたユーザー
          </Text>
          <Box
            sx={(theme) => ({
              display: "grid",
              gridTemplateColumns: `repeat(auto-fit, minmax(${userCardMinWidthPx}px, 1fr))`,
              gap: theme.spacing.xs,
            })}
          >
            {data?.users.map((user) => {
              return (
                <DeveloperLikingUserCard
                  key={user.id}
                  user={user}
                  developerlike={{
                    id: "",
                    developerId: "",
                    userId: "",
                    createdAt: user.developerLikeCreated,
                  }}
                />
              );
            })}
          </Box>
        </Stack>
      )}
      <AppPagination
        page={page}
        onChange={setPage}
        total={data?.allPages ?? 0}
      />
    </Stack>
  );
};

import {
  Avatar,
  Box,
  Card,
  Flex,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { format } from "date-fns";
import Link from "next/link";
import { MdComputer, MdOutlineFavorite } from "react-icons/md";
import { Theme } from "../../../server/models/theme";

export const popularThemeCardWidthPx = 400;
export const PopularThemeCard: React.FC<{ theme: Theme }> = ({ theme }) => {
  const mantineTheme = useMantineTheme();
  return (
    <Box
      component={Link}
      href={`/themes/${theme.id}`}
      sx={(theme) => ({ textDecoration: "none" })}
    >
      <Card
        key={theme.id}
        miw={popularThemeCardWidthPx}
        h="100%"
        sx={(theme) => ({
          cursor: "pointer",
          position: "static",
          transition: "all 150ms",
          "&:hover": {
            boxShadow: `${theme.shadows.lg}, 0 0 0 2px ${theme.colors.red[7]}`,
          },
        })}
      >
        <Stack spacing={10} justify="space-between" h="100%">
          {/* ヘッダ */}
          <Title
            order={4}
            color="red.7"
            sx={{
              lineHeight: 1.2,
            }}
          >
            {theme.title}
          </Title>

          <Stack spacing="sm">
            <Flex justify="flex-end" align="flex-end" gap={"xs"}>
              <Flex align="center" gap={5}>
                <MdOutlineFavorite
                  size="45px"
                  color={mantineTheme.colors.red[7]}
                />
                <Text size="xl" fw="bold" c="red.7">
                  {theme.likes}
                </Text>
              </Flex>
            </Flex>

            {/* ユーザー情報 */}
            <Flex gap={5}>
              <Avatar
                src={theme.user.image}
                radius="xl"
                size="sm"
                sx={(theme) => ({
                  borderWidth: "2px",
                  borderColor: theme.colors.gray[2],
                  borderStyle: "solid",
                  borderRadius: "100%",
                })}
              />
              <Flex direction="column" miw={0} sx={{ flexShrink: 1 }}>
                <Text
                  size="xs"
                  sx={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {theme.user.name}
                </Text>
                <Flex align="center" gap="sm">
                  <Text
                    color="gray.5"
                    size="xs"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    {format(new Date(theme.createdAt), "yyyy年M月d日")}
                  </Text>
                  <Flex align="center" gap={3}>
                    <MdComputer
                      size="15px"
                      color={mantineTheme.colors.red[7]}
                    />
                    <Text size="xs" c="red.7">
                      {theme.developers}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
};

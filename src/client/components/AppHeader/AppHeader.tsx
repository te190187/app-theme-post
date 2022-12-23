import { Box, Flex, Progress, Text, Transition } from "@mantine/core";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";
import { MdLogin, MdPostAdd } from "react-icons/md";
import { usePageLoading } from "../../contexts/PageLoadingContext";
import { AppHeaderButton } from "./AppHeaderButton";
import { AppHeaderLinkButton } from "./AppHeaderLinkButton";
import { UserMenuButton } from "./UserMenuButton";

type Props = { user?: Session["user"] };

export const AppHeader: React.FC<Props> = ({ user }) => {
  const { loadingValue } = usePageLoading();
  const indicatorHeight = 3;

  const router = useRouter();

  const handleCreateTheme = () => {
    router.push("/themes/create");
  };

  const handleLogIn = () => {
    signIn("github");
  };

  return (
    <Box
      sx={(theme) => ({
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: theme.colors.red[7],
      })}
    >
      <Box h={indicatorHeight}>
        <Transition mounted={loadingValue > 0} transition="fade">
          {(styles) => (
            <Progress
              h={indicatorHeight}
              color="red.1"
              value={loadingValue}
              radius={0}
              style={styles}
              styles={() => ({
                root: {
                  backgroundColor: "transparent",
                },
                bar: { transition: "all 250ms" },
              })}
            />
          )}
        </Transition>
      </Box>
      <Box
        p="xs"
        px={30}
        sx={(theme) => ({
          height: 60,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: theme.colors.red[7],
          boxShadow: `0px 1px 6px ${theme.fn.rgba(theme.colors.red[7], 0.5)}`,
        })}
      >
        <Flex w="100%" align="center" justify="space-between">
          <Flex align="center" gap={5}>
            <Box
              component={Link}
              href="/"
              sx={{
                display: "flex",
                alignItems: "flex-start",
                textDecoration: "none",
                gap: "3px",
              }}
            >
              <Image src="/logo.svg" alt="logo" width={40} height={40} />
              <Text fw={700} color="gray.1" size={22} mt={2}>
                AppThemePost
              </Text>
            </Box>
          </Flex>
          <Flex gap={10} align="center">
            <AppHeaderLinkButton
              leftIcon={<FaSearch size={18} />}
              href="/themes/search"
            >
              お題を検索する
            </AppHeaderLinkButton>
            {user ? (
              <Flex gap={10} align="center">
                <AppHeaderButton
                  leftIcon={<MdPostAdd size={25} />}
                  onClick={handleCreateTheme}
                >
                  お題を投稿する
                </AppHeaderButton>
                <UserMenuButton user={user} />
              </Flex>
            ) : (
              <AppHeaderButton
                leftIcon={<MdLogin size={25} />}
                onClick={handleLogIn}
              >
                ログイン
              </AppHeaderButton>
            )}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

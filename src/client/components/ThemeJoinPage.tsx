import { Card, Flex, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import { Theme } from "../../server/models/theme";
import { ThemeJoinFormData } from "../../share/schema";
import { useThemeJoin } from "../hooks/useThemeJoin";
import { ComputerIcon } from "./ComputerIcon";
import { ThemeJoinForm } from "./ThemeJoinForm";
import { ThemeSummaryCard } from "./ThemeSummaryCard";

type Props = { theme: Theme; repoUrl?: string };
export const ThemeJoinPage: React.FC<Props> = ({ theme, repoUrl }) => {
  const router = useRouter();
  const mantineTheme = useMantineTheme();

  const {
    mutations: { joinMutation },
  } = useThemeJoin(theme.id);

  const handleJoinTheme = (data: ThemeJoinFormData) => {
    joinMutation.mutate(data, {
      onSuccess: () => router.replace(`/themes/${theme.id}`),
    });
  };

  const handleBack = () => {
    router.back();
  };
  return (
    <Stack w={800} m="auto" spacing="lg">
      <Flex align="center" gap="xs">
        <ComputerIcon size="30px" fill={mantineTheme.colors.red[7]} />
        <Title order={3}>お題を開発</Title>
      </Flex>
      <Stack spacing="xs">
        <Text c="gray.5">開発するお題</Text>
        <ThemeSummaryCard theme={theme} />
      </Stack>
      <Stack spacing="xs">
        <Text c="gray.5">開発情報</Text>
        <Card>
          <ThemeJoinForm
            onSubmit={handleJoinTheme}
            onCancel={handleBack}
            themeId={theme.id}
            submitText="開発する"
            isLoading={joinMutation.isLoading || joinMutation.isSuccess}
            defaultValues={{ githubUrl: repoUrl ?? "", comment: "" }}
          />
        </Card>
      </Stack>
    </Stack>
  );
};

import { Flex, Text, useMantineTheme } from "@mantine/core";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlinePostAdd } from "react-icons/md";
import { TbHeart } from "react-icons/tb";

type Props = { page: "Developers" | "Posters" };

export const NothingLike: React.FC<Props> = ({ page }) => {
  const mantineTheme = useMantineTheme();

  const changeDeveloper = () => {
    return (
      <Flex direction={"column"} align={"center"} gap={15}>
        <Flex align={"flex-end"}>
          <AiOutlineUser size={60} />
          <TbHeart size={80} color={mantineTheme.colors.red[7]} />
        </Flex>
        <Text fz="xl" align="center" c="gray.5">
          開発者へいいねしてみよう！
        </Text>
        <Text fz="xs" c={"gray.4"} align="center">
          開発者へのいいねのランキングがここに表示されます。
        </Text>
      </Flex>
    );
  };

  const changePoster = () => {
    return (
      <Flex direction={"column"} align={"center"} gap={15}>
        <Flex align={"flex-end"}>
          <MdOutlinePostAdd size={60} />
          <TbHeart size={80} color={mantineTheme.colors.red[7]} />
        </Flex>
        <Text fz="xl" align="center" c="gray.5">
          投稿者へいいねしてみよう！
        </Text>
        <Text fz="xs" c={"gray.4"} align="center">
          投稿者へのいいねのランキングがここに表示されます。
        </Text>
      </Flex>
    );
  };

  const changeNothing = () => {
    if (page === "Developers") {
      return changeDeveloper();
    } else if (page === "Posters") {
      return changePoster();
    } else {
      return <></>;
    }
  };
  return changeNothing();
};

import { ActionIcon, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { BiTrashAlt } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { ThemeDeveloper } from "../../../server/models/themeDeveloper";
import { useSessionQuery } from "../../hooks/useSessionQuery";
import { useThemeJoin } from "../../hooks/useThemeJoin";
import { stopPropagation } from "../../utils";
import { AppConfirmModal } from "../AppConfirmModal";
import { AppMenu } from "../AppMenu/AppMenu";
import { MenuDropdown } from "../AppMenu/MenuDropdown";
import { MenuItem } from "../AppMenu/MenuItem";
import { MenuLinkItem } from "../AppMenu/MenuLinkItem";

type Props = { developer: ThemeDeveloper };
export const DeveloperMenuButton: React.FC<Props> = ({ developer }) => {
  const [opened, { close, open }] = useDisclosure(false);
  const { session } = useSessionQuery();

  const {
    mutations: { cancelJoinMutation },
  } = useThemeJoin(developer.themeId);

  const handleDeleteDeveloper = () => {
    cancelJoinMutation.mutate(
      { developerId: developer.id },
      {
        onSuccess: () => {
          showNotification({
            color: "green",
            title: "開発情報の削除",
            message: "開発情報を削除しました。",
          });
          close();
        },
        onError: () => {
          showNotification({
            color: "red",
            title: "開発情報の削除",
            message: "開発情報を削除できませんでした。",
          });
        },
      }
    );
  };

  return (
    <>
      <AppMenu>
        <Menu.Target>
          <ActionIcon
            size={30}
            color="gray"
            sx={(theme) => ({
              transition: "all 150ms",
              "&:hover": {
                backgroundColor: theme.fn.rgba(theme.colors.gray[5], 0.1),
              },
            })}
            onClick={stopPropagation}
          >
            <BsThreeDots size="70%" />
          </ActionIcon>
        </Menu.Target>

        <MenuDropdown>
          {session?.user.id === developer.userId ? (
            <>
              <MenuLinkItem
                icon={<RiEdit2Fill size={20} />}
                href={`/themes/${developer.themeId}/developers/${developer.id}/update`}
              >
                参加情報を更新する
              </MenuLinkItem>
              <MenuItem icon={<FaTrash size={18} />} onClick={open} red>
                参加情報を削除する
              </MenuItem>
            </>
          ) : (
            <Menu.Label>選択できる項目がありません。</Menu.Label>
          )}
        </MenuDropdown>
      </AppMenu>
      <AppConfirmModal
        title="開発情報の削除"
        message={
          <>
            開発情報を削除してもよろしいですか？
            <br />
            開発情報を削除すると、もらった「いいね」の情報が完全に削除されます。
          </>
        }
        opened={opened}
        onClose={close}
        onConfirm={handleDeleteDeveloper}
        isConfirming={cancelJoinMutation.isLoading}
        confirmIcon={BiTrashAlt}
        confirmText="削除する"
      />
    </>
  );
};
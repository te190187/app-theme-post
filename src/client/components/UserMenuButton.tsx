import { BadgeProps, Divider, Menu, Space, Text } from "@mantine/core";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { BiBookmarkHeart } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { OmitStrict } from "../../types/OmitStrict";
import { AppMenu } from "./AppMenu/AppMenu";
import { MenuDropdown } from "./AppMenu/MenuDropdown";
import { MenuItem } from "./AppMenu/MenuItem";
import { MenuLinkItem } from "./AppMenu/MenuLinkItem";

type Props = { user: Session["user"] } & OmitStrict<BadgeProps, "sx">;

export const UserMenuButton: React.FC<Props> = ({ user, children }) => {
  const handleLogOut = () => {
    signOut();
  };

  return (
    <AppMenu offset={10} position="right-end">
      <Menu.Target>{children}</Menu.Target>
      <MenuDropdown maw={180} sx={{ zIndex: 1000 }}>
        <Menu.Label>
          <Text
            align="center"
            sx={() => {
              return {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              };
            }}
          >
            {user.name}
          </Text>
        </Menu.Label>
        <Divider color="gray.3" my="xs" />
        <Space mt="xs" />
        <MenuLinkItem
          icon={<RiAccountCircleLine size={20} />}
          href={`/users/${user.id}`}
        >
          プロフィール
        </MenuLinkItem>
        <MenuLinkItem
          icon={<BiBookmarkHeart size={20} />}
          href={`/users/${user.id}/favorite-list`}
        >
          お気に入り
        </MenuLinkItem>
        <MenuItem icon={<MdLogout size={20} />} onClick={handleLogOut}>
          ログアウト
        </MenuItem>
        <MenuLinkItem icon={<FaTrash size={16} />} href="/users/delete" red>
          アカウント削除
        </MenuLinkItem>
      </MenuDropdown>
    </AppMenu>
  );
};

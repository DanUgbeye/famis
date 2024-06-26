import { PAGES } from "@/data/page-map";
import { SideNavLinkGroupData } from "@/types/sidenav.types";
import {
  Folder,
  FolderPlus,
  FolderSync,
  Home,
  User,
  User2,
  UserPlus,
} from "lucide-react";

export const ADMIN_SIDENAV_LINKS: SideNavLinkGroupData[] = [
  {
    groupName: "",
    links: [
      {
        name: "Dashboard",
        href: PAGES.DASHBOARD,
        icon: Home,
      },
    ],
  },
  {
    groupName: "Assets",
    links: [
      {
        name: "View Asset",
        href: PAGES.ASSETS,
        icon: Folder,
      },
      {
        name: "Transfer Applications",
        href: PAGES.APPLICATIONS,
        icon: FolderSync,
      },
    ],
  },
  {
    groupName: "Users",
    links: [
      {
        name: "View Users",
        href: PAGES.USERS,
        icon: User,
      },
    ],
  },
] as const;

export const USER_SIDENAV_LINKS: SideNavLinkGroupData[] = [
  {
    groupName: "",
    links: [
      {
        name: "Dashboard",
        href: PAGES.DASHBOARD,
        icon: Home,
      },
    ],
  },
  {
    groupName: "Assets",
    links: [
      {
        name: "View Assets",
        href: PAGES.ASSETS,
        icon: Folder,
      },
      {
        name: "Create Asset",
        href: PAGES.CREATE_ASSET,
        icon: FolderPlus,
      },
      {
        name: "Transfer Applications",
        href: PAGES.APPLICATIONS,
        icon: FolderSync,
      },
    ],
  },
] as const;

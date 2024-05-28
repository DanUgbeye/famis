import { PAGES } from "@/data/page-map";
import { SideNavLinkGroupData } from "@/types/sidenav.types";
import { Folder, FolderPlus, Home, UserPlus } from "lucide-react";

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
    ],
  },
  {
    groupName: "Users",
    links: [
      {
        name: "Add User",
        href: PAGES.ADD_USER,
        icon: UserPlus,
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
    ],
  },
  {
    groupName: "Users",
    links: [
      {
        name: "Add User",
        href: PAGES.ADD_USER,
        icon: UserPlus,
      },
    ],
  },
] as const;

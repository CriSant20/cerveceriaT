import { ReactNode } from "react";

export interface SidebarProps {
  readonly isMenuOpen: boolean;
  readonly toggleMenu: () => void;
  readonly children: ReactNode;
  readonly footerContent?: ReactNode;
}
import { ReactNode } from "react";
export interface SidebarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  children: ReactNode;
  footerContent?: ReactNode;
}
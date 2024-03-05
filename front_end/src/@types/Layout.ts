import { ReactElement } from "react";

export interface HeaderProps {
  signedIn: boolean;
  isApplicant: boolean;
  onLogout: () => void;
}

export interface LayoutProps {
  signedIn: boolean;
  isApplicant: boolean;
  element: ReactElement;
  onLogout: () => void;
}

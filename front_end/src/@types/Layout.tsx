import { ReactElement } from "react";

export interface HeaderProps {
  signedIn: boolean;
  isApplicant: boolean;
}

export interface LayoutProps {
  signedIn: boolean;
  isApplicant: boolean;
  element: ReactElement;
}

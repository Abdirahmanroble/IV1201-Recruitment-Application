import React from "react";
import { ViewProps } from "../../@types/Home";
import { useTranslation } from "react-i18next";
import "./HomeView.css";

/**
 * Represents the view component for the home page.
 *
 * @param props The props passed to the component.
 * @returns The rendered home view component.
 */
const HomeView = (props: ViewProps): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <div className="home-view">
      <h1>{t("home")}</h1>
      <h2>
        {t("welcome")} {props.username}{" "}
      </h2>
    </div>
  );
};

export default HomeView;

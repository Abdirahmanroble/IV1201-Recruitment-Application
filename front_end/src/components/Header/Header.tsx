import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { HeaderProps } from "../../@types/Layout";
import "./Header.css";

/**
 * Renders the header component.
 *
 * @param {HeaderProps} props - The props for the header component.
 * @returns {JSX.Element} The rendered header component.
 */

function Header(props: HeaderProps): JSX.Element {
  const { i18n, t } = useTranslation();
  const currentPath = useLocation().pathname;
  const [showLanguages, setShowLanguages] = useState(false);

  const languages: Record<string, string> = {
    en: "English",
    se: "Svenska",
    so: "Soomaali",
    sp: "Español",
    fr: "Français",
    // Add more languages here
  };

  const switchLanguage = (languageKey: string) => {
    i18n.changeLanguage(languageKey);
    setShowLanguages(false);
  };

  let creatingAccount = "",
    home = "",
    listingApplications = "";

  switch (currentPath) {
    case "/":
      home = "pressed-path";
      break;
    case "/create-account":
      creatingAccount = "pressed-path";
      break;
    case "/list-applications":
      listingApplications = "pressed-path";
      break;
    default:
      break;
  }

  return (
    <div className="header-container">
      <div className="header-title">{t("recruitmentApplication")}</div>
      <div className="header-paths">
        <Link to="/" className="App-link">
          <div className={home}>{t("home")}</div>
        </Link>
        {!props.signedIn && (
          <>
            <Link to="/create-account" className="App-link">
              <div>{t("createAccount")}</div>
            </Link>
          </>
        )}
        {props.signedIn && !props.isApplicant && (
          <Link to="/list-applications" className="App-link">
            <div>{t("listApplications")}</div>
            </Link>
        )}
        {props.signedIn && (
          <div onClick={props.onLogout} className="header-logout">
            {t("logout")}
          </div>
        )}
        <div className="language-switcher">
          <span
            className="material-icons"
            onClick={() => setShowLanguages(!showLanguages)}
          >
            language
          </span>
          {showLanguages && (
            <ul className="languages-dropdown">
              {Object.keys(languages).map((langKey) => (
                <li key={langKey} onClick={() => switchLanguage(langKey)}>
                  {languages[langKey]}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

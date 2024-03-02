import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { HeaderProps } from "../../@types/Layout";
import "./Header.css";

function Header(props: HeaderProps): JSX.Element {
  const { i18n, t } = useTranslation();
  const currentPath = useLocation().pathname;
  const [showLanguages, setShowLanguages] = useState(false);

  const languages: Record<string, string> = {
    en: 'English',
    se: 'Svenska',
    so: 'Soomaali'
    // Add more languages here
  };

  const switchLanguage = (languageKey: string) => {
    i18n.changeLanguage(languageKey);
    setShowLanguages(false);
  };

  let signingIn = "",
    creatingAccount = "",
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
      signingIn = "pressed-path";
  }

  return (
    <div className="header-container">
      <div className="header-title">{t('recruitmentApplication')}</div>
      <div className="header-paths">
        <Link to="/" className={`App-link ${home}`}>{t('home')}</Link>
        {!props.signedIn && (
          <Link to="/create-account" className={`App-link ${creatingAccount}`}>{t('createAccount')}</Link>
        )}
        {props.signedIn && !props.isApplicant && (
          <Link to="/list-applications" className={`App-link ${listingApplications}`}>{t('listApplications')}</Link>
        )}
        {props.signedIn && (
          <div onClick={props.onLogout} className="header-logout">{t('logout')}</div>
        )}
        <div className="language-switcher">
          <span className="material-icons" onClick={() => setShowLanguages(!showLanguages)}>language</span>
          {showLanguages && (
            <ul className="languages-dropdown">
              {Object.keys(languages).map(langKey => (
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

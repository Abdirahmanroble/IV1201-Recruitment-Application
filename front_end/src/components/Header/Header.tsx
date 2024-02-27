import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { HeaderProps } from "../../@types/Layout";
import "./Header.css";

/**
 * Represents the header component of the application, providing navigation links and logout functionality.
 *
 * @param {HeaderProps} props - The properties passed to the Header component.
 * @returns {JSX.Element} The rendered header component.
 */
function Header(props: HeaderProps): JSX.Element {
  const { i18n, t } = useTranslation();
  const currentPath = useLocation().pathname;

  let signingIn = "",
      creatingAccount = "",
      home = "",
      listingApplications = "";

      const switchLanguage = () => {
        const newLang = i18n.language === 'en' ? 'se' : 'en';
        i18n.changeLanguage(newLang);
      };

  switch (currentPath) {
    case "/":
      signingIn = "pressed-path";
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
      <div className="header-title">{t('recruitmentApplication')}</div>
      <div className="header-paths">
        {props.signedIn ? (
          <>
            <Link to="/" className="App-link">
              <div className={`${home}`}>{t('home')}</div>
            </Link>
            {props.isApplicant ? null : (
              <Link to="/list-applications" className="App-link">
                <div className={`${listingApplications}`}>{t('listApplications')}</div>
              </Link>
            )}
            <div onClick={props.onLogout} className="header-logout">{t('logout')}</div>
          </>
        ) : (
          <>
            <Link to="/" className="App-link">
              <div className={`${signingIn}`}>{t('login')}</div>
            </Link>
            <Link to="/create-account" className="App-link">
              <div className={`${creatingAccount}`}>{t('createAccount')}</div>
            </Link>
          </>
        )}
        <button onClick={switchLanguage} className="language-switch">{t('switchLanguage')}</button>
      </div>
    </div>
  );
}

export default Header;
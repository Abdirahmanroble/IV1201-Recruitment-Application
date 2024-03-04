import "./Footer.css";
import { useTranslation } from "react-i18next";

/**
 * Represents the footer component displayed at the bottom of the application.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
function Footer(): JSX.Element {
  const {t} = useTranslation();
  return (
    <div className="footer-container">
      <div className="footer-title">{t("Group 5")}</div>
    </div>
  );
}

export default Footer;

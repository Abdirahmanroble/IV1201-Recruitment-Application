import { LayoutProps } from "../../@types/Layout";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Layout.css";

/**
 * Represents a layout component for organizing the structure of the application.
 *
 * @param {LayoutProps} props - The properties passed to the Layout component.
 * @returns {JSX.Element} The rendered layout component.
 */
function Layout(props: LayoutProps): JSX.Element {
  return (
    <div className="layout-container">
      <Header
        signedIn={props.signedIn}
        isApplicant={props.isApplicant}
        onLogout={props.onLogout}
      ></Header>
      <div className="layout-element">{props.element}</div>
      <Footer></Footer>
    </div>
  );
}

export default Layout;

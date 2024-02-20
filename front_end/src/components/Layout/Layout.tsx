import { LayoutProps } from "../../@types/Layout";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Layout.css";

function Layout(props: LayoutProps) {
  return (
    <div className="layout-container">
      <Header
        signedIn={props.signedIn}
        isApplicant={props.isApplicant}
      ></Header>
      <div className="layout-element">{props.element}</div>
      <Footer></Footer>
    </div>
  );
}

export default Layout;

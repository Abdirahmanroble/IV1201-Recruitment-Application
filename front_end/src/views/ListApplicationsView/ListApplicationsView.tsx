import { ViewProps } from "../../@types/ListApplications";
import ApplicationCard from "../../components/ApplicationCard/ApplicationCard";
import { useTranslation } from "react-i18next";
import "./ListApplicationsView.css";

const ListApplicationsView: React.FC<ViewProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div className="list-applications-view">
      <h1>{t("listApplications")}</h1>
      {/* Map through the applications array and render an ApplicationCard for each application */}
      <div className="list-applications-applications">
        {props.applications.map((application, key) => (
          <ApplicationCard
            name={application.fullName}
            date={application.applicationDate}
            status={application.status}
            key={key}
          />
        ))}{" "}
      </div>
    </div>
  );
};

export default ListApplicationsView;

import { ApplicationCardProps } from "../../@types/ListApplications";
import "./ApplicationCard.css";

function ApplicationCard(props: ApplicationCardProps) {
  let color = "";

  if (props.status === "accepted") color = "green";
  else if (props.status === "rejected") color = "red";
  else if (props.status === "unhandled") color = "orange";

  return (
    <div
      className="application-card-container"
      style={{
        backgroundColor: `var(--${color}-secondary)`,
        border: `0.1rem solid var(--${color}-primary)`,
        color: `var(--${color}-primary)`,
      }}
    >
      <div className="application-card-info">
        <div className="application-card-name">{props.name}</div>
        <div className="application-card-date">{props.date}</div>
      </div>

      <div className="application-card-status">{props.status}</div>
    </div>
  );
}

export default ApplicationCard;

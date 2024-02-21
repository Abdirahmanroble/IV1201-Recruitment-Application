import { ApplicationCardProps } from "../../@types/ListApplications";
import "./ApplicationCard.css";

/**
 * Represents a card displaying application information.
 *
 * @param {ApplicationCardProps} props - The properties for the application card component.
 * @param {string} props.name - The name of the applicant.
 * @param {string} props.date - The date of the application.
 * @param {string} props.status - The status of the application (accepted, rejected, unhandled).
 * @returns {JSX.Element} The rendered application card component.
 */
function ApplicationCard(props: ApplicationCardProps): JSX.Element {
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

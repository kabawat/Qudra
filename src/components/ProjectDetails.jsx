import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import ClientProcess from "./project_process/ClientProcess";
import ProfessionalProcess from "./project_process/ProfessionalProcess";
import ViewMilestones from "./project_process/ViewMilestones";
import FromClientTabPane from "./project_process/FromClientTabPane";
import FromProfessionalTabPane from "./project_process/FromProfessionalTabPane";

const ProjectDetails = () => {
  const location = useLocation();
  return (
    <>
      {location?.state?.isFromDashboard && (
        <ViewMilestones location={location} />
      )}

      {location?.state?.isFromProfessionalNotification && (
        <ProfessionalProcess location={location} />
      )}
      {location?.state?.isFromClientNotification && (
        <ClientProcess location={location} />
      )}
      {location?.state?.isFromClientTab && (
        <FromClientTabPane location={location} />
      )}
      {location?.state?.isFromProfessionalTab && (
        <FromProfessionalTabPane location={location} />
      )}
    </>
  );
};

export default ProjectDetails;

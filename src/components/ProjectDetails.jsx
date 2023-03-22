import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import ClientProcess from "./project_process/ClientProcess";
import ProfessionalProcess from "./project_process/ProfessionalProcess";
import ViewMilestones from "./project_process/ViewMilestones";
import FromClientTabPane from "./project_process/FromClientTabPane";
import FromProfessionalTabPane from "./project_process/FromProfessionalTabPane";
import { useCookies } from "react-cookie";

const ProjectDetails = () => {
  const [cookies] = useCookies()
  const location = useLocation();
  const navigate = useNavigate()
  if (cookies?.user_data) {
    if (location?.state) {
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
    } else {
      if (cookies?.user_data?.role === 'professional') {
        if (cookies?.user_data?.category_selected) {
          navigate('/professionaldashboard')
        } else {
          navigate('/categoryArchitecture')
        }
      } else {
        if (cookies?.user_data?.category_selected) {
          navigate('/clientdashboard')
        } else {
          navigate('/client-architechture')
        }
      }
    }
  } else {
    navigate('/select-sign-in')
  }
};

export default ProjectDetails;

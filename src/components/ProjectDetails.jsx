import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import ClientProcess from "./project_process/ClientProcess";
import ProfessionalProcess from "./project_process/ProfessionalProcess";
import ViewMilestones from "./project_process/ViewMilestones";
import FromClientTabPane from "./project_process/FromClientTabPane";
import FromProfessionalTabPane from "./project_process/FromProfessionalTabPane";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import Loader from '../components/Loader'
const ProjectDetails = () => {
  const [cookies] = useCookies()
  const location = useLocation();
  const navigate = useNavigate()

  const [isRender, setIsRender] = useState(false)
  useEffect(() => {
    if (cookies?.user_data) {
      if (cookies?.user_data?.category_selected) {
        if (location.state !== null) {
          setIsRender(true)
        } else {
          navigate('/clientdashboard')
        }
      } else {
        if (cookies?.user_data?.role === 'professional') {
          navigate('/categoryArchitecture')
        } else {
          navigate('/client-architechture')
        }
      }
    } else {
      navigate('/select-sign-in')
    }
  }, [])

  return (
    isRender ? <>
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
        // <ClientProcess location={location} />
      )}
      {location?.state?.isFromProfessionalTab && (
        <FromProfessionalTabPane location={location} />
      )}
    </> : <Loader />
  )
};

export default ProjectDetails;

import React, { useContext } from "react";
import EditProfileProfessional from "../components/EditProfileProfessional";
import EditProfileClient from "../components/EditProfileClient";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const EditProfile = () => {
  const contextData = JSON.parse(localStorage.getItem('user_data'));
  const location = useLocation();
  const navigate = useNavigate()
  const [cookies, setCookies] = useCookies()
  if (location.state !== null) {
    return contextData?.role === "professional" ? (
      <EditProfileProfessional />
    ) : (
      <EditProfileClient />
    );
  } else {
    if (cookies?.user_data?.role === "professional") {
      navigate('/professionaldashboard')
    } else if (cookies?.user_data?.role === "client") {
      navigate('/clientdashboard')
    } else {
      navigate('/')
    }
  }
};

export default EditProfile;

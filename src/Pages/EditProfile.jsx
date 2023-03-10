import React, { useContext } from "react";
import Global from "../context/Global";
import EditProfileProfessional from "../components/EditProfileProfessional";
import EditProfileClient from "../components/EditProfileClient";
const EditProfile = () => {
  // const contextData = useContext(Global);

  // return contextData?.userData?.role === "professional" ? (
  //   <EditProfileProfessional />
  // ) : (
  //   <EditProfileClient />
  // );

  const contextData = JSON.parse(localStorage.getItem('user_data'));

  return contextData?.role === "professional" ? (
    <EditProfileProfessional />
  ) : (
    <EditProfileClient />
  );
};

export default EditProfile;

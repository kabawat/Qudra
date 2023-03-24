import React, { useEffect, useState } from "react";
import EditProfileProfessional from "../components/EditProfileProfessional";
import EditProfileClient from "../components/EditProfileClient";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
const EditProfile = () => {
  const [cookies,] = useCookies()
  const location = useLocation()
  const navigate = useNavigate()
  const [isRender, setIsRender] = useState(false)
  useEffect(() => {
    if (cookies?.user_data) {
      if (location.state !== null) {
        setIsRender(true)
      } else {
        if (cookies?.user_data?.role === "professional") {
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
    isRender ? cookies?.user_data?.role === "professional" ? (
      <EditProfileProfessional />
    ) : (
      <EditProfileClient />
    ) : <Loader />
  )
  return
};

export default EditProfile;

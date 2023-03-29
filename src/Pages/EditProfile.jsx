import React, { useEffect, useState } from "react";
import EditProfileProfessional from "../components/EditProfileProfessional";
import EditProfileClient from "../components/EditProfileClient";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
const EditProfile = () => {
  const [cookies,] = useCookies()
  const [state, setState] = useState({})
  const navigate = useNavigate()
  const [isRender, setIsRender] = useState(false)
  useEffect(() => {
    if (cookies?.user_data) {
      if (cookies?.user_data?.category_selected) {
        axios.put("http://13.52.16.160:8082/identity/update_account", {
          user_id: cookies?.user_data?.user_id,
          user_token: cookies?.user_data?.user_token,
          role: cookies?.user_data?.role,
        }).then((res) => {
          if (res?.data?.status === "Success") {
            setState(res?.data?.data)
            // console.log(location.state)
            setIsRender(true)
          }
        });
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
  useEffect(() => {

  }, [])

  return (
    isRender ? cookies?.user_data?.role === "professional" ? (
      <EditProfileProfessional />
    ) : (
      <EditProfileClient location={{ state: state }} />
    ) : <Loader />
  )
  return
};

export default EditProfile;

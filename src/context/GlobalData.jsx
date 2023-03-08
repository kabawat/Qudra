import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import Global from "./Global";
const initialState = {
  userData: null,
  profileData: null,
  showDisclamer: null,
  professional_user_profile_data: null,
  professionalProfile: null,
  professional_sub_catagory: null,
  current_professional_tab: "dashboard",
  current_client_tab: "dashboard",
  static_architecture_design: [],
  static_visualization_design: [],
  static_buy_sale_design: [],
  footer_catagories_link: [],
  footer_support_link: [],
  footer_explore_link: [],
  footer_resources_link: [],
  footer_icons: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USER_DATA":
      return { ...state, userData: action.value };
    case "FETCH_PROFILE_DATA":
      return { ...state, profileData: action.value };
    case "SHOW_DISCLAMER":
      return { ...state, showDisclamer: action.value };
    case "PROFESSIONAL_PROFILE":
      return { ...state, professionalProfile: action.value };
    case "PROFESSIONAL_USER_PROFILE_DATA":
      return { ...state, professional_user_profile_data: action.value };
    case "PROFESSIONAL_SUB_CATAGORY":
      return { ...state, professional_sub_catagory: action.value };
    case "CURRENT_PROFESSIONAL_TAB":
      return { ...state, current_professional_tab: action.value };
    case "CURRENT_CLIENT_TAB":
      return { ...state, current_client_tab: action.value };
    case "STATIC_ARCHITECTURE_DESIGN":
      return { ...state, static_architecture_design: action.value };
    case "STATIC_VISUALIZATION_DESIGN":
      return { ...state, static_visualization_design: action.value };
    case "STATIC_BUY_SALE_DESIGN":
      return { ...state, static_buy_sale_design: action.value };
    case "FOOTER_CATAGORIES_LINK":
      return { ...state, footer_catagories_link: action.value };
    case "FOOTER_SUPPORT_LINK":
      return { ...state, footer_support_link: action.value };
    case "FOOTER_EXPLORE_LINK":
      return { ...state, footer_explore_link: action.value };
    case "FOOTER_RESOURCES_LINK":
      return { ...state, footer_resources_link: action.value };
    case "FOOTER_ICONS":
      return { ...state, footer_icons: action.value };

    case "LOG_OUT":
      return initialState;
    default:
      return state;
  }
};

const GlobalData = (props) => {
  const [contextData, dispatch] = useReducer(reducer, initialState);

  const [showDisclamer, setShowDisclamer] = useState();
  useEffect(() => {
    if (!contextData?.userData) {
      dispatch({
        type: "FETCH_USER_DATA",
        value: JSON.parse(localStorage.getItem("user_data")),
      });
    }

    if (!contextData?.profileData) {
      dispatch({
        type: "FETCH_PROFILE_DATA",
        value: JSON.parse(localStorage.getItem("profileImageNameGmail")),
      });
    }
  }, [contextData?.profileData, contextData?.showDisclamer]);
  const skillsOpt = [
    { label: "Rhino 3D", value: "Rhino 3D" },
    { label: "Revit Architecture", value: "Revit Architecture" },
    { label: "SketchUp", value: "SketchUp" },
    { label: "V-Ray", value: "V-Ray" },
    { label: "AutoCAD", value: "AutoCAD" },
    { label: "Maya", value: "Maya" },
    { label: "ArchiCAD", value: "ArchiCAD" },
    { label: "Grasshopper", value: "Grasshopper" },
    { label: "Civil 3d", value: "Civil 3d" },
    { label: "CATIA", value: "CATIA" },
    { label: "Chief Architect", value: "Chief Architect" },
    { label: "Cedreo", value: "Cedreo" },
    { label: "InDesign", value: "InDesign" },
    { label: "All plan", value: "All plan" },
    { label: "Vectorworks Architect", value: "Vectorworks Architect" },
    { label: "Microstation", value: "Microstation" },
    { label: "Bricscad BIM", value: "Bricscad BIM" },
    { label: "CorelCAD", value: "CorelCAD" },
    { label: "Solidworks", value: "Solidworks" },
    { label: "3D Builder", value: "3D Builder" },
    { label: "3D Slash", value: "3D Slash" },
    { label: "3D Crafter", value: "3D Crafter" },
    { label: "Leopoly", value: "Leopoly" },
    { label: "ScultGL", value: "ScultGL" },
    { label: "LibreCAD", value: "LibreCAD" },
    { label: "QCAD", value: "QCAD" },
    { label: "K-3D", value: "K-3D" },
    { label: "LeoCAD", value: "LeoCAD" },
    { label: "Wings 3D", value: "Wings 3D" },
    { label: "TinkerCAD", value: "TinkerCAD" },
    { label: "BlocksCAD", value: "BlocksCAD" },
    { label: "Antimony", value: "Antimony" },
    { label: "Meshmixer", value: "Meshmixer" },
    { label: "Smoothie3D", value: "Smoothie3D" },
    { label: "OpenSCAD", value: "OpenSCAD" },
    { label: "Blender", value: "Blender" },
    { label: "SolveSpace", value: "SolveSpace" },
    { label: "eMachine", value: "eMachine" },
    { label: "Sculptris", value: "Sculptris" },
    { label: "Meshlab", value: "Meshlab" },
    { label: "HeeksCAD", value: "HeeksCAD" },
    { label: "DraftSight", value: "DraftSight" },
    { label: "NanoCAD", value: "NanoCAD" },
    { label: "Fusion360", value: "Fusion360" },
    { label: "Onshape", value: "Onshape" },
    { label: "Lumion", value: "Lumion" },
    { label: "3D Vector ", value: "Vector " },
    { label: "Octane Render", value: "Render" },
    { label: "Enscape", value: "Enscape" },
    { label: "Modo", value: "Modo" },
    { label: "Corona Renderer", value: "Corona Renderer" },
    { label: "Artlantis", value: "Artlantis" },
    { label: "Twin motion", value: "Twin motion" },
    { label: "Viz Render", value: "Viz Render" },
    { label: "Shapespark", value: "Shapespark" },
    { label: "Irender Nxt", value: "Irender Nxt" },
    { label: "D5 Render", value: "D5 Render" },
    { label: "Substance By Adobe", value: "Substance By Adobe" },
    { label: "Evermotion", value: "Evermotion" },
    { label: "Quixel Megascans", value: "Quixel Megascans" },
    { label: "Revizto", value: "Revizto" },
    { label: "TAD", value: "TAD" },
    { label: "Concept 3D", value: "Concept 3D" },
    { label: "Softplan", value: "Softplan" },
    { label: "Bluebeam Revu", value: "Revu" },
    { label: "Edificius", value: "Edificius" },
    { label: "Vectorworks", value: "Vectorworks" },
    { label: "Solidworks", value: "Solidworks" },
    { label: "ActCAD", value: "ActCAD" },
    { label: "Tekla Structures", value: "Tekla Structures" },
    { label: "Tinker CAD", value: "Tinker CAD" },
    { label: "PlusSpec", value: "PlusSpec" },
    { label: "Arcon Evo", value: "Evo" },
    { label: "Planner 5D", value: "Planner 5D" },
    { label: "Quickbase", value: "Quickbase" },
  ];
  const [unreadNotification, setUnreadNotification] = useState(null);
  useEffect(() => {
    const bringnotificationCount = () => {
      axios
        .post("http://13.52.16.160:8082/identity/unread_notification_count", {
          user_id: contextData?.userData?.user_id,
          user_token: contextData?.userData?.user_token,
          role: contextData?.userData?.role,
        })
        .then((res) => {
          if (res?.data?.status === "Success") {
            setUnreadNotification(res?.data?.data?.unread_count);
          }
        });
    };
    contextData?.userData && bringnotificationCount();
  }, [contextData?.userData]);
  const [unreadChatCount, setUnreadChatCount] = useState(null);
  useEffect(() => {
    contextData?.userData &&
      axios
        .post("http://13.52.16.160:8082/chat/unread_message_count", {
          user_id: contextData?.userData?.user_id,
          user_token: contextData?.userData?.user_token,
          role: contextData?.userData?.role,
        })
        .then((res) => {
          setUnreadChatCount(res?.data?.data?.unread_count);
        });
  }, [contextData?.userData]);

  const [notification, setNotification] = useState([]);

  return (
    <Global.Provider
      value={{
        ...contextData,
        dispatch,
        unreadChatCount,
        skillsOpt,
        showDisclamer,
        setShowDisclamer,
        unreadNotification,
        setUnreadNotification,
        notification,
        setNotification,
      }}
    >
      {props.children}
    </Global.Provider>
  );
};

export default GlobalData;

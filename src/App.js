import "./assets/css/style.css";
import "./assets/css/responsive.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignIn from "./Pages/Client/SignUp";
import Join from "./Pages/Join";
import SignInSelect from "./Pages/SignInSelect";
import QuadroTerms from "./Pages/Professional/QuadroTerms";
import GetVerified from "./Pages/Professional/GetVerified";
import SetUp from "./Pages/Professional/SetUp";
import KickAssForm from "./Pages/Professional/KickAssForm";
import ProfessionalDashboard from "./Pages/Professional/ProfessionalDashboard";
import TaskForm from "./Pages/Client/TaskForm";
import Chat from "./components/Chat";
import CategoryResult from "./Pages/CategoryResult";
import ClientDashboard from "./Pages/Client/ClientDashboard";
import ProfessionalProfile from "./Pages/ProfessionalProfile";
import ClientCategory from "./Pages/Client/ClientCategories";
import ProfessionalCategoryArchitecture from "./Pages/Professional/ProfessionalCategoryArchitecture";
import ProfessionalCategoryVisualization from "./Pages/Professional/ProfessionalCategoryVisualization";
import { IconContext } from "react-icons";
import Cart from "./Pages/Client/Cart";
import ClientCategoriesArchitectural from "./Pages/Client/ClientCategoriesArchitectural";
import ClientCatagoryVisualization from "./Pages/Client/ClientCatagoryVisualization";
import ClientBuySellDesign from "./Pages/Client/ClientBuySellDesign";
import ProfessionalBuyAndSale from "./Pages/Professional/ProfessionalBuyAndSale";
import Loader from "./components/Loader";
import ProjectDetails from "./components/ProjectDetails";
import ScrollToTop from "./Hooks/ScrollToTop";
import EditProfile from "./Pages/EditProfile";
import TermsAndCondition from "./Pages/TermsAndCondition";
import Global from "./context/Global";
import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
function App() {
  const contextData = useContext(Global);
  const [cookie,] = useCookies()
  useEffect(() => {
    axios.post("http://13.52.16.160:8082/identity/get_dashboard_profile/", {
      ...cookie?.user_data
    }).then((res) => {
      if (res.data.status === "Success") {
        localStorage.setItem(
          "profileImageNameGmail",
          JSON.stringify(res?.data?.data)
        );
        contextData?.dispatch({
          type: "FETCH_PROFILE_DATA",
          value: res?.data?.data,
        });
      }
    }).catch(error => {
      console.log(error.response.data)
    })
  }, [])
  return (
    <BrowserRouter basename={"/"}>
      <ScrollToTop />
      <IconContext.Provider value={{ color: "black", className: "global-class-name" }} >
        <Routes>

          <Route path="*" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/Loader" element={<Loader />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/quadroterms" element={<QuadroTerms />} />
          <Route path="/setup" element={<SetUp />} />
          <Route path="/kickassform" element={<KickAssForm />} />
          <Route path="/taskform" element={<TaskForm />} />

          <Route path="/client-sign-up" element={<SignIn />} />
          <Route path="/select-sign-in" element={<SignInSelect />} />

          {/* Professional Routes */}
          <Route path="/professionaldashboard" element={<ProfessionalDashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/professionalprofile/:professional_id" element={<ProfessionalProfile />} />

          <Route path="/categoryArchitecture" element={<ProfessionalCategoryArchitecture />} />
          <Route path="/categoryvisualization" element={<ProfessionalCategoryVisualization />} />
          <Route path="/professional-buy-and-sale" element={<ProfessionalBuyAndSale />} />

          {/* Client Routes */}
          <Route path="/clientdashboard" element={<ClientDashboard />} />
          <Route path="/clientCategory" element={<ClientCategory />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/client-architechture" element={<ClientCategoriesArchitectural />} />
          <Route path="/client-visualisation" element={<ClientCatagoryVisualization />} />
          <Route path="/client-buy-sell" element={<ClientBuySellDesign />} />
          <Route path="/project-details" element={<ProjectDetails />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/terms-condition" element={<TermsAndCondition />} />

          <Route path="/categoryresult" element={<CategoryResult />} />
          <Route path="/getverified" element={<GetVerified />} />
        </Routes>
      </IconContext.Provider>
    </BrowserRouter>
  );
}

export default App;

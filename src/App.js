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
import GlobalData from "./context/GlobalData";
import ProjectDetails from "./components/ProjectDetails";
import ScrollToTop from "./Hooks/ScrollToTop";
import EditProfile from "./Pages/EditProfile";
import TermsAndCondition from "./Pages/TermsAndCondition";
function App() {
  return (
    <GlobalData>
      <BrowserRouter basename={"/"}>
        <ScrollToTop />
        <IconContext.Provider
          value={{ color: "black", className: "global-class-name" }}
        >
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Loader" element={<Loader />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/client-sign-up" element={<SignIn />} />
            <Route exact path="/join" element={<Join />} />
            <Route exact path="/select-sign-in" element={<SignInSelect />} />
            <Route exact path="/quadroterms" element={<QuadroTerms />} />
            <Route exact path="/getverified" element={<GetVerified />} />
            <Route exact path="/setup" element={<SetUp />} />
            <Route exact path="/kickassform" element={<KickAssForm />} />

            <Route exact path="/taskform" element={<TaskForm />} />
            <Route exact path="/chat" element={<Chat />} />
            <Route exact path="/categoryresult" element={<CategoryResult />} />
            {/* Professional Routes */}
            <Route
              exact
              path="/professionaldashboard"
              element={<ProfessionalDashboard />}
            />

            <Route
              exact
              path="/professionalprofile/:professional_id"
              element={<ProfessionalProfile />}
            />
            <Route
              exact
              path="/categoryArchitecture"
              element={<ProfessionalCategoryArchitecture />}
            />
            <Route
              exact
              path="/categoryvisualization"
              element={<ProfessionalCategoryVisualization />}
            />
            <Route
              exact
              path="/professional-buy-and-sale"
              element={<ProfessionalBuyAndSale />}
            />

            {/* Client Routes */}
            <Route
              exact
              path="/clientdashboard"
              element={<ClientDashboard />}
            />
            <Route exact path="/clientCategory" element={<ClientCategory />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route
              exact
              path="/client-architechture"
              element={<ClientCategoriesArchitectural />}
            />
            <Route
              exact
              path="/client-visualisation"
              element={<ClientCatagoryVisualization />}
            />
            <Route
              exact
              path="/client-buy-sell"
              element={<ClientBuySellDesign />}
            />
            <Route exact path="/project-details" element={<ProjectDetails />} />
            <Route exact path="/edit-profile" element={<EditProfile />} />
            <Route
              exact
              path="/terms-condition"
              element={<TermsAndCondition />}
            />
          </Routes>
        </IconContext.Provider>
      </BrowserRouter>
    </GlobalData>
  );
}

export default App;

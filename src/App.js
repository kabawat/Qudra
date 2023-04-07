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

import BrowsePane from "./components/dashboard_tabs/Client/BrowsePane";
import OngoingPane from "./components/dashboard_tabs/Client/OngoingPane";
import CompletedPane from "./components/dashboard_tabs/Client/CompletedPane";
import Ratings from "./components/dashboard_tabs/Client/Ratings";
import Likes from "./components/dashboard_tabs/Client/Likes";
import ClientGuidlines from "./components/guidelines/ClientGuidlines";
import PortfolioPane from "./components/dashboard_tabs/Professional/PortfolioPane";
import ActivitiesPane from "./components/dashboard_tabs/Professional/ActivitiesPane";
import LikesShow from "./components/dashboard_tabs/Professional/Likes"
import Showratings from "./components/dashboard_tabs/Professional/Ratings"
import ProfessionalGuidelines from "./components/guidelines/ProfessionalGuidelines";
import RequestProjects from "./components/dashboard_tabs/Professional/RequestProjects";
import AcceptProject from "./components/dashboard_tabs/Client/acceptProject";
import { useCookies } from "react-cookie";
import DeclineProject from "./components/dashboard_tabs/Client/DeclineProject";
import PendingProject from "./components/dashboard_tabs/Client/PendingProject";
import DeclinedActivity from "./components/dashboard_tabs/Professional/DeclinedActivity";
import CompletedProject from "./components/dashboard_tabs/Professional/CompletedProject";
import Reject from "./components/project_process/Reject";
import PendingActivity from "./components/dashboard_tabs/Professional/PendingActivity";
import SubscriptionPlans from "./components/dashboard_tabs/Professional/subscription-plans";
import PurchaseDesign from "./components/dashboard_tabs/Client/purchase-design";

function App() {
  const [cookies] = useCookies()
  return (
    <BrowserRouter basename="/">
      <ScrollToTop />
      <IconContext.Provider value={{ color: "black", className: "global-class-name" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/Loader" element={<Loader />} />
          <Route path="/login" element={<Login />} />
          <Route path="/client-sign-up" element={<SignIn />} />
          <Route path="/join" element={<Join />} />
          <Route path="/select-sign-in" element={<SignInSelect />} />
          <Route path="/quadroterms" element={<QuadroTerms />} />
          <Route path="/setup" element={<SetUp />} />
          <Route path="/kickassform" element={<KickAssForm />} />
          <Route path="/taskform" element={<TaskForm />} />


          {/* Professional Routes */}
          <Route path="/professionaldashboard" element={<ProfessionalDashboard />} />
          <Route path="/Portfolio" element={<PortfolioPane />} />

          <Route path="/request-projects" element={<RequestProjects />} />
          <Route path="/pending-activity" element={<PendingActivity />} />
          <Route path="/myactivity" element={<ActivitiesPane />} />
          <Route path="/completed-activity" element={<CompletedProject />} />
          <Route path="/declined-activity" element={<DeclinedActivity />} />
          <Route path="/professional-Reject" element={<Reject />} />
          <Route path="/subscription-plans" element={<SubscriptionPlans />} />
          <Route path="/like" element={<LikesShow />} />
          <Route path="/ratings" element={<Showratings />} />
          <Route path="/professional-guidelines" element={<ProfessionalGuidelines />} />
{/* pending */}
          <Route path="/categoryArchitecture" element={<ProfessionalCategoryArchitecture />} />
          <Route path="/categoryvisualization" element={<ProfessionalCategoryVisualization />} />
{/* pending */}
          <Route path="/professional-buy-and-sale" element={<ProfessionalBuyAndSale />} />

          {/* Client Routes */}
          <Route path="/clientdashboard" element={<ClientDashboard />} />
          <Route path="/browse-professionals" element={<BrowsePane />} />
          <Route path="/ongoing-projects" element={<OngoingPane />} />
          <Route path="/pending-project" element={<PendingProject />} />
          <Route path="/accept-project" element={<AcceptProject />} />
          <Route path="/completed-projects" element={<CompletedPane />} />
          <Route path="/purchase-design" element={<PurchaseDesign />} />
          <Route path="/declined-projects" element={<DeclineProject />} />
          <Route path="/professionalprofile/:professional_id" element={<ProfessionalProfile />} />
          <Route path="/client-liked" element={<Likes />} />
          <Route path="/client-rating" element={<Ratings />} />
          <Route path="/client-guidlines" element={<ClientGuidlines />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/client-architechture" element={<ClientCategoriesArchitectural />} />
          <Route path="/client-visualisation" element={<ClientCatagoryVisualization />} />
          <Route path="/client-buy-sell" element={<ClientBuySellDesign />} />

          {/* both */}
          <Route path="/project-details" element={<ProjectDetails />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/chat" element={<Chat />} />

          {/* not now  */}
          <Route path="/clientCategory" element={<ClientCategory />} />
          <Route path="/terms-condition" element={<TermsAndCondition />} />
          <Route path="/categoryresult" element={<CategoryResult />} />
          <Route path="/getverified" element={<GetVerified />} />
        </Routes>
      </IconContext.Provider>
    </BrowserRouter>
  );
}

export default App;

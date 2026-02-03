import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

import Hero from "./Main/hero";
import Body from "./Body";
import ProtectedRoute from "./ProtectedRoute";

/* ===== MAIN PUBLIC PAGES ===== */

import Safety from "./Main/PagesMain/Safety";
import Blogs from "./Main/PagesMain/Blogs";
import Support from "./Main/PagesMain/Support";
import Tutorials from "./Main/PagesMain/Tutorials";

/* ===== CATEGORIES ===== */
import Community from "./Main/PagesMain/category/Community";
import Engineering from "./Main/PagesMain/category/Engineering";
import NewUpdates from "./Main/PagesMain/category/NewUpdates";
import Product from "./Main/PagesMain/category/Products";
import Privacy from "./Main/PagesMain/category/Privacy";
import UseCodeSarthi from "./Main/PagesMain/category/UseCodeSarthi";

/* ===== AUTH ===== */
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";

/* ===== APP (PROTECTED) ===== */
import Dashboard from "./Pages/Dashboard";
import Discussions from "./Pages/Discussions";
import Meeting from "./Pages/Meeting";
import Explore from "./Pages/Explore";
import Resume from "./Pages/Resume";
import Shastra from "./Pages/Shastra";
import Projects from "./Pages/Projects";
import ProjectManager from "./Pages/Project-Manager";
import Scheduler from "./Pages/Scheduler";
import Study from "./Pages/Study";
import Assignment from "./Pages/Assignment";
import Notes from "./Pages/Notes";
import ContactUs from "./Pages/Contact-Us";
import AboutUs from "./Pages/About-Us";
import PrivacyPolicy from "./Pages/Privacy-Policy";
import EditProfile from "./personalPages/editProfile";
import Connections from "./personalPages/Connections";
import Collab from "./Pages/Collab";
import Developers from "./Main/PagesMain/Developers";
import HTML from "./Pages/Toolkit/Htmlw";
import Toolkit from "./Pages/Toolkit/Toolkitw";
import Discover from "./Main/PagesMain/Discover";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>

          {/* 🌐 PUBLIC ROUTES */}
          <Route path="/" element={<Hero />} />

          <Route path="/discover" element={<Discover />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/support" element={<Support />} />
          <Route path="/tutorials" element={<Tutorials />} />

          {/* Categories */}
          <Route path="/community" element={<Community />} />
          <Route path="/engineering" element={<Engineering />} />
          <Route path="/new-updates" element={<NewUpdates />} />
          <Route path="/product" element={<Product />} />
          <Route path="/privacy-center" element={<Privacy />} />
          <Route path="/how-to-use" element={<UseCodeSarthi />} />

          {/* 🔐 AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 🔒 PROTECTED APP */}
          <Route path="/app" element={<Body />}>
            <Route element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="discussions" element={<Discussions />} />
              <Route path="management" element={<Collab />} />
              <Route path="meeting" element={<Meeting />} />
              <Route path="explore" element={<Explore />} />
              <Route path="resume" element={<Resume />} />
              <Route path="shastraAI" element={<Shastra />} />
              <Route path="projects" element={<Projects />} />
              <Route path="manager" element={<ProjectManager />} />
              <Route path="scheduler" element={<Scheduler />} />
              <Route path="study" element={<Study />} />
              <Route path="assignment" element={<Assignment />} />
              <Route path="notes" element={<Notes />} />
              <Route path="contactUs" element={<ContactUs />} />
              <Route path="aboutUs" element={<AboutUs />} />
              <Route path="privacypolicy" element={<PrivacyPolicy />} />
              <Route path="editProfile" element={<EditProfile />} />
              <Route path="connections" element={<Connections />} />

              <Route path="toolkit" element={<Toolkit />} />
              <Route path="toolkit/html" element={<HTML />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

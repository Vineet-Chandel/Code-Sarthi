import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import { gsap } from "gsap";
import ProtectedRoute from "./ProtectedRoute";
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
import { Provider } from "react-redux";
import appStore from "./utils/appStore.JS";





const App = () => {
  return (

    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          {/* ✅ Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 🔐 Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<Body />}>
              {/* default route */}
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="discussions" element={<Discussions />} />
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
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>

  );
};

export default App;

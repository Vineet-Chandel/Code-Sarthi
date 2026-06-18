//  IMPORTS OF LIBRARIES

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
//  STORE IMPORT --- consist of all slices of redux store ex. : userSlice, requestedUserSlice, receivedConnection, feedSlice,connectionSlice, chat-user-slice, blockedSlice etc. 
import appStore from "./utils/appStore";

//  PROTECTED ROUTE
import ProtectedRoute from "./ProtectedRoute";

// Landing Pages 

/* ===== HOMEPAGE ===== */
import Hero from "./Main/hero";
import Body from "./Body";
import TermsAndConditions from "./Main/PagesMain/Sub-Category/Blog-Category/TermsAndConditions";
import Safety from "./Main/PagesMain/Main-Category/Safety";
import Blogs from "./Main/PagesMain/Main-Category/Blogs";
import Support from "./Main/PagesMain/Main-Category/Support";
import Developers from "./Main/PagesMain/Main-Category/Developers";

/* =====Sub - CATEGORIES ===== */

import Engineering from "./Main/PagesMain/Sub-Category/Blog-Category/Engineering";
import NewUpdates from "./Main/PagesMain/Sub-Category/Blog-Category/NewUpdates";

import PolicyAndSafety from "./Main/PagesMain/Sub-Category/Blog-Category/PrivacyCenter"
import UseCodeSarthi from "./Main/PagesMain/Sub-Category/Blog-Category/UseCodeSarthi";
import HelpCenter from "./Main/PagesMain/Sub-Category/Support-Category/HelpCenter";
import PrivacyCenter from "./Main/PagesMain/Sub-Category/Blog-Category/PrivacyCenter";
import Feedback from "./Main/PagesMain/Sub-Category/Support-Category/Feedback";
import SubmitARequest from "./Main/PagesMain/Sub-Category/Support-Category/SubmitARequest";


/* ===== AUTH ===== */
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";

/* ===== APP (PROTECTED) ===== */
import Dashboard from "./Pages/Dashboard";
import Discussions from "./Pages/Discussions";
import Meeting from "./Pages/Meeting";
import Explore from "./Pages/Explore";

import Templates from "./Pages/CARRER-PROFILE-CREATION/2/Templates";
import HeaderContent from "./Pages/CARRER-PROFILE-CREATION/2/01_HEADER/StartHeader"
import HowResume from "./Pages/CARRER-PROFILE-CREATION/4/HowResume";
import HowCv from "./Pages/CARRER-PROFILE-CREATION/4/HowCv";
import HowCoverLetter from "./Pages/CARRER-PROFILE-CREATION/4/HowCoverLetter";
import CredentialsAnalyser from "./Pages/CARRER-PROFILE-CREATION/4/ConditionalAnlyz";
import BuildResume from "./Pages/CARRER-PROFILE-CREATION/2/01_HEADER/BuildResume";
import Shastra from "./Pages/Shastra";
import Projects from "./Pages/Projects";
import ProjectManager from "./Pages/Project-Manager";
import Scheduler from "./Pages/Scheduler";
import Study from "./Pages/Study";
import Assignment from "./Pages/Assignment";
import Notes from "./Pages/Notes";
import EditProfile from "./personalPages/editProfile";
import Connections from "./personalPages/Connections";
import Collab from "./Pages/DISCUSSION/Collab";
import HTML from "./Pages/Toolkit/Htmlw";
import Css from "./Pages/Toolkit/Css";
import Toolkit from "./Pages/Toolkit/Toolkitw";
import Review from "./Main/PagesMain/Sub-Category/Support-Category/Review";
import Settings from "./personalPages/Settings/Settings";
import RequestedUser from "./personalPages/RequestedUser";
import ReceivedRequests from "./personalPages/ReceivedRequests";
import SmartSchedulerLakshya from "./Main/PagesMain/Sub-Category/Blog-Category/SmartSchedulerLakshya";
import PrivacyPolicyHub from "./Main/PagesMain/Sub-Category/Safety-Category/Hub/PrivacyPolicyHub";
import IntroProject from "./Pages/CARRER-PROFILE-CREATION/2/06_PROJECT/IntroProject"
import IntroEXP from "./Pages/CARRER-PROFILE-CREATION/2/02_EXP/IntroEXP";
import IntroPreview from "./Pages/CARRER-PROFILE-CREATION/2/08_PREVIEW/IntroPreview";

import IntroSummary from "./Pages/CARRER-PROFILE-CREATION/2/05_PRSUM/IntroProfileSummary";
import Experience from "./Pages/CARRER-PROFILE-CREATION/2/02_EXP/Experinece";
import IntroEdu from "./Pages/CARRER-PROFILE-CREATION/2/03_EDU/IntroEdu";
import Education from "./Pages/CARRER-PROFILE-CREATION/2/03_EDU/Education";
import IntroSkill from "./Pages/CARRER-PROFILE-CREATION/2/04_SKILLS/IntroSkills";
import Skills from "./Pages/CARRER-PROFILE-CREATION/2/04_SKILLS/Skills";
import PageNotFound from "./ErrorSaver/PageNotFound";
import Summary from "./Pages/CARRER-PROFILE-CREATION/2/05_PRSUM/ProfileSummary";
import Project from "./Pages/CARRER-PROFILE-CREATION/2/06_PROJECT/Project";
import Preview from "./Pages/CARRER-PROFILE-CREATION/2/08_PREVIEW/Preview";
import IntroAdditional from "./Pages/CARRER-PROFILE-CREATION/2/07_ADDITIONAL/IntroAdditonals";
import FeildsAdditionals from "./Pages/CARRER-PROFILE-CREATION/2/07_ADDITIONAL/FeildsAdditionals";
import InterViewArena from "./Pages/INTERVIEW-ARENA/InterviewArena";

import MockInterview from "./Main/PagesMain/Sub-Category/Developers-Category/MOCK-INTERVIEWS/MockInterview";
import ResumeBuilder from "./Main/PagesMain/Sub-Category/Developers-Category/RESUME-BUILDER/ResumeBuilder";


const App = () => {
  return (
    <Provider store={appStore}>


      <BrowserRouter>
        <Routes>

          {/* 🌐 PUBLIC ROUTES */}

          {/* Route "/" is means the user simple type the domain link example : www.codesarthi.in or the default route of the project */}

          <Route path="/" element={<Hero />} />
          {/* 📌 PAGE NOT FOUND ROUTE */}
          <Route path="*" element={<PageNotFound />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/support" element={<Support />} />
          <Route path="/help-center" element={<HelpCenter />} />

          {/*  <Route path="/feedback" element={<Feedback />} />
           this lines means connect the route "/feedback" to the "Feedback component"
           So when i will type "/feedback" in the URL, it will open the Feedback component.*/}

          <Route path="/mock-interview" element={<MockInterview />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />



          <Route path="/feedback" element={<Feedback />} />
          <Route path="/submit-a-request" element={<SubmitARequest />} />
          <Route path="/privacy-center" element={<PrivacyCenter />} />
          <Route path="/smart-scheduler---lakshya" element={<SmartSchedulerLakshya />} />
          <Route path="/review" element={<Review />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-&-policy-hub" element={<PrivacyPolicyHub />} />
          {/* Categories */}

          <Route path="/engineering" element={<Engineering />} />
          <Route path="/new-updates" element={<NewUpdates />} />

          <Route path="/policy-and-safety" element={<PolicyAndSafety />} />
          <Route path="/how-to-use" element={<UseCodeSarthi />} />


          {/* 🔐 AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 🔒 PROTECTED APP */}

          {/* Body is the main container for the app it will have the sidebar and the main content area and it is the layout of the app
           so user will be redirect to the /app route when he will login */}
          <Route path="/app" element={<Body />}>

            <Route element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="discussions" element={<Discussions />} />
              <Route path="management" element={<Collab />} />
              <Route path="meeting" element={<Meeting />} />
              <Route path="explore" element={<Explore />} />

              <Route path="shastraAI" element={<Shastra />} />
              <Route path="projects" element={<Projects />} />
              <Route path="manager" element={<ProjectManager />} />
              <Route path="scheduler" element={<Scheduler />} />
              <Route path="study" element={<Study />} />
              <Route path="assignment" element={<Assignment />} />
              <Route path="notes" element={<Notes />} />
              <Route path="how-resume" element={<HowResume />} />
              <Route path="how-cv" element={<HowCv />} />
              <Route path="how-cover-letter" element={<HowCoverLetter />} />
              <Route path="credentials-analyser" element={<CredentialsAnalyser />} />



              <Route path="build-resume" element={<BuildResume />} />
              <Route path="build-resume/resume-templates" element={<Templates />} />
              <Route path="build-resume/header-content" element={<HeaderContent />} />
              <Route path="build-resume/project-content" element={<Project />} />
              <Route path="build-resume/intro-additionals-page" element={<IntroAdditional />} />
              <Route path="build-resume/additional-details" element={<FeildsAdditionals />} />
              <Route path="build-resume/intro-exp-page" element={<IntroEXP />} />
              <Route path="build-resume/intro-edu-page" element={< IntroEdu />} />
              <Route path="build-resume/intro-preview-page" element={< IntroPreview />} />
              <Route path="build-resume/intro-project-page" element={< IntroProject />} />
              <Route path="build-resume/intro-skill-page" element={< IntroSkill />} />
              <Route path="build-resume/intro-summary-page" element={< IntroSummary />} />
              <Route path="build-resume/summary-content" element={<Summary />} />
              <Route path="build-resume/preview-content" element={<Preview />} />
              <Route path="build-resume/skill-content" element={<Skills />} />
              <Route path="build-resume/experience-content" element={<Experience />} />
              <Route path="build-resume/education-content" element={<Education />} />



              <Route path="interview-arena" element={<InterViewArena />} />


              <Route path="editProfile" element={<EditProfile />} />
              <Route path="connections" element={<Connections />} />
              <Route path="settings" element={<Settings />} />
              <Route path="requestedUser" element={<RequestedUser />} />

              <Route path="requestreceived" element={<ReceivedRequests />} />

              <Route path="toolkit" element={<Toolkit />} />
              <Route path="toolkit/html" element={<HTML />} />
              <Route path="toolkit/css" element={<Css />} />

              {/* 📌 PAGE NOT FOUND ROUTE */}
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

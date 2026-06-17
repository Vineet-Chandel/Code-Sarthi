# CodeSarthi — Route Map

> Reference documentation for `App.jsx`'s routing configuration: every declared route, its access layer, and the component it renders.

**Stack:** React Router v6 (`react-router-dom`) · Redux (`react-redux`) · Custom `ProtectedRoute` guard

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [🌐 Public Routes](#public-routes)
  - [Landing & Core Info](#landing-core-info)
  - [Legal, Policy & Support](#legal-policy-support)
  - [Blog Sub-Categories](#blog-sub-categories)
- [🔐 Authentication](#authentication)
- [🔒 Protected Routes (`/app/*`)](#protected-routes)
  - [Core App & Productivity](#core-app-productivity)
  - [Career Profile Creation (Resume Builder)](#career-profile-creation)
  - [Interview Arena](#interview-arena)
  - [Account, Profile & Network](#account-profile-network)
  - [Developer Toolkit](#developer-toolkit)
- [📌 Fallback / Error Handling](#fallback-error-handling)
- [Known Issues](#known-issues)

---

<a name="architecture-overview"></a>
## Architecture Overview

The app is wrapped in a Redux `Provider` (`appStore`) inside a single `BrowserRouter`. Routes split into three layers:

1. **Public routes** — declared flat at the top level, no auth required.
2. **Auth routes** — `/login` and `/signup`.
3. **Protected routes** — nested under `/app` (which renders the `Body` layout), and further wrapped in a pathless `<Route element={<ProtectedRoute />}>` that gates access behind authentication.

**66** `<Route>` declarations in total 

---

<a name="public-routes"></a>
## 🌐 Public Routes

<a name="landing-core-info"></a>
### Landing & Core Info

| Route Path | Component | Purpose |
|---|---|---|
| `/` | Hero | Default landing page |
| `/developers` | Developers | Developer-facing info page |
| `/safety` | Safety | Platform safety info |
| `/blogs` | Blogs | Blog hub/landing |
| `/support` | Support | Support landing |
| `/help-center` | HelpCenter | Help center articles |

<a name="legal-policy-support"></a>
### Legal, Policy & Support

| Route Path | Component | Purpose |
|---|---|---|
| `/terms-and-conditions` | TermsAndConditions | Terms of service |
| `/privacy-center` | PrivacyCenter | Privacy info |
| `/policy-and-safety` | PolicyAndSafety | Policy & safety info ⚠️ shares a component with `/privacy-center` |
| `/privacy-&-policy-hub` | PrivacyPolicyHub | Combined privacy/policy hub |
| `/feedback` | Feedback | User feedback form |
| `/submit-a-request` | SubmitARequest | Support request form |
| `/review` | Review | Platform reviews |

<a name="blog-sub-categories"></a>
### Blog Sub-Categories

| Route Path | Component | Purpose |
|---|---|---|
| `/engineering` | Engineering | Engineering blog category |
| `/new-updates` | NewUpdates | Product updates category |
| `/how-to-use` | UseCodeSarthi | Usage guide category |
| `/smart-scheduler---lakshya` | SmartSchedulerLakshya | "Lakshya" scheduler feature blog |

---

<a name="authentication"></a>
## 🔐 Authentication

| Route Path | Component | Purpose |
|---|---|---|
| `/login` | Login | User login |
| `/signup` | Signup | User registration |

---

<a name="protected-routes"></a>
## 🔒 Protected Routes (`/app/*`)

> Everything below is nested under `<Route path="/app" element={<Body />}>` and gated by `<Route element={<ProtectedRoute />}>`.

<a name="core-app-productivity"></a>
### Core App & Productivity

| Route Path | Component | Purpose |
|---|---|---|
| `/app` (index) | Dashboard | Default view on entering `/app` |
| `/app/dashboard` | Dashboard | Main dashboard |
| `/app/discussions` | Discussions | Discussion threads |
| `/app/management` | Collab | Team collaboration/management |
| `/app/meeting` | Meeting | Meeting tool |
| `/app/explore` | Explore | Discovery/explore feed |
| `/app/projects` | Projects | Projects listing |
| `/app/manager` | ProjectManager | Project manager view |
| `/app/scheduler` | Scheduler | Scheduling tool |
| `/app/study` | Study | Study tool |
| `/app/assignment` | Assignment | Assignment tracking |
| `/app/notes` | Notes | Notes tool |
| `/app/shastraAI` | Shastra | Shastra AI assistant |

<a name="career-profile-creation"></a>
### Career Profile Creation (Resume Builder)

| Route Path | Component | Purpose |
|---|---|---|
| `/app/build-resume` | Resume | Builder entry point |
| `/app/build-resume/buildresume` | BuildResume | Builder shell/workspace |
| `/app/build-resume/resume-templates` | Templates | Template gallery |
| `/app/build-resume/header-content` | HeaderContent | Header info form |
| `/app/build-resume/intro-exp-page` | IntroEXP | Experience step intro |
| `/app/build-resume/experience-content` | Experience | Experience form |
| `/app/build-resume/intro-edu-page` | IntroEdu | Education step intro |
| `/app/build-resume/education-content` | Education | Education form |
| `/app/build-resume/intro-skill-page` | IntroSkill | Skills step intro |
| `/app/build-resume/skill-content` | Skills | Skills form |
| `/app/build-resume/intro-summary-page` | IntroSummary | Summary step intro |
| `/app/build-resume/summary-content` | Summary | Profile summary form |
| `/app/build-resume/intro-project-page` | IntroProject | Projects step intro |
| `/app/build-resume/project-content` | Project | Projects form |
| `/app/build-resume/intro-additionals-page` | IntroAdditional | Additional details intro |
| `/app/build-resume/additional-details` | FeildsAdditionals | Additional details form |
| `/app/build-resume/intro-preview-page` | IntroPreview | Preview step intro |
| `/app/build-resume/preview-content` | Preview | Final resume preview |
| `/app/how-resume` | HowResume | "How to write a resume" guide |
| `/app/how-cv` | HowCv | "How to write a CV" guide |
| `/app/how-cover-letter` | HowCoverLetter | "How to write a cover letter" guide |
| `/app/credentials-analyser` | CredentialsAnalyser | Credentials/JD analysis tool |

<a name="interview-arena"></a>
### Interview Arena

| Route Path | Component | Purpose |
|---|---|---|
| `/app/interview-arena` | InterViewArena | Interview prep hub |
| `/app/interview-arena/chakra` | Chakra | Chakravyūha interview module |

<a name="account-profile-network"></a>
### Account, Profile & Network

| Route Path | Component | Purpose |
|---|---|---|
| `/app/editProfile` | EditProfile | Edit user profile |
| `/app/connections` | Connections | User connections |
| `/app/settings` | Settings | Account settings |
| `/app/requestedUser` | RequestedUser | Sent connection requests ⚠️ declared twice |
| `/app/requestreceived` | ReceivedRequests | Received connection requests |

<a name="developer-toolkit"></a>
### Developer Toolkit

| Route Path | Component | Purpose |
|---|---|---|
| `/app/toolkit` | Toolkit | Toolkit hub |
| `/app/toolkit/html` | HTML | HTML playground/reference |
| `/app/toolkit/css` | Css | CSS playground/reference |

---

<a name="fallback-error-handling"></a>
## 📌 Fallback / Error Handling

| Route Path | Component | Purpose |
|---|---|---|
| `*` (top-level) | PageNotFound | Catches unmatched public routes |
| `/app/*` (nested) | PageNotFound | Catches unmatched routes inside the app shell |

---

*Generated from `App.jsx` — 66 routes,




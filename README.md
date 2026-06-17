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

**67** `<Route>` declarations in total — **66 unique paths** (one duplicate, see [Known Issues](#known-issues)).

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

<a name="known-issues"></a>
## Known Issues

- **Duplicate route:** `requestedUser` is registered twice with the identical path and element inside the protected route block. Harmless, but safe to remove.
- **Shared component:** `PolicyAndSafety` and `PrivacyCenter` both import from the same file (`Blog-Category/PrivacyCenter`), so `/policy-and-safety` and `/privacy-center` currently render identical content. Likely a placeholder pending its own page.

---

*Generated from `App.jsx` — 67 routes, 66 unique paths, 10 functional domains.*



# 🔐 Authentication API

## 1  ➤ Sign Up
Creates a new user account and returns user data with authentication cookie.

```
POST /auth/signup
```
---

### 📥 Request Body

```json
{
  "firstName": "Vineet",
  "middleName": "Kumar",
  "lastName": "Chandel",
  "gmail": "vineet@gmail.com",
  "password": "123456",
  "username": "vineet123",
  "age": 20,
  "gender": "male",
  "college": "PSIT Kanpur",
  "profession": "Student",
  "termsAccepted": true
}
```

### 📥 Response Body 

``` json

{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user_id",
    "firstName": "Vineet",
    "username": "vineet123",
    "gmail": "vineet@gmail.com"
}

```
### POINTERS :
1 ) if the gmail or username already exists  -- Request rejects with status code 409 .

2 ) encryption of the password is been done then only the whole data is been saved to our database .

3 )it will validate the credentials then it will save the cookies for the further api . 


---

## 2 ➤ Sign In
login the existing user after authenticating them. 

```
POST /auth/signin
```
---

### 📥 Request Body

```json
{
  "gmail": "vineet@gmail.com",
  "password": "123456",
}
```

### 📥 Response Body 

``` json

{
  "success": true,
  "message": "User logined successfully",
  "data": {
    "id": "user_id",
    "firstName": "Vineet",
    "username": "vineet123",
    "gmail": "vineet@gmail.com"
}

```
### POINTERS :
1 ) if the gmail or username not exists  -- Request rejects with status code 401 .

2 ) it will validate the credentials then it will save the cookies for the further api . 




## 3 ➤ Sign Out
Logs out the currently authenticated user by clearing the authentication cookie. 

```
POST /auth/signout
```
---

### 🔐 Authentication

- Requires user to be logged in  
- Uses cookie-based authentication (`token`)

---

### ⚙️ What it does

- Clears the JWT token stored in cookies  
- Ends user session on client side  

---

### 📥 Request

No request body required

---

## 4  ➤  Email Verification APIs

These APIs handle user email verification using OTP (One-Time Password).

---

## 🔐 Authentication Required

Both endpoints require:
- Logged-in user
- Valid JWT cookie (`token`)

---

### 📩 1. Send Verification OTP

### ➤ Send Otp
```
GET /auth/verify-email
```
---
### ⚙️ Features
- Generates a 6-digit OTP and sends it to the user's registered email.
- OTP is securely hashed using bcrypt  
- Stored in Redis with expiry (5 minutes)  
- Rate limited (max 3 attempts per 5 minutes)  
- Sends professional email template with OTP  

---

### 📥 Request

No body required


### 📤 Success Response (200)
```
{
  "success": true,
  "message": "Verification send to email"
}
```

### 📤 Already Verified (400)
```
{
  "success": false,
  "message": "User is already verified"
}
```

### 📤 Rate Limit Exceed (429)
```
{
  "success": false,
  "message": "Too many OTP requests. Try again later."
}
```


### 📩 1. To Verify OTP

### ➤ Verify Otp
```
POST /auth/verify-email
```
---
### ⚙️ Features
- Verifies the OTP entered by the user and marks the email as verified.
- Sends professional email template with confirmation of verification once the verification is been done  

---

### 📥 Request

```
{
  "toVerifyotp": "123456"
}
```


### 📤 Success Response (200)
```
{
  "success": true,
  "message": "Email verified"
}
```

### 📤 Invalid Otp (400)
```
{
  "success": false,
  "message": "Invalid Otp"
}
```

### 📤 OTP Expired (429)
```
{
  "success": false,
  "message": "Invalid Otp"
}
```

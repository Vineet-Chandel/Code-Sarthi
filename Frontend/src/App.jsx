import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";


import Hero from "./Main/hero";

// Main pages
import Discover from "./Main/PagesMain/Discover";
import Safety from "./Main/PagesMain/Safety";
import Blogs from "./Main/PagesMain/Blogs";
import Support from "./Main/PagesMain/Support";
import Tutorials from "./Main/PagesMain/Tutorials";

// Categories
import Community from "./Main/PagesMain/category/Community";
import Engineering from "./Main/PagesMain/category/Engineering";

import NewUpdates from "./Main/PagesMain/category/NewUpdates";
import Product from "./Main/PagesMain/category/Products";
import Privacy from "./Main/PagesMain/category/Privacy";
import UseCodeSarthi from "./Main/PagesMain/category/UseCodeSarthi";

// Auth & App
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import Body from "./Body";
import ProtectedRoute from "./ProtectedRoute";

// Dashboard pages (unchanged)
import Dashboard from "./Pages/Dashboard";
// ... other imports

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>

          {/* 🌐 MAIN PUBLIC LAYOUT */}
          <Route >
            <Route path="/" element={<Hero />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/support" element={<Support />} />
            <Route path="/tutorials" element={<Tutorials />} />

            {/* Categories */}
            <Route path="/community" element={<Community />} />
            <Route path="/engineering" element={<Engineering />} />
            <Route path="/new-updates" element={<NewUpdates />} />
            <Route path="/product" element={<Product />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/how-to-use" element={<UseCodeSarthi />} />
          </Route>

          {/* 🔐 AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 🔒 APP */}
          <Route path="/app" element={<Body />}>
            <Route element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              {/* rest of dashboard routes */}
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

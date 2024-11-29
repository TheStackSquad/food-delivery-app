//client/src/App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux"; // Import Redux Provider
import store from './redux/store';  // Import your Redux store

//import { LayoutProvider } from './GlobalLayout/LayoutContext'; // Your context provider
import GlobalLayout from './GlobalLayout/layout';
import ChatWidget from "./components/ChatWidget";
import Home from "./Pages/Home";
import Account from "./Pages/Account";
import Payment from "./Pages/Payment";
import Login from "./Pages/Login";
import Contact from "./Pages/Contact";
import Vendor from "./Pages/Vendor";
import Rider from "./Pages/Rider";
import Menu from "./Pages/Menu";
import Dashboard from "./Pages/Dashboard";
import VendorSignup from "./Pages/VendorRoutes/VendorSignUp";
import VendorLogin from "./Pages/VendorRoutes/VendorLogin";
import VendorDashboard from "./Pages/VendorRoutes/VendorDashboard";
import VendorProfile from "./Pages/VendorRoutes/VendorProfile";
import VendorPayout from "./Pages/VendorRoutes/VendorPayout";
import VendorAddMenu from "./Pages/VendorRoutes/VendorAddMenu";
import VendorInsight from "./Pages/VendorRoutes/VendorInsight";
import VendorLayout from './GlobalLayout/VendorLayout';
import RiderSignUp from "./Pages/RiderRoutes/RiderSignUp";
import RiderLogin from "./Pages/RiderRoutes/RiderLogin";
import RiderProfile from "./Pages/RiderRoutes/RiderProfile";
import RiderPayout from "./Pages/RiderRoutes/RiderPayout";
import RiderDelivery from "./Pages/RiderRoutes/RiderDeliveries";
import RiderInsight from "./Pages/RiderRoutes/RiderInsight";
import RiderLayout from './GlobalLayout/RiderLayout';

function App() {
  return (
    // Wrap the entire app with both the Redux Provider and Layout Provider
    <Provider store={store}> {/* Adding Redux store */}
      <Router>
        <GlobalLayout>
          <ChatWidget />
          
          <Routes> {/* Correct placement of Routes component */}
            {/* General Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/vendor" element={<Vendor />} />

            {/* Vendor Routes */}
            <Route path="/vendor" element={<VendorLayout />}>
              <Route path="signup" element={<VendorSignup />} />
              <Route path="login" element={<VendorLogin />} />
              <Route path="profile" element={<VendorProfile />} />
              <Route path="dashboard" element={<VendorDashboard />} />
              <Route path="payout" element={<VendorPayout />} />
              <Route path="addmenu" element={<VendorAddMenu />} />
              <Route path="insight" element={<VendorInsight />} />
            </Route>

            <Route path="/rider" element={<Rider />} />
            {/* Rider Routes */}
            <Route path="/rider" element={<RiderLayout />}>
              <Route path="login" element={<RiderLogin />} />
              <Route path="signup" element={<RiderSignUp />} />
              <Route path="profile" element={<RiderProfile />} />
              <Route path="payout" element={<RiderPayout />} />
              <Route path="delivery" element={<RiderDelivery />} />
              <Route path="insight" element={<RiderInsight />} />
            </Route>
            
          </Routes>
        </GlobalLayout>
      </Router>
    </Provider>
  );
}

export default App;

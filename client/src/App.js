//client/src/App.js
import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
//import { useDispatch, useSelector } from "react-redux";
//import { checkSession, refreshSession } from './redux/actions/vendorActions';

//import { LayoutProvider } from './GlobalLayout/LayoutContext'; // Your context provider
import GlobalLayout from "./GlobalLayout/layout";
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
import CheckoutPage from "./components/UI/CheckoutPage";
import VendorSignup from "./Pages/VendorRoutes/VendorSignUp";
import VendorLogin from "./Pages/VendorRoutes/VendorLogin";
import VendorDashboard from "./Pages/VendorRoutes/VendorDashboard";
import VendorProfile from "./Pages/VendorRoutes/VendorProfile";
import VendorPayout from "./Pages/VendorRoutes/VendorPayout";
import VendorAddMenu from "./Pages/VendorRoutes/VendorAddMenu";
import VendorInsight from "./Pages/VendorRoutes/VendorInsight";
import VendorLayout from "./GlobalLayout/VendorLayout";
import RiderSignUp from "./Pages/RiderRoutes/RiderSignUp";
import RiderLogin from "./Pages/RiderRoutes/RiderLogin";
import RiderProfile from "./Pages/RiderRoutes/RiderProfile";
import RiderPayout from "./Pages/RiderRoutes/RiderPayout";
import RiderDelivery from "./Pages/RiderRoutes/RiderDeliveries";
import RiderInsight from "./Pages/RiderRoutes/RiderInsight";
import RiderLayout from "./GlobalLayout/RiderLayout";

//ProtectedRoute
import ProtectedRoute from "./components/UI/ProtectedRoute";

function App() {
  return (
    <GlobalLayout>
      <ChatWidget />

      <Routes>
        {" "}
        {/* Correct placement of Routes component */}
        {/* General Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/vendor" element={<Vendor />} />
        {/* Vendor Routes */}
        <Route path="/vendor" element={<VendorLayout />}>
          <Route path="signup" element={<VendorSignup />} />
          <Route path="login" element={<VendorLogin />} />

          {/* Protected vendor routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<VendorProfile />} />
            <Route path="dashboard" element={<VendorDashboard />} />
            <Route path="payout" element={<VendorPayout />} />
       

            <Route path="addmenu" element={<VendorAddMenu />} />
<Route path="editmenu/:id" element={<VendorAddMenu isEditMode={true} />} />

            <Route path="insight" element={<VendorInsight />} />
          </Route>
          {/* Protected vendor routes */}
          
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
        {/* Fallback Route */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </GlobalLayout>
  );
}

export default App;

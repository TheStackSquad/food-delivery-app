// App.js
import React from "react";
import "./App.css";
import ChatWidget from "./components/ChatWidget";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { LayoutProvider } from './GlobalLayout/LayoutContext';
import GlobalLayout from './GlobalLayout/layout';

function App() {
  return (
    <Router>
      <LayoutProvider>
        <GlobalLayout>
          <ChatWidget />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/vendor" element={<Vendor />} />
            {/* Add nested signup route */}
            <Route path="/vendor" element={<VendorLayout />}>
            <Route path="/vendor/signup" element={<VendorSignup />} />
            <Route path="/vendor/profile" element={<VendorProfile />} />
            <Route path="/vendor/payout" element={<VendorPayout />} />
            <Route path="/vendor/addmenu" element={<VendorAddMenu />} />
            <Route path="/vendor/insight" element={<VendorInsight />} />
            </Route>

            <Route path="/rider" element={<Rider />} />
            <Route path="/rider" element={<RiderLayout />}>
            <Route path="/rider/login" element={<RiderLogin />} />
            <Route path="/rider/signup" element={<RiderSignUp />} />
            <Route path="/rider/profile" element={<RiderProfile />} />
            <Route path="/rider/payout" element={<RiderPayout />} />
            <Route path="/rider/delivery" element={<RiderDelivery />} />
            <Route path="/rider/insight" element={<RiderInsight />} />
            </Route>
          </Routes>
        </GlobalLayout>
      </LayoutProvider>
    </Router>
  );
}

export default App;

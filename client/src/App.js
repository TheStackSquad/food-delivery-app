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
       
        {/** <LayoutProvider>  */}
          <GlobalLayout>
            <ChatWidget />
            <Routes> {/* Correct placement of Routes component */}
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<Account />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login/dashboard" element={<Dashboard />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/vendor" element={<Vendor />} />

              {/* Vendor Nested Routes */}
              <Route path="/vendor" element={<VendorLayout />} />
              <Route path="/vendor/signup" element={<VendorSignup />} />
              <Route path="/vendor/login" element={<VendorLogin />} />
              <Route path="/vendor/profile" element={<VendorProfile />} />
              <Route path="/vendor/payout" element={<VendorPayout />} />
              <Route path="/vendor/addmenu" element={<VendorAddMenu />} />
              <Route path="/vendor/insight" element={<VendorInsight />} />
             
              <Route path="/rider" element={<Rider />} />

              {/* Rider Nested Routes */}
              <Route path="/rider" element={<RiderLayout />} />
              <Route path="/rider/login" element={<RiderLogin />} />
              <Route path="/rider/signup" element={<RiderSignUp />} />
              <Route path="/rider/profile" element={<RiderProfile />} />
              <Route path="/rider/payout" element={<RiderPayout />} />
              <Route path="/rider/delivery" element={<RiderDelivery />} />
              <Route path="/rider/insight" element={<RiderInsight />} />
            </Routes>
          </GlobalLayout>
       
          {/** </LayoutProvider> */}
      </Router>
    </Provider>
  );
}

export default App;

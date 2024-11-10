// App.js
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
import VendorSignup from "./Pages/VendorRoutes/VendorSignUp";
import VendorProfile from "./Pages/VendorRoutes/VendorProfile";
import VendorAddMenu from "./Pages/VendorRoutes/VendorAddMenu";

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
            <Route path="/contact" element={<Contact />} />
            <Route path="/vendor" element={<Vendor />} />
            {/* Add nested signup route */}
            <Route path="/vendor/signup" element={<VendorSignup />} />
            <Route path="/vendor/profile" element={<VendorProfile />} />
            <Route path="/vendor/addmenu" element={<VendorAddMenu />} />
            <Route path="/rider" element={<Rider />} />
          </Routes>
        </GlobalLayout>
      </LayoutProvider>
    </Router>
  );
}

export default App;

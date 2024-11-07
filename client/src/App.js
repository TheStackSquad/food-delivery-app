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
import { LayoutProvider } from './GlobalLayout/LayoutContext';
import GlobalLayout from './GlobalLayout/layout';

function App() {
  return (
    <Router>
      <LayoutProvider>
        {/* GlobalLayout placed outside to be globally accessible */}
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
            <Route path="/rider" element={<Rider />} />
          </Routes>
        </GlobalLayout>
      </LayoutProvider>
    </Router>
  );
}

export default App;

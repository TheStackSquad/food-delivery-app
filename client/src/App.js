// src/App.js
import "./App.css";
import ChatWidget from "./components/ChatWidget";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Account from "./Pages/Account";
import Payment from "./Pages/Payment";
import Contact from "./Pages/Contact";
import Menu from "./Pages/Menu";
import { LayoutProvider } from './GlobalLayout/LayoutContext';
import GlobalLayout from './GlobalLayout/layout';

function App() {
  return (
    <LayoutProvider>
      <Router>
        <GlobalLayout>
          <div className="App">
            <ChatWidget />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<Account />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </GlobalLayout>
      </Router>
    </LayoutProvider>
  );
}

export default App;
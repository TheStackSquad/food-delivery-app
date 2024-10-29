// src/App.js
import "./App.css";
import ChatWidget from "./components/ChatWidget";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Account from "./Pages/Account";
import Payment from "./Pages/Payment";
import Menu from "./Pages/Menu";
import GlobalLayout from './GlobalLayout/layout';

function App() {
  return (
    <Router>
      <GlobalLayout>
      <div className="App">
        {/* Place ChatWidget outside of Routes */}
        <ChatWidget />
        <Routes>
          {/* Define route components here */}
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
      </GlobalLayout>
    </Router>
  );
}

export default App;
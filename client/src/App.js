// src/App.js
import "./App.css";
import ChatWidget from "./components/ChatWidget";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Account from "./Pages/Account";
import Menu from "./Pages/Menu";
import { LayoutProvider } from './GlobalLayout/LayoutContext';
import GlobalLayout from './GlobalLayout/layout';

function App() {
  return (
    <LayoutProvider>
      <Router>
        <div className="App">
          <GlobalLayout /> {/* Adds GlobalLayout across all pages */}
          <ChatWidget />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </div>
      </Router>
    </LayoutProvider>
  );
}

export default App;

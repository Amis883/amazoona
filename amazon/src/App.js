import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductScreen from "./screen/ProductScreen";
import HomeScreen from "./screen/HomeScreen";

function App() {
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <a href="/" className="brand">
              amazona
            </a>
          </div>
          <div>
            <a href="/Cart">Cart</a>
            <a href="/signin">Sign In</a>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
          </Routes>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </Router>
  );
}

export default App;

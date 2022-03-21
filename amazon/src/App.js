import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductScreen from "./screen/ProductScreen";
import HomeScreen from "./screen/HomeScreen";

function App() {
  return (
    <Routes>
      {/* <div className="grid-container"> */}
      {/* <header className="row">
          <div>
            <a href="/" className="brand">
              amazona
            </a>
          </div>
          <div>
            <a href="/Cart">Cart</a>
            <a href="/signin">Sign In</a>
          </div>
        </header> */}
      {/* <main> */}
      <Route path="/" element={<HomeScreen />} />
      {/* <Route path="/product/:id" element={<ProductScreen />} /> */}
      {/* </main>
        <footer className="row center">All right reserved</footer> */}
      {/* </div> */}
    </Routes>
  );
}

export default App;

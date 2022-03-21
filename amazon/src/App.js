import React from "react";
import { Route, Router } from "react-router-dom";
import ProductScreen from "./screen/ProductScreen";
import HomeScreen from "./screen/HomeScreen";

function App() {
  return (
    <Router>
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
      <Route path="/" component={HomeScreen} />
      {/* <Route path="/product/:id" element={<ProductScreen />} /> */}
      {/* </main>
        <footer className="row center">All right reserved</footer> */}
      {/* </div> */}
    </Router>
  );
}

export default App;

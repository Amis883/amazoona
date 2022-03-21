import data from "./data";
import React from "react";
import Product from "./components/Product";
function App() {
  return (
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
        <ul>
          <li>Product1</li>

          <li>Product2</li>

          <li>Product3</li>

          <li>Product4</li>
        </ul>
        <div className="row center">
          {data.products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ItemsList from "./Components/itemsList";
import Menu from "./Components/menu";
import ItemPage from "./Components/itemPage";
import Cart from "./Components/cart";
import store from "./store";
import ItemsTable from "./Components/itemsTable";
import Checkout from './Components/checkout';

function App() {
  let [data, setData] = useState([]);
  let [cartItems, setCartItems] = useState([]);
  let url = process.env.REACT_APP_API + "products";

  store.subscribe(() => {
    setCartItems(store.getState());
  });

  const refreshList = () => {
    const abortCont = new AbortController();
    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        // setIsPending(false);
        // setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          // setIsPending(false);
          // setError(err.message);
        }
      });
    return () => abortCont.abort();
  };

  useEffect(() => {
    refreshList();
  });
  return (
    <div className="App">
      <Router>
        <Menu />

        <Routes>
          <Route
            path="/"
            element={<ItemsList allItems={data} title={"Items Catalog"} />}
          />
          <Route path="/items" element={<ItemsTable allItems={data} />} />
          <Route path="/items/:id" element={<ItemPage allItems={data} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

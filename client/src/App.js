import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ItemsList from "./Components/itemsList";
import Menu from "./Components/menu";
import ItemPage from "./Components/itemPage";
import Cart from "./Components/cart";
import store from "./store";
import Login from "./Components/login";

function App() {
  let [data, setData] = useState([]);
  let [cartItems, setCartItems] = useState([]);

  store.subscribe(() => {
    setCartItems(store.getState());
  });

  useEffect(() => {
    const abortCont = new AbortController();
    fetch("https://server-shop-2022.herokuapp.com/products", {
      signal: abortCont.signal,
    })
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
  }, [data]);

  return (
    <div className="App">
      <Router>
        <Menu />

        <Routes>
          {/* <Route path="/" element={<Login />} /> */}

          <Route
            path="/"
            element={<ItemsList allItems={data} title={"Items Catalog"} />}
          />
          {/* <Route path="/items" element={<ItemsList allItems={data} />} /> */}
          <Route path="/items/:id" element={<ItemPage allItems={data} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

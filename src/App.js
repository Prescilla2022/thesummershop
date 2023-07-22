import logo from "./logo.svg";
import { useState, createContext } from "react";
import "./App.css";
import Shop from "./components/Collections.js";
import "./styles/home.css";
import Shopping from "./images/summershop-removebg-preview.png";
import shoppingBag from "./images/shopping-bag.png";
import Cart from "./components/Cart.js";
import search from "./images/search.png";
export const dataContext = createContext();
function App() {
  const [cartVisibility, setCartVisibility] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [items, setItems] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchText, setSearch] = useState("");
  let value = null;
  const data = {
    cartVisibility,
    setCartVisibility,
    items,
    setItems,
    cartData,
    setCartData,
    quantity,
    setQuantity,
    totalPrice,
    setTotalPrice,
    value,
    searchText,
    setSearch,
  };

  //make the cart visible by setting the visiblility to true
  function openCart() {
    console.log("hai");
    setCartVisibility(true);
    console.log(cartVisibility);
  }
  function setInput(e) {
    value = e.target.value;

    setSearch(value);
    console.log(searchText);
  }

  return (
    <dataContext.Provider value={data}>
      <div>
        <div className="homeContainer">
          <div
            style={{
              margin: "2%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <input
              type="search"
              placeholder="Search here"
              onChange={setInput}
              style={{
                width: "50%",
                height: "4vh",
                borderRadius: "20px",
                border: "none",
              }}
            ></input>

            <div className="cartImg">
              <img
                style={{ height: "5vh", width: "5vh" }}
                src={shoppingBag}
                onClick={openCart}
              ></img>
              <p
                style={{
                  height: "4vh",
                  width: "4vh",
                  right: "15%",
                  borderRadius: "50%",
                  top: "-30%",

                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {items}
              </p>
            </div>
          </div>

          <div className="home">
            <Cart value1={cartVisibility} />
            <div className="mainContent">
              <p
                style={{
                  fontSize: "20px",
                  fontFamily: "cursive",
                  fontWeight: "bold",
                  margin: "0",
                  padding: "0",
                  color: "rgb(216, 6, 6)",
                }}
              >
                60% discount
              </p>
              <p
                style={{
                  fontWeight: "bolder",
                  fontSize: "40px",
                  fontWeight: "bold",
                  margin: "0",
                  padding: "0",
                }}
              >
                Summer Collection
              </p>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "large",
                  margin: "0",
                  padding: "0",
                  fontFamily: "cursive",
                }}
              >
                Best collection by 2023!
              </p>
              <button>Shop now</button>
            </div>
            <img src={Shopping}></img>
          </div>
        </div>
        <Shop />
      </div>
    </dataContext.Provider>
  );
}

export default App;

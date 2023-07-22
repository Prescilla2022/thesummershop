import React, { useEffect, useState } from "react";
import { dataContext } from "../App.js";
import { useContext } from "react";
export default function Shop() {
  const [data, setData] = useState([]);
  //const [cartData, setCartData] = useState([]);
  const myContext = useContext(dataContext);
  const [quantity, setQuantity] = useState({ value: 0 });
  const [counter, setCounter] = useState(1);
  const [cartDetails, setCartDetails] = useState([]);
  let filterName = "";
  let cartItems = [];
  let cartItemDetails = [];
  console.log(myContext.searchText);
  useEffect(() => {
    let count = quantity;
    console.log(quantity);
    setCounter(quantity);
    myContext.setItems((prev) => prev + 1);
    //myContext.setItems(myContext.item);
  }, [quantity]);

  useEffect(() => {
    console.log(cartDetails);
    console.log(cartItems);
    //myContext.setItems(myContext.item);
  }, [cartDetails]);

  function deleteItem(e) {
    // console.log(e.target.key);

    myContext.setItems((prev) => --prev);
    console.log(cartItems);
    console.log(e.target.name);
    cartItems.map((item, index) => {
      console.log(item.id);
      let price = 0;
      if (item.id == e.target.name) {
        console.log("same");
        let itemIndex = cartItems.indexOf(item);

        price = cartItems[itemIndex].price;
        myContext.setTotalPrice((prev) => prev - price);
        cartItems.splice(itemIndex, 1);
      }
    });
    //cartItems.splice(0, 1);
    console.log(cartItems);
    console.log(localStorage);
    localStorage.clear();
    cartItems.map((item, index) => {
      localStorage.setItem("newitem" + item.id, JSON.stringify(item));
    });
    e.target.parentElement.remove();

    console.log(localStorage);
  }

  function increaseQuantity(itemId) {
    // setQuantity((prev) => {prev,});
    //console.log(myContext.quantity);
    //setQuantity(Number(e.target.parentElement.children[1].innerHTML) + 1);
    //console.log(quantity);
  }

  function decreaseQuantity() {
    myContext.setQuantity((prev) => prev - 1);

    // myContext.setQuantity(myContext.quantity + 1);
  }

  useEffect(() => {
    console.log(localStorage);
    console.log(localStorage.key(0));
    cartItems = [];
    let price = 0;
    let cartCount = 0;
    for (let i = 0; i < localStorage.length; ++i) {
      if (localStorage.key(i).includes("newitem")) {
        cartCount++;
        cartItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        price += cartItems[cartItems.length - 1].price;

        //myContext.setTotalPrice((prev) => prev + price);
      }
    }
    myContext.setTotalPrice(price);
    myContext.setItems(cartCount);
    console.log(cartItems);
    myContext.setCartData((prev) => [...prev, cartItems]);

    const cartFormatted = cartItems.map((item, index) => {
      console.log(item);
      if (item !== null) {
        return (
          <div key={index}>
            <div
              name={item.title}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "5%",
                backgroundColor: "rgb(243, 240, 237)",
                marginTop: "20px",
                padding: "10px",
              }}
            >
              <img className="cartItemImage" src={item.image} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex" }}>
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    {item.title}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10%",
                  }}
                >
                  {/*<div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "5%",
                      border: "1px solid lightgrey",
                    }}
                  >
                    <button
                      className="cartButton"
                      onClick={() => decreaseQuantity}
                    >
                      -
                    </button>
                    <p
                      id="price"
                      style={{ margin: "0", padding: "0", fontSize: "12px" }}
                    >
                      {quantity.value+item.id}
                    </p>
                    <button className="cartButton" onClick={increaseQuantity(item.id)}>
                      +
                    </button>
                  </div>
                  */}
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "10px",
                      margin: "0",
                      padding: "0",
                    }}
                  >
                    ${item.price}
                  </p>
                </div>
              </div>
              <button
                style={{
                  backgroundColor: "rgb(243, 240, 237)",
                }}
                name={item.id}
                className="cartDeleteButton"
                onClick={deleteItem}
              >
                X
              </button>
            </div>
          </div>
        );
      }
    });
    myContext.setCartData(cartFormatted);
  }, []);

  async function getData() {
    //get fake items using api
    let result = await fetch("https://fakestoreapi.com/products").then((res) =>
      res.json()
    );

    function addToCart(e) {
      let indexName = 0;
      myContext.setItems((prev) => prev + 1);
      const filteredResult = result.filter(
        (data, index) => e.target.name == data.id
      );
      const formatted = filteredResult.map((item, index) => {
        cartItemDetails = item;
        let price = item.price;
        cartItems.push(item);
        setCartDetails((prev) => [...prev, cartItemDetails]);

        return (
          <div style={{}} key={index}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "5%",
                backgroundColor: "rgb(243, 240, 237)",
                marginTop: "20px",
                padding: "10px",
              }}
            >
              <img className="cartItemImage" src={item.image} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex" }}>
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    {item.title}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10%",
                  }}
                >
                  {/*<div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "5%",
                      border: "1px solid lightgrey",
                    }}
                  >
                    <button
                      className="cartButton"
                      onClick={() => decreaseQuantity}
                    >
                      -
                    </button>
                    <p
                      id="price"
                      style={{ margin: "0", padding: "0", fontSize: "12px" }}
                    >
                      {counter}
                    </p>
                    <button className="cartButton" onClick={increaseQuantity}>
                      +
                    </button>
                  </div>*/}
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "10px",
                      margin: "0",
                      padding: "0",
                    }}
                  >
                    ${Math.round(item.price)}
                  </p>
                </div>
              </div>
              <button
                style={{ backgroundColor: "rgb(243, 240, 237)" }}
                name={item.id}
                className="cartDeleteButton"
                onClick={deleteItem}
              >
                X
              </button>
            </div>
          </div>
        );
      });
      //console.log(filtered);
      console.log(formatted);
      myContext.setCartData((prev) => [prev, formatted]);
      //cartItems.push(formatted);
      myContext.setTotalPrice((prev) => prev + cartItemDetails.price);

      localStorage.setItem(
        "newitem" + cartItemDetails.id,
        JSON.stringify(cartItemDetails)
      );

      console.log(localStorage);
      console.log(localStorage);
      console.log(cartDetails);
      console.log(cartItems);
    }

    function removeFromCart() {
      myContext.setItems((prev) => --prev);
    }

    console.log(result);
    /*if (myContext.searchText === undefined) {
      result = result;
      console.log(result);
    } else {*/

    result = result.filter(
      (data) =>
        data.title.includes(`${myContext.searchText}`) ||
        data.description.includes(`${myContext.searchText}`)
    );

    const finalResult = result.map((item, index) => {
      return (
        <div key={item.id} className="itemContainer">
          <div className="imageContainer">
            <img className="itemImage" src={item.image} />
            <div style={{ position: "absolute" }}>
              <button
                className="increaseButton"
                name={item.id}
                onClick={addToCart}
              >
                +
              </button>
            </div>
          </div>
          <p style={{ fontWeight: "lighter" }}>
            {
              //Slice the first character of category and convert it to uppercase and concatenate with remaining characters.
              item.category.slice(0, 1).toUpperCase() + item.category.slice(1)
            }
          </p>
          <p style={{ fontWeight: "bold" }}>{item.title}</p>
          <p style={{ fontWeight: "bold" }}>{item.price}</p>
        </div>
      );
    });
    setData(finalResult);
  }

  useEffect(() => {
    getData();

    console.log(data); // eslint-disable-next-line
  }, []);
  useEffect(() => {
    console.log(myContext.searchText);
    getData();
    // filterName = myContext.searchText;
    //myContext.setItems(myContext.item);
  }, [myContext.searchText]);
  return <div className="shoppingItems">{data}</div>;
}

// GLOBAL VARIABLES
// Initialize an empty array for the shopping cart items
const shoppingCart = [];
// Create a variable for pulling the array from local storage
let loadedCart = JSON.parse(localStorage.getItem("cart"));
const ItemsQuantity = document.querySelector(".headerCartItemsQty__div");

function addToLocalStorage() {
  // select the data-id attribute of the item selected, store it in a variable
  const itemId = event.target.parentNode.parentNode.getAttribute("data-id");

  // Select the name element of the cart item selected, store in variable
  const nameElement = event.target.parentNode.parentNode.querySelector(
    ".itemName__h1"
  );
  // Get the text content of the nameElement, store in variable
  const name = nameElement.textContent;

  // Select the price element of the cart item selected, store in variable
  const priceElement = event.target.parentNode.querySelector(
    ".itemPrice__span"
  );
  // Get the text content of the priceElement, store in variable
  const price = priceElement.textContent;

  // Select the image element of the cart item selected, store in variable
  const imgElement = event.target.parentNode.parentNode.querySelector(
    ".item__img"
  );
  // Get the src attribute of the imgElement, store in variable
  const imgSrc = imgElement.getAttribute("src");

  // Get the img alt tage attribute, store in variable
  const imgAlt = imgElement.getAttribute("alt");

  // create a variable for the new item
  const newItem = {
    id: itemId,
    name: name,
    price: price,
    imgSrc: imgSrc,
    imgAlt: imgAlt,
    quantity: 1,
  };

  // add items to local storage
  /*Check to see if local storage is empty, if it is, 
  push the new item to shopping cart and set to local storage*/
  if (localStorage.getItem("cart") === null) {
    shoppingCart.push(newItem);
    window.localStorage.setItem("cart", JSON.stringify(shoppingCart));
  } else {
    /*Otherwise, check local storage to see if the item already exists, if it does, 
    increase the quantity by 1, otherwise added it to existing items and push to local storage*/
    const cartItem = loadedCart.find((c) => c.id === newItem.id);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      loadedCart.push(newItem);
    }
    window.localStorage.setItem("cart", JSON.stringify(loadedCart));
  }
}

// function to calculate cart item total on view cart button
function calculateCartItemTotal() {
  // Variable for cart item total
  let cartItemTotal = 0;
  // loop through loadedCart array and figure out how many items there are in local storage
  if (!loadedCart) {
    loadedCart = [];
    window.localStorage.setItem("cart", JSON.stringify(loadedCart));
  }
  for (let item of loadedCart) {
    cartItemTotal += parseInt(item.quantity, 10);
  }
  if (cartItemTotal === 0) {
    // hide the div if there are no items in the cart
    ItemsQuantity.classList.add("hide");
  } else {
    // set the text content for the quantity
    ItemsQuantity.classList.remove("hide");

    const cartItemsTotalP = document.querySelector(".headerCartItems__p");
    cartItemsTotalP.textContent = cartItemTotal;
  }
}

// Add event listener to the parent container for the items divs
document
  .querySelector(".itemsContainer__div")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("item__button")) {
      addToLocalStorage();
      calculateCartItemTotal();
    }
  });

// Invoking functions
calculateCartItemTotal();

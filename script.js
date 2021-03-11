// Select all the Add to Cart buttons
const addToCartButton = document.querySelectorAll(".item__button");
// Initialize an empty object for the cart item added
const cartItem = {};
// Initialize an empty array for the shopping cart items
const shoppingCart = [];

// Add event listener to the parent container for the items divs
document
  .querySelector(".itemsContainer__div")
  .addEventListener("click", (event) => {
    // Select the name element of the cart item selected, store in variable
    const nameElement = event.target.parentNode.parentNode.querySelector(
      ".itemName__h1"
    );
    // Get the text content of the nameElement, store in variable
    const name = nameElement.textContent;
    // add the name to the cartItem object
    cartItem.name = name;
    // Select the name element of the cart item selected, store in variable
    const priceElement = event.target.parentNode.querySelector(
      ".itemPrice__span"
    );
    // Get the text content of the priceElement, store in variable
    const price = priceElement.textContent;
    // add the price to the cartItem object
    cartItem.price = price;
    // Add the cartItem object to the shoppingCart array
    shoppingCart.push(cartItem);
    // Add shoppingCart array to local storage
    localStorage.setItem("cartItem", JSON.stringify(shoppingCart));
  });

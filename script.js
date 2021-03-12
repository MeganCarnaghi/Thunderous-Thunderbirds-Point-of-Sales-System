// Select all the Add to Cart buttons
const addToCartButton = document.querySelectorAll(".item__button");
// Initialize an empty array for the shopping cart items
const shoppingCart = [];

// Add event listener to the parent container for the items divs
document
  .querySelector(".itemsContainer__div")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("item__button")) {
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

      // add items to local storage
      if (localStorage.getItem("cart") === null) {
        shoppingCart.push({ name: name, price: price, imgSrc: imgSrc });
        window.localStorage.setItem("cart", JSON.stringify(shoppingCart));
      }

      const loadedCart = JSON.parse(localStorage.getItem("cart"));
      loadedCart.push({ name: name, price: price, imgSrc: imgSrc });
      window.localStorage.setItem("cart", JSON.stringify(loadedCart));
    }
  });

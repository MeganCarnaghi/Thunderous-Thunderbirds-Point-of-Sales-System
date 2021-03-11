// Retrieving items from local storage and adding them to page on page load
const loadedCart = JSON.parse(window.localStorage.getItem("cart"));
// variable for cart items
let cartTotal = 0;

// On page load, add items from local storage to cart.
for (let item of loadedCart) {
  // Create a new div for the item
  const newDiv = document.createElement("div");
  //Add a class to newDiv
  newDiv.classList.add("cartItem__div");
  // Append the div to the cartItems div
  document.querySelector(".cartItems__div").appendChild(newDiv);
  // Create a new image element
  const newImg = document.createElement("img");
  // Set the source attribute for the image
  newImg.setAttribute("src", item.imgSrc);
  // Add class to newImg
  newImg.classList.add("cartItem__img");
  // Add image to the new div
  newDiv.appendChild(newImg);
  // Create a subdiv for the name and price
  const subDiv = document.createElement("div");
  // Append the sub div to the new div
  newDiv.append(subDiv);
  // Create a new h2 for the item name
  const newh2 = document.createElement("h2");
  // Set text content for new h2
  newh2.textContent = item.name;
  // append new h2 to new div
  subDiv.appendChild(newh2);
  // create new h3 for the price
  const newh3 = document.createElement("h3");
  // Set text content for new h3
  newh3.textContent = `Price: $${item.price}`;
  // append new h2 to new div
  subDiv.appendChild(newh3);
  // Create a button to remove item from cart
  const newBtn = document.createElement("button");
  // Set text content for new button
  newBtn.textContent = "Remove Item";
  // Add .cartItemsRemove__button class to button
  newBtn.classList.add(".cartItemsRemove__button");
  // append new h2 to new div
  subDiv.appendChild(newBtn);
  // Add to cart total
  cartTotal++;
}

// Add event listener to the parent container for the cart items
document.querySelector(".cartItems__div").addEventListener("click", (event) => {
  // removes div from page
  if (event.target.classList.contains(".cartItemsRemove__button")) {
    // remove from local storage...
    const itemName = event.target.parentNode.firstChild.textContent;
    for (let item of loadedCart) {
      if (item.name === itemName) {
        loadedCart.splice(loadedCart.indexOf(item), 1);
        window.localStorage.setItem("cart", JSON.stringify(loadedCart));
      }
      // removes div from page
      event.target.parentNode.parentNode.remove();
    }
    // subtract from cartTotal
    cartTotal--;
  }
});

// If cartTotal = 0, display message
if (cartTotal === 0) {
  document.querySelector(".emptyCart__div").classList.remove("hidden");
}

// function to checkout and reveal payment and input div:
const checkoutButton = document.getElementById("checkout-button");
function checkout() {
  // declare variable for total and input divs here
  // [name of variable here].display = "block";
  // declare subtotal variable here
  // declare sales tax variable here
  // decalre total variable here
}

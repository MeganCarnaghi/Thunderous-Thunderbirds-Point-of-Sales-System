// Retrieving items from local storage and adding them to page on page load
const loadedCart = JSON.parse(window.localStorage.getItem("cart"));
// variable for cart items
let cartTotal = 0;
// variable for subtotal
let subtotal = 0;
// variable for sales tax
let salesTax = 0;
// function to check cartTotal and display message if = 0
function checkCartTotal() {
  if (cartTotal === 0) {
    document.querySelector(".emptyCart__div").classList.remove("hide");
  }
}

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
  // Create a subdiv for the name, price and quantity
  const subDiv = document.createElement("div");
  // Append the sub div to the new div
  newDiv.append(subDiv);
  // Create a new h2 for the item name
  const newh2 = document.createElement("h2");
  // Set text content for new h2
  newh2.textContent = item.name;
  // append new h2 to new div
  subDiv.appendChild(newh2);
  // Create a new input for the quantity
  const newInput = document.createElement("input");
  // Set type attribute as number
  newInput.setAttribute("type", "number");
  // Set text content for input
  newInput.value = item.quantity;
  // append type input to sub div
  subDiv.appendChild(newInput);
  // create new h3 for the price
  const newh3 = document.createElement("h3");
  // Set text content for new h3
  newh3.textContent = `Price: $${item.price * item.quantity}`;
  // const itemPrice = parseInt(item.price);
  // subtotal += itemPrice;
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

// function to update subtotals
function updateSubtotals() {
  const subtotalh1 = document.querySelector(".checkoutPageSubtotal__h1");
  subtotalh1.textContent = `Subtotal: $${subtotal}.00`;
  const subtotalP = document.querySelector(".subtotal__p");
  subtotalP.textContent = `Subtotal: $${subtotal}.00`;
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
        // subtract from subtotal
        subtotal -= item.price;
        updateSubtotals();
      }
      // removes div from page
      event.target.parentNode.parentNode.remove();
    }
    // subtract from cartTotal
    cartTotal--;
    // If cartTotal = 0, display message
    checkCartTotal();
  }
});

// function to checkout and reveal payment and input div:
const checkoutButton = document.querySelector(".checkout__button");
function checkout() {
  // get the divs for the total, input and payment sections:
  let totalSection = document.querySelector(".total__div");
  let inputSection = document.querySelector(".inputForm__div");
  let paymentSection = document.querySelector(".paymentForm__div");
  // change the total, input, and payment sections to be visible:
  totalSection.classList.remove("hide");
  inputSection.classList.remove("hide");
  paymentSection.classList.remove("hide");
  // update total:
}

// function calculate sales tax and return it to the sales tax line
function calculateTax(subtotal) {
  let salesTax = subtotal * 0.06;
  const taxP = document.querySelector(".tax__p");
  taxP.textContent = `Sales tax: $${salesTax.toFixed([2])}`;
}
// could not get total to update with just changing textContent to subtotal + salesTax.
// Attempting to write it as a function and store total in a variable.
// still not working!!! Can't even get it to console log anything.
function calculateTotal(subtotal, salesTax) {
  let finalTotal = subtotal + salesTax;
  const totalP = document.querySelector(".total__p");
  totalP.textContent = `Total: $${finalTotal.toFixed([2])}`;
  console.log(finalTotal);
}

// event listeners
checkoutButton.addEventListener(
  "click",
  checkout,
  calculateTax(subtotal),
  calculateTotal(subtotal, salesTax)
);

// invoking functions
updateSubtotals();
checkCartTotal();

// Retrieving items from local storage
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
    document.querySelector(".subtotal__div").classList.add("hide");
    document.querySelector(".total__div").classList.add("hide");
    document.querySelector(".inputForm__div").classList.add("hide");
    document.querySelector(".paymentForm__div").classList.add("hide");
  }
}

// On page load, add items from local storage to cart.
function addItemsToPage() {
  for (let item of loadedCart) {
    // Create a new div for the item
    const newDiv = document.createElement("div");
    // Set the data attribute for the new div as the data-id
    newDiv.setAttribute("data-id", item.id);
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
    // Create a new label element for the item quantity
    const newLabel = document.createElement("label");
    // Add class to label
    newLabel.classList.add("cartItemQty__label");
    // Set for attribute on label
    newLabel.setAttribute("for", item.id);
    // set text content for new P to item id
    newLabel.textContent = `Quantity: `;
    // Append new P to subDiv
    subDiv.appendChild(newLabel);
    // Create new input for the quantity
    const newInput = document.createElement("input");
    // Add class to new input
    newInput.classList.add("cartItemQty__input");
    // Set id, type and min attributes for input
    newInput.setAttribute("id", item.id);
    newInput.setAttribute("type", "number");
    newInput.setAttribute("min", 0);
    // Set value of input to item quantity
    newInput.value = item.quantity;
    // Append input to sub div
    subDiv.appendChild(newInput);
    // Create update quantity button
    const updateButton = document.createElement("button");
    // Set text of button
    updateButton.textContent = "Update";
    // Add class to button
    updateButton.classList.add("cartItemUpdateQty__button");
    // Append button to sub div
    subDiv.appendChild(updateButton);
    // create new h3 for the price
    const newh3price = document.createElement("h3");
    // Add class to h3
    newh3price.classList.add("cartItemPrice__h3");
    // Calculate price for items (item price * quantity)
    const itemPrice = item.price * item.quantity;
    //Set text content for new h3
    newh3price.textContent = `Price: $${itemPrice}`;
    // append new h2 to new div
    subDiv.appendChild(newh3price);
    // Create a button to remove item from cart
    const newBtn = document.createElement("button");
    // Set text content for new button
    newBtn.textContent = "Remove Item";
    // Add .cartItemsRemove__button class to button
    newBtn.classList.add("cartItemRemove__button");
    // append new h2 to new div
    subDiv.appendChild(newBtn);
    // Add +1 to cart total
    cartTotal++;
  }
}

// A function to calculate the subtotal and update appropriate spots on page
function calculateSubtotal() {
  for (let item of loadedCart) {
    let price = item.price * item.quantity;
    subtotal += price;
  }
}

// function to update the subtotal
function updateSubtotals() {
  const subtotalh1 = document.querySelector(".checkoutPageSubtotal__h1");
  subtotalh1.textContent = `Subtotal: $${subtotal}.00`;
  const subtotalP = document.querySelector(".subtotal__p");
  subtotalP.textContent = `Subtotal: $${subtotal}.00`;
}

// function to remove an item from the page
function removeCartItem() {
  // remove from local storage...
  const itemName = event.target.parentNode.firstChild.textContent;
  for (let item of loadedCart) {
    if (item.name === itemName) {
      loadedCart.splice(loadedCart.indexOf(item), 1);
      window.localStorage.setItem("cart", JSON.stringify(loadedCart));
      // subtract from subtotal
      subtotal -= item.price * item.quantity;
      // update subtotals on page
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
  console.log(salesTax);
}

// function to show the cash payment section when the cash radio button is checked
const paymentSubmitButton = document.getElementById("payment-submit");
function paymentMethod() {
  // get the value of the cash radio button in a variable
  let radioCash = document.getElementById("cash");
  // variable for the cash payment form div
  const cashForm = document.querySelector(".cashForm__div");
  // get the value of the credit radio button in a variable
  let radioCredit = document.getElementById("credit");
  // variable for the credit payment form div
  const creditForm = document.querySelector("creditForm__div");
  // if statement to change visibility of the cash or credit sections depending
  // on checked status of radio buttons
  if (radioCash === checked) {
    cashForm.classList.remove("hide");
  }
  if (radioCredit === checked) {
    creditForm.classList.remove("hide");
  }
}

// Event listeners
// Event listener to the parent container for the cart items
document.querySelector(".cartItems__div").addEventListener("click", (event) => {
  // If event target it the Remove Item button...
  if (event.target.classList.contains("cartItemRemove__button")) {
    removeCartItem();
  }

  if (event.target.classList.contains("cartItemUpdateQty__button")) {
    console.log("clicked");
    event.stopPropagation();
    // select the input
    const itemInput = event.target.previousSibling;
    // get the quantity and put it in a variable
    const itemQuantity = itemInput.value;
    // get the data id from the parent div
    const id = event.target.parentNode.parentNode.getAttribute("data-id");
    // select the price heading
    const priceH3 = event.target.nextSibling;
    // find the item with the same id in local storage
    const cartItem = loadedCart.find((c) => c.id === id);
    // update the quantity in the loadedCart array
    cartItem.quantity = itemQuantity;
    // save loaded cart to local storage
    window.localStorage.setItem("cart", JSON.stringify(loadedCart));
    // update price of item based on new quantity
    const newItemPrice = cartItem.price * cartItem.quantity;
    priceH3.textContent = `Price: $${newItemPrice}`;
  }
});

// Checkout button event listener
checkoutButton.addEventListener(
  "click",
  checkout,
  calculateTax(subtotal),
  calculateTotal(subtotal, salesTax)
);

// Submit payment event listener
paymentSubmitButton.addEventListener("click", paymentMethod);

// Invoking functions
addItemsToPage();
calculateSubtotal();
updateSubtotals();
checkCartTotal();

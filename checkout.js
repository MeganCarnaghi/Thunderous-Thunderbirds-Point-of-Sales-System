// GLOBAL VARIABLES
// Retrieving items from local storage
let loadedCart = JSON.parse(localStorage.getItem("cart"));
// Cart Item Quantity counter
const ItemsQuantity = document.querySelector(".headerCartItemsQty__div");
// variable for cart items
let cartTotal = 0;
// variable for subtotal
let subtotal = 0;
// variable for sales tax
let salesTax = 0;
// variable for final total (subtotal + salestax)
let finalTotal = 0;
const radioCash = document.getElementById("cash");
const radioCredit = document.getElementById("credit");
// variable for the change due paragraph
const changeP = document.getElementById("change-message");
// variable for the cash payment message paragraph
const cashP = document.getElementById("cash-message");
// variable for cash payment submit button
const cashSubmitButton = document.getElementById("cash-submit");
// variable for credit submit button
const creditSubmitButton = document.getElementById("credit-submit");
// variable for the checkout complete section
const checkoutComplete = document.querySelector(".checkoutComplete__div");
// Select the elements for the Payment Method Message Div to set
const paymentMethodMessageDiv = document.querySelector(
  ".paymentMethodMessage__div"
);
const paymentMessageh2 = document.querySelector(".paymentMethodMessage__h2");
const paymentMessageImg = document.querySelector(".paymentMethodMessage__img");
const paymentMessageP = document.querySelector(".paymentMethodMessage__p");
// select elements from the cash/credit payment type to hide after payment submitted
const cashFormDiv = document.querySelector(".cashForm__div");
const paymentForm = document.getElementById("payment__form");
const creditFormDiv = document.querySelector(".creditForm__div");
const paymentTotalDue = document.getElementById("payment-total");
const checkoutButton = document.querySelector(".checkout__button");
const subtotalDiv = document.querySelector(".subtotal__div");
const totalDiv = document.querySelector(".total__div");
const inputFormDiv = document.querySelector(".inputForm__div");
const paymentFormDiv = document.querySelector(".paymentForm__div");
const cartItemsDiv = document.querySelector(".cartItems__div");

// FUNCTIONS
// function to check cartTotal and display message if = 0
function checkCartTotal() {
  if (cartTotal === 0) {
    document.querySelector(".emptyCart__div").classList.remove("removed");
    subtotalDiv.classList.add("removed");
    totalDiv.classList.add("removed");
    inputFormDiv.classList.add("removed");
    paymentFormDiv.classList.add("removed");
  }
}

// Function to add items from local storage to cart on page load
function addItemsToPage() {
  for (let item of loadedCart) {
    // Create a new div for the item
    const newDiv = document.createElement("div");
    // Set the data attribute for the new div as the data-id
    newDiv.setAttribute("data-id", item.id);
    //Add a class to newDiv
    newDiv.classList.add("cartItem__div");
    // Append the div to the cartItems div
    cartItemsDiv.appendChild(newDiv);
    // Create a new image element
    const newImg = document.createElement("img");
    // Set the source and alt tags attribute for the image
    newImg.setAttribute("src", item.imgSrc);
    newImg.setAttribute("alt", item.imgAlt);
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
    // add class to new h2
    newh2.classList.add("cartItemName__h2");
    // Set text content for new h2
    newh2.textContent = item.name;
    // append new h2 to new div
    subDiv.appendChild(newh2);
    // Add new h3 for unit price
    const newh3UnitPrice = document.createElement("h3");
    // Set text content for new h3
    newh3UnitPrice.textContent = `Unit Price: $${item.price}`;
    // Append to sub div
    subDiv.appendChild(newh3UnitPrice);
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
    // create new h3 for the total price
    const newh3TotalPrice = document.createElement("h3");
    // Add class to h3
    newh3TotalPrice.classList.add("cartItemPrice__h3");
    // Calculate price for items (item price * quantity)
    const itemTotalPrice = item.price * item.quantity;
    //Set text content for new h3
    newh3TotalPrice.textContent = `Total Price: $${itemTotalPrice}`;
    // append new h2 to new div
    subDiv.appendChild(newh3TotalPrice);
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

// A function to calculate the subtotal
function calculateSubtotal() {
  for (let item of loadedCart) {
    let price = item.price * item.quantity;
    subtotal += price;
  }
}

// function to update the subtotal divs
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
    }
    // removes div from page
    event.target.parentNode.parentNode.remove();
  }
  // subtract from cartTotal
  cartTotal--;
  // If cartTotal = 0, display message
  checkCartTotal();
  window.location.reload();
}

// function to update the quantity of items
function updateItemQuantity() {
  // select the input
  const itemInput = event.target.previousSibling;
  // get the quantity and put it in a variable
  const itemQuantity = itemInput.value;
  // if item quantity <= 0 remove item
  if (itemQuantity <= 0) {
    removeCartItem();
  }
  // get the data id from the parent div
  else {
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
    // reload window to update qty and pricing
    window.location.reload();
  }
}

// Function to checkout and reveal payment and input div:
function checkout() {
  // change the total, input, and payment sections to be visible:
  totalDiv.classList.remove("removed");
  inputFormDiv.classList.remove("removed");
}

// function calculate sales tax and final totals
function calculateTax() {
  salesTax = subtotal * 0.06;
  console.log(salesTax);
  const taxP = document.querySelector(".tax__p");
  taxP.textContent = `Sales tax: $${salesTax.toFixed([2])}`;
  finalTotal = subtotal + salesTax;
  const totalP = document.querySelector(".total__h2");
  totalP.textContent = `Total: $${finalTotal.toFixed([2])}`;
}

// function to show the cash payment section when the cash radio button is checked
function showCash() {
  const cashForm = document.querySelector(".cashForm__div");
  const creditForm = document.querySelector(".creditForm__div");
  cashForm.classList.remove("removed");
  creditForm.classList.add("removed");
}

// function to show the credit payment section when the credit radio button is checked
function showCredit() {
  const cashForm = document.querySelector(".cashForm__div");
  const creditForm = document.querySelector(".creditForm__div");
  creditForm.classList.remove("removed");
  cashForm.classList.add("removed");
}

function cashSubmit() {
  // get the value entered in the amount tendered input
  const amountTendered = document.getElementById("amount-tendered").value;
  const changeDue = amountTendered - finalTotal;

  if (amountTendered < finalTotal) {
    // Show fail message
    paymentMethodMessageDiv.classList.remove("removed");
    paymentMessageh2.textContent =
      "Ruh Roh! That's not quite enough doggy bones.";
    paymentMessageImg.setAttribute("src", "images/dogbones.png");
    paymentMessageImg.setAttribute("alt", "dog bone");
    paymentMessageP.textContent =
      "Please try again with enough cash to cover the cost of your order.";
  }
  if (amountTendered >= finalTotal) {
    paymentMethodMessageDiv.classList.remove("removed");

    hideDivs();
    resetLocalStorage();
    // Show change due
    changeP.textContent = `Change due: $${changeDue.toFixed([2])}`;
    // Hide payment options
    cashFormDiv.classList.add("removed");
    paymentForm.classList.add("removed");
    paymentTotalDue.classList.add("removed");
    // Show success message
    paymentMessageh2.textContent = "Your transaction is complete!";
    paymentMessageImg.setAttribute("src", "images/coolpup.png");
    paymentMessageImg.setAttribute("alt", "dog with sunglasses");
    paymentMessageP.textContent =
      "Thank you for your order. You can view your purchase summary and print your receipt below.";
    // Show checkout complete div
    checkoutComplete.classList.remove("removed");
  }
}

// Function to validate all fields of credit card form are filled out
function validateCreditCardForm() {
  const form = document.getElementById("credit__form");
  if (form.checkValidity()) {
    creditSubmit();
    hideDivs();
    resetLocalStorage();
  } else {
    alert(
      "Please make sure all fields are filled out and your credit card information is accurate."
    );
  }
}

// Function for successful credit card submission
function creditSubmit() {
  const creditMessage = document.getElementById("credit-message");
  creditMessage.textContent = "Credit card transaction successful!";
  // Show success message
  paymentMessageh2.textContent = "Your purchse is complete!";
  paymentMessageImg.setAttribute("src", "images/coolpup.png");
  paymentMessageImg.setAttribute("alt", "dog with sunglasses");
  paymentMessageP.textContent =
    "Thank you for your order. You can view your purchase summary and print your receipt below.";
  checkoutComplete.classList.remove("removed");
  // Remove credit card and payment form div
  creditFormDiv.classList.add("removed");
  paymentForm.classList.add("removed");
  paymentTotalDue.classList.add("removed");
}

// Function to create receipt items div
function addItemsToReceipt() {
  for (let item of loadedCart) {
    // Create a new div for the item
    const receiptDiv = document.createElement("div");
    // add class to items div for styling
    receiptDiv.classList.add("receipt-items");
    // Append the div to the receipt cart div
    const parentDiv = document.getElementById("receiptItems-div");
    parentDiv.appendChild(receiptDiv);
    // Create a new h2 for the item name
    const receipth2 = document.createElement("h2");
    // Set text content for new h2
    receipth2.textContent = item.name;
    // append new h2 to receipt div
    receiptDiv.appendChild(receipth2);
    // Add new h3 for unit price
    const receipth3UnitPrice = document.createElement("h3");
    // Set text content for new h3
    receipth3UnitPrice.textContent = `Unit Price: $${item.price}`;
    // Append to receipt div
    receiptDiv.appendChild(receipth3UnitPrice);
    // Create a new h3 for item quantity
    const receiptQuantity = document.createElement("h3");
    // Set quantity
    receiptQuantity.textContent = `Quantity: ${item.quantity}`;
    // Append to receipt div
    receiptDiv.appendChild(receiptQuantity);
  }
}

// Function to view receipt when clicking the print receipt button
function setReceiptInfo() {
  const showReceipt = document.getElementById("receipt-div");
  // let receiptCart = document.getElementById("receipt-cart");
  const receiptSubtotal = document.getElementById("receipt-subtotal");
  const receiptSalesTax = document.getElementById("receipt-salestax");
  const receiptFinalTotal = document.getElementById("receipt-final-total");

  receiptSubtotal.textContent = `Subtotal: $${subtotal.toFixed([2])}`;
  receiptSalesTax.textContent = `Sales tax: $${salesTax.toFixed([2])}`;
  receiptFinalTotal.textContent = `Total: $${finalTotal.toFixed([2])}`;

  showReceipt.classList.remove("hide");

  // show Fancy Paws Puppy Boutique name on print receipt only
  const receiptTitle = document.getElementById("receipt-message");
  receiptTitle.classList.remove("removed");

  // set receipt date
  const currentDate = new Date();
  const cDay = currentDate.getDate();
  const cMonth = currentDate.getMonth() + 1;
  const cYear = currentDate.getFullYear();
  const date = `${cMonth}/${cDay}/${cYear}`;

  const receiptDate = document.getElementById("receipt-date");
  receiptDate.textContent = `Transaction date: ${date}`;

  // add payment method to receipt
  const paymentMethod = document.getElementById("receipt-payment-method");
  const creditCheck = document.getElementById("credit");
  const cashCheck = document.getElementById("cash");
  if (creditCheck.checked) {
    paymentMethod.textContent = `Payment method: credit`;
  }
  if (cashCheck.checked) {
    paymentMethod.textContent = `Payment method: cash`;
  }
}

// function to hide specific divs when order is complete and scroll payment div
function hideDivs() {
  subtotalDiv.classList.add("removed");
  totalDiv.classList.add("removed");
  inputFormDiv.style.display = "none";
  cartItemsDiv.classList.add("removed");
  paymentFormDiv.scrollIntoView();

  //update formatting of paymentformdiv
  paymentFormDiv.classList.add("paymentForm__divCheckout");
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
    cartItemTotal += parseInt(item.quantity);
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

// function to reset items in localstorage and itemcounter div
function resetLocalStorage() {
  window.localStorage.removeItem("cart");
  // window.localStorage.setItem("cart", JSON.stringify([]));
  ItemsQuantity.classList.add("hide");
}

// function for print receipt button
function printReceipt() {
  window.print();
}

// EVENT LISTENERS
// event listeners for payment radio buttons
radioCash.addEventListener("click", showCash);
radioCredit.addEventListener("click", showCredit);

// Event listener to view receipt details
document
  .getElementById("print-receipt")
  .addEventListener("click", printReceipt);

// Event listener to the parent container for the cart items
cartItemsDiv.addEventListener("click", (event) => {
  // If event target it the Remove Item button...
  if (event.target.classList.contains("cartItemRemove__button")) {
    removeCartItem();
  }

  if (event.target.classList.contains("cartItemUpdateQty__button")) {
    updateItemQuantity();
  }
});

// Event listener for submit button on contact information

document
  .querySelector(".inputForm__button")
  .addEventListener("click", (event) => {
    event.preventDefault();
    // Store user's name and email address in a variable
    userFullName = document.querySelector(".inputFullName__input").value;
    userEmail = document.querySelector(".inputEmail__input").value;

    // store in a variable for later use in the receipt
    const receiptUser = document.getElementById("receipt-user");
    const receiptEmail = document.getElementById("receipt-email");
    receiptUser.textContent = `Customer name: ${userFullName}`;
    receiptEmail.textContent = `Customer email: ${userEmail}`;

    const missingInfoFlexDiv = document.querySelector(
      ".inputFormMissingInfo_flexDiv"
    );

    if (userFullName === "" || userEmail === "") {
      missingInfoFlexDiv.classList.remove("removed");
    } else {
      missingInfoFlexDiv.classList.add("removed"); // Show the payment form div
      paymentFormDiv.classList.remove("removed");

      // update the payment total h2 in the payment form
      let paymentTotalDue = document.getElementById("payment-total");
      paymentTotalDue.textContent = `Your total payment due is: $${finalTotal.toFixed(
        [2]
      )}`;

      // Reset the name and email inputs
      document.querySelector(".inputFullName__input").value = "";
      document.querySelector(".inputEmail__input").value = "";
    }
  });

// Checkout button event listener
checkoutButton.addEventListener("click", () => {
  checkout();
});

// submit cash payment amount tendered event listener
cashSubmitButton.addEventListener("click", (event) => {
  event.preventDefault();
  cashSubmit();
  setReceiptInfo();
  addItemsToReceipt();
});

// submit credit payment event listener
creditSubmitButton.addEventListener("click", (event) => {
  event.preventDefault();
  validateCreditCardForm();
  setReceiptInfo();
  addItemsToReceipt();
});

// INVOKING FUNCTIONS
calculateCartItemTotal();
addItemsToPage();
calculateSubtotal();
updateSubtotals();
checkCartTotal();
calculateTax();

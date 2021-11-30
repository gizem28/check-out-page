const taxRate = 0.18;
const shippingPrice = 15.0;

window.onload = () => {
  window.localStorage.setItem("taxRate", taxRate);
  localStorage.setItem("shippingPrice", shippingPrice);

  window.sessionStorage.setItem("taxRate", taxRate);
  sessionStorage.setItem("shippingPrice", shippingPrice);

  calculateCartTotal();
};

let quantityControllerDivs = document.getElementsByClassName(
  "quantity-controller"
);
console.log(quantityControllerDivs);

[...quantityControllerDivs].forEach((quantityControllerDiv) => {
  //minus button
  let quantityP = quantityControllerDiv.querySelector("#product-quantity");
  quantityControllerDiv.firstElementChild.addEventListener("click", () => {
    // if(quantityP.innerText != "1"){
    //     quantityP.innerText = parseInt(quantityP.innerText) - 1;
    // }
    quantityP.innerText = parseInt(quantityP.innerText) - 1;
    if (quantityP.innerText == "0") {
      alert("product will be removed!");
      quantityControllerDiv.parentElement.parentElement.remove();
    }
    calculateProductTotal(quantityP);
  });
  //plus button
  quantityControllerDiv.lastElementChild.addEventListener("click", () => {
    quantityP.innerText = parseInt(quantityP.innerText) + 1;
    calculateProductTotal(quantityP);
  });
});

const calculateProductTotal = (quantityP) => {
  let productInfoDiv = quantityP.parentElement.parentElement;
  const productPrice = parseFloat(
    productInfoDiv.querySelector("strong").innerText
  );
  // console.log(productPrice);
  // console.log(quantityP.innerText);
  let productTotalPrice = productPrice * parseInt(quantityP.innerText);
  // console.log(productTotalPrice);
  let productTotalDiv = productInfoDiv.querySelector(".product-line-price");
  productTotalDiv.innerText = productTotalPrice.toFixed(2);
  calculateCartTotal();
};

const calculateCartTotal = () => {
  // NodeList.forEach or array.forEach
  let productTotalPrices = document.querySelectorAll(".product-line-price");

  // HTML Collection[...].forEach
  // let productTotalPrices = document.getElementsByClassName("product-line-price");

  let subtotal = 0;
  console.log(productTotalPrices);
  productTotalPrices.forEach((productPrice) => {
    subtotal += parseFloat(productPrice.innerText);
  });
  // console.log(subtotal);
  // let taxPrice = subtotal * taxRate;
  let taxPrice = subtotal * parseFloat(localStorage.getItem("taxRate"));
  let shipping = subtotal > 0 ? shippingPrice : 0;
  let cartTotal = subtotal + taxPrice + shipping;

  document.querySelector("#cart-subtotal p:nth-child(2)").innerText =
    subtotal.toFixed(2);
  document.querySelector("#cart-tax p:nth-child(2)").innerText =
    taxPrice.toFixed(2);
  document.querySelector("#cart-shipping p:nth-child(2)").innerText =
    shipping.toFixed(2);
  document.getElementById("cart-total").lastElementChild.innerText =
    cartTotal.toFixed(2);
};

document.querySelectorAll(".remove-product").forEach((removeButton) => {
  removeButton.addEventListener("click", () => {
    removeProduct(removeButton);
  });
});

const removeProduct = (removeButton) => {
  let productDiv = removeButton.parentElement.parentElement.parentElement;
  productDiv.remove();
  calculateCartTotal();
};

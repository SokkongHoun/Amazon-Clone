export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function totalQuantity() {
  let totalCartQuantity = 0;
  cart.forEach((cartItem) => {
    totalCartQuantity += cartItem.quantity;
  });
  return totalCartQuantity;
}

export function totalSumPrice(products) {
  let totalPrice = 0;
  cart.forEach((cartItem) => {
    let priceId = cartItem.productId;
    let matchingPriceId = products.find((product) => product.id === priceId);

    if (matchingPriceId && !isNaN(matchingPriceId.priceCents)) {
      totalPrice += cartItem.quantity * matchingPriceId.priceCents;
    }
  });
  return totalPrice;
}

const cartQuantity = document.querySelector(".js-total-quantity");

export function cartQuantityDisplay() {
  cartQuantity.innerHTML = `(${totalQuantity()})`;
}
export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

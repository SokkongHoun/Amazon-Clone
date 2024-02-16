export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function totalQuantity() {
  const totalCartQuantity = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );
  return totalCartQuantity;
}
console.log(totalQuantity());

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

// First you need to know which container the click handling is interact with than you need to know which delivery option you pick so you can display it onto the screen accordingly
// Note: the productId is matchingInCartItem.id; deliveryOptionId is the deliveryOption array --> deliveryId, so on the checkOut page it's option.id
// when we are interact with the delivery container, we can attact the data attribute to its main container to listening for click. When it receive the click, it will update the HTML page accordingly
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem = cart.find((item) => item.productId === productId);
  matchingItem.deliveryId = deliveryOptionId;

  saveToStorage();
}

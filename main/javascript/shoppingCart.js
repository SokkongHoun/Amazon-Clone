export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function totalQuantity() {
  let totalCartQuantity = 0;
  cart.forEach((cartItem) => {
    totalCartQuantity += cartItem.quantity;
  });
  return totalCartQuantity;
}
const cartQuantity = document.querySelector(".js-total-quantity");

export function cartQuantityDisplay() {
  cartQuantity.innerHTML = `(${totalQuantity()})`;
}
export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function totalQuantity() {
  let totalCartQuantity = 0;
  cart.forEach((cartItem) => {
    totalCartQuantity += cartItem.quantity;
  });
  return totalCartQuantity;
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
saveToStorage();

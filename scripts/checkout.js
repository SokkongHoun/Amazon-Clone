import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/cart-class.js";
import { loadProduct, loadCart, fetchProducts } from "../data/products.js";

Promise.all([
  fetchProducts(),

  new Promise((resolve) => {
    loadCart(() => {
      resolve("load cart");
    });
  }),
]).then((value) => {
  console.log(value);
  renderOrderSummary();
  renderPaymentSummary();
});

/*
new Promise((resolve) => {
  loadProduct(() => {
    resolve();
  });
})
  .then(() => {
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
*/
/*
loadProduct(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

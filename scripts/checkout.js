import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/cart-class.js";
import { loadProduct, loadCart } from "../data/products.js";

Promise.all([
  new Promise((resolve) => {
    loadProduct(() => {
      resolve("load products");
    });
  }),
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

import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/cart-class.js";
import { loadProduct } from "../data/products.js";

loadProduct(() => {
  renderOrderSummary();
  renderPaymentSummary();
});

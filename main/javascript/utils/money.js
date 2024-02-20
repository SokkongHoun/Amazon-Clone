import { updateDeliveryOption } from "../shoppingCart.js";

export function currencyFormat(priceCents) {
  return (priceCents / 100).toFixed(2);
}

const summaryPageCard = document.querySelector(".js-order-sum-row");

export function reviewOrderCard(totalQuantity, syncTotalitemPrice) {
  let totalBeforeTax = syncTotalitemPrice;
  let EstimatedTax = totalBeforeTax * 0.1;

  let orderTotal = totalBeforeTax + EstimatedTax;

  summaryPageCard.innerHTML = `
  <div class="order-summary-container">
    <div>
      <h4>Order</h4>
      <div class="orderSummaryItem">
        <p>Items (${totalQuantity}):</p>
        <p>$${syncTotalitemPrice}</p>
      </div>
      <div class="orderSummaryItem">
        <p>Shipping & handling:</p>
        <p class="js-shipping-price">$0</p>
      </div>
      <div class="orderSummaryItem">
        <p>Total before tax:</p>
        <p>$${totalBeforeTax}</p>
      </div>
      <div class="orderSummaryItem">
        <p>Estimated tax (10%)</p>
        <p>$${EstimatedTax.toFixed(2)}</p>
      </div>
      <hr />
      <div class="orderSummaryItem">
        <h4 style="color: brown">Order total:</h4>
        <h4 style="color: brown">$${Number(orderTotal).toFixed(2)}</h4>
      </div>
    </div>
  </div>
`;
}

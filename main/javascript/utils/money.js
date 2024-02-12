export function currencyFormat(priceCents) {
  return (priceCents / 100).toFixed(2);
}

export function unitProductPrice(inCartItem, matchingInCartItem) {
  let totalPrice = inCartItem.quantity * matchingInCartItem.priceCents;

  return totalPrice;
}
const summaryPageCard = document.querySelector(".js-order-sum-row");

function estimatedTax(totalSumPrice) {
  return (currencyFormat(totalSumPrice) * 0.1).toFixed(2);
}

export function cartProductTotalPrice(cartInfo) {
  const { totalSumPrice, inCartItem, matchingInCartItem } = cartInfo;

  const unitPrice = unitProductPrice(inCartItem, matchingInCartItem);
  const tax = estimatedTax(totalSumPrice);

  const totalPrice = unitPrice + parseFloat(tax);

  return {
    totalPrice,
    unitPrice: parseFloat(unitPrice),
    tax: parseFloat(tax),
  };
}

export function reviewOrderCard(totalCartQuantity, totalSumPrice) {
  summaryPageCard.innerHTML = `
<div class="order-summary-container">
              <div>
                <h4>Order</h4>
                <div class="orderSummaryItem">
                  <p>Items (${totalCartQuantity}):</p>
                  <p>$${currencyFormat(totalSumPrice)}</p>
                </div>
                <div class="orderSummaryItem">
                  <p>Shipping & handling:</p>
                  <p>0.00</p>
                </div>
                <div class="orderSummaryItem">
                  <p>Total before tax:</p>
                  <p>$${currencyFormat(totalSumPrice)}</p>
                </div>
                <div class="orderSummaryItem">
                  <p>Estimated tax (10%)</p>
                  <p>$${estimatedTax(totalSumPrice)}</p>
                </div>
                <hr />
                <div class="orderSummaryItem">
                  <h4 style="color: brown">Order total:</h4>
                  <h4 style="color: brown"></h4>
                </div>
              </div>
            </div>
`;
}

import { cart, saveToStorage } from "./shoppingCart.js";
import { products } from "../../data/product.js";
import { currencyFormat } from "./utils/money.js";

const checkOutProductContainer = document.querySelector(
  ".js-checkout-container"
);
let checkOutHtml = "";

cart.forEach((inCartItem) => {
  let inCartItemID = inCartItem.productId;
  let matchingInCartItem = products.find(
    (product) => product.id === inCartItemID
  );

  checkOutHtml += `
  <div class="checkout-container">
        <div>
            <p class="delivery-date">
                Delivery date: Wednesday, January 10
            </p>
                <div class="delivery-details-container">
                  <div class="delivery-image">
                    <img
                      src="${matchingInCartItem.image}"
                    />
                  </div>
                  <div class="delivery-control">
                    <p class="delivery-name">
                      ${matchingInCartItem.name}
                    </p>
                    <p>$${currencyFormat(matchingInCartItem.priceCents)}</p>
                    <div class="delivery-update-quantity">
                      <p>Quantity: 1</p>
                      <a>Update</a>
                      <a class="js-delete" data-delete-Id=${
                        matchingInCartItem.id
                      }
                      }>Delete</a>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="delivery-option">
                    <p>Choose a delivery options:
                    </p>
                    <div class="delivery-period-1">
                        <input type="radio" name="deliveryOption" />
                        <div class="delivery-option-1">
                        <p style="margin-bottom: 0px; color: #002044d8">
                            <b>Wednesday, January 10</b>
                        </p>
                        <p>FREE Shipping</p>
                        </div>
                    </div>
                    <div class="delivery-period-1">
                        <input type="radio" name="deliveryOption" />
                        <div class="delivery-option-1">
                        <p style="margin-bottom: 0px; color: #002044d8">
                            <b> Thursday, January 4</b>
                        </p>
                        <p>$4.99 - Shipping</p>
                        </div>
                    </div>
                    <div class="delivery-period-1">
                        <input type="radio" name="deliveryOption" />
                        <div class="delivery-option-1">
                        <p style="margin-bottom: 0px; color: #002044d8">
                            <b>Wednesday, January 10</b>
                        </p>
                        <p>$9.99 - Shipping</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;
  checkOutProductContainer.innerHTML = checkOutHtml;

  const deleteButton = document.querySelectorAll(".js-delete");
  deleteButton.forEach((btn) => {
    let delBtnId = btn.dataset.deleteId;
    btn.addEventListener("click", () => {
      let parentContainer = btn.closest(".checkout-container");
      parentContainer.remove();

      let index = cart.findIndex((item) => item.productId === delBtnId);
      if (index !== -1) {
        cart.splice(index, 1);
      }
      saveToStorage();
      console.log(`Deleted product with id: ${delBtnId}`);
      console.log(cart);
    });
  });
});

import { cart, saveToStorage, cartQuantityDisplay } from "./shoppingCart.js";
import { products } from "../../data/product.js";
import { currencyFormat } from "./utils/money.js";
const checkOutProductContainer = document.querySelector(
  ".js-checkout-container"
);
function renderCheckOutPage() {
  let checkOutHtml = "";

  cart.forEach((inCartItem) => {
    let inCartItemID = inCartItem.productId;
    let matchingInCartItem = products.find(
      (product) => product.id === inCartItemID
    );
    checkOutHtml += `
    <div class="checkout-container js-checkout-container">
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
                        <p>Quantity: <span class="quantity-amount js-amount-lable">${
                          inCartItem.quantity
                        }</span></p>
                        <input class="quantity-input js-quantity-input" data-input-id=${
                          matchingInCartItem.id
                        } type="number" min="0">
                        <a class="update-link js-update-quantity" data-update-id=${
                          matchingInCartItem.id
                        }>Update</a>
                        <a class="save-link js-save-link" data-save-id=${
                          matchingInCartItem.id
                        }>Save</a>
                        <a class="delete-link js-delete" data-delete-Id=${
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
        cartQuantityDisplay();
      });
    });

    const updateButton = document.querySelectorAll(".js-update-quantity");

    updateButton.forEach((btn) => {
      btn.addEventListener("click", () => {
        // let updateId = btn.dataset.updateId;
        let parentContainer = btn.closest(".js-checkout-container");

        parentContainer.classList.add("editing-container");
      });
    });

    const saveButton = document.querySelectorAll(".js-save-link");
    saveButton.forEach((btn) => {
      btn.addEventListener("click", () => {
        const parentContainer = btn.closest(".js-checkout-container");
        const saveLink = btn.dataset.saveId;
        const inputId = document.querySelector(
          `.js-quantity-input[data-input-id="${saveLink}"]`
        );
        let checkOutId = cart.find((id) => id.productId === saveLink);

        // let quantityToSave = checkOutId.quantity;

        const inputVal = inputId.value;

        checkOutId.quantity = Number(inputVal);
        saveToStorage();
        parentContainer.classList.remove("editing-container");

        renderCheckOutPage();
        cartQuantityDisplay();
      });
    });
  });
}

renderCheckOutPage();
cartQuantityDisplay();

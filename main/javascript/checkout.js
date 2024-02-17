import {
  cart,
  saveToStorage,
  cartQuantityDisplay,
  totalQuantity,
  totalSumPrice,
  updateDeliveryOption,
} from "./shoppingCart.js";
import { products } from "../../data/product.js";
import {
  currencyFormat,
  unitProductPrice,
  reviewOrderCard,
} from "./utils/money.js";
import { deliveryOption } from "../../data/deliveryOptions.js";

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
    checkOutHtml += renderProductDetails(inCartItem, matchingInCartItem);
  });

  checkOutProductContainer.innerHTML = checkOutHtml;

  function renderProductDetails(inCartItem, matchingInCartItem) {
    const inCartDeliveryId = inCartItem.deliveryId;

    let deliveryOptions = deliveryOption.find(
      (option) => inCartDeliveryId === option.id
    );

    const today = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(
      today.getDate() + parseInt(deliveryOptions.deliveryDay)
    );
    const dateString = deliveryDate.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return `
    <div class="checkout-container js-checkout-container">
      <div>
          <p class="delivery-date">
              Delivery date: ${dateString}
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
                  <p class="js-priceCents">$${currencyFormat(
                    unitProductPrice(inCartItem, matchingInCartItem)
                  )}</p>
                  <div class="delivery-update-quantity">
                    <p>Quantity: <span class="quantity-amount js-amount-lable">${
                      inCartItem.quantity
                    }</span></p>
                    <a class="delete-link js-delete" data-delete-Id=${
                      matchingInCartItem.id
                    }>Delete</a>
                  </div>
                </div>
              </div>
            </div>
          <div>
            <div class="delivery-option">
                <p>Choose a delivery options:
                </p>
                ${deliveryOptionHTML(matchingInCartItem, inCartItem)}
            </div>
          </div>
      </div>
    </div>
    `;
  }

  function deliveryOptionHTML(matchingInCartItem, inCartItem) {
    let html = "";
    deliveryOption.forEach((option) => {
      const isChecked = option.id === inCartItem.deliveryId;
      const today = new Date();
      const deliveryDate = new Date();
      deliveryDate.setDate(today.getDate() + parseInt(option.deliveryDay));
      const dateString = deliveryDate.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const priceString =
        option.priceCents === 0
          ? "FREE - Shipping"
          : `${currencyFormat(option.priceCents)}`;
      html += `
        <div class="delivery-period-1 js-delivery-option" 
          data-product-id="${matchingInCartItem.id}" 
          data-delivery-option-id="${option.id}">
            <input type="radio"  
            ${isChecked ? `checked` : ""}
            name=${matchingInCartItem.id} />
          <div class="delivery-option-1">
            <p style="margin-bottom: 0px; color: #002044d8">
              <b>${dateString}</b>
            </p>
            <p>$${priceString}</p>
          </div>
        </div>
      `;
    });
    return html;
  }

  // Event listeners
  handleRadioDeliveryDate();
  handleDeleteClick();
}

// CONTROLLER

// Handle delete action
function handleDeleteClick() {
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

      const updatedTotalSumPrice = totalSumPrice(products);
      saveToStorage();
      cartQuantityDisplay();
      reviewOrderCard(totalQuantity(), updatedTotalSumPrice);
      renderCheckOutPage();
    });
  });
}

// Handle radio selector delivery Date
function handleRadioDeliveryDate() {
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;

      updateDeliveryOption(productId, deliveryOptionId);
      renderCheckOutPage();
    });
  });
}

// function is responsible for attaching a click event listener to the checkOutProductContainer
function attachEventListeners() {
  checkOutProductContainer.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("js-delete")) {
      handleDeleteClick(target.dataset.deleteId);
    }
    // else if (target.classList.contains("js-update-quantity")) {
    //   handleUpdateClick(target.dataset.updateId);
    // } else if (target.classList.contains("js-save-link")) {
    //   handleSaveClick(target.dataset.saveId);
    // }
  });
}

totalSumPrice(products);
reviewOrderCard(totalQuantity(), totalSumPrice(products));
attachEventListeners();
cartQuantityDisplay();
renderCheckOutPage();

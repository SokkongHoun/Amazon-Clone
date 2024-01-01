import { products } from "../../data/product.js";
import { cart, totalQuantity, saveToStorage } from "./shoppingCart.js";

let productRowContainer = document.querySelector(".js-product-row");
let productJS = products;
const cartQuantity = document.querySelector(".js-total-quantity");
let html = "";
productJS.forEach((product) => {
  html += `
    <div class="col product-container">
        <div class="product-img">
            <img src="${product.image}" />
        </div>
        <div class="product-description">
            <p>${product.name}</p>
        </div>
        <div class="product-rating">
        <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
        <p>${product.rating.count}</p>
        </div>
        <div>
        <p class="product-price">$${(product.priceCents / 100).toFixed(2)}</p>
        </div>
        <div class="product-input">
            <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
            </select>
        </div>
        <div class="add-to-cart-btn">
        <button class=" js-add-to-cart-btn" data-product-Id=${product.id}
          }>Add To Cart</button>
        </div>
    </div>
    `;
  productRowContainer.innerHTML = html;
});

const addToCartButton = document.querySelectorAll(".js-add-to-cart-btn");

addToCartButton.forEach((button) => {
  button.addEventListener("click", () => {
    const atcProductId = button.dataset.productId;

    let cartItem = cart.find((item) => item.productId === atcProductId);

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({
        productId: atcProductId,
        quantity: 1,
      });
    }
    cartQuantity.innerHTML = `(${totalQuantity()})`;
    saveToStorage();
  });
});

import { products } from "../../data/product.js";

let productRowContainer = document.querySelector(".js-product-row");
let cart = products;
let html = "";
cart.forEach((cartItem) => {
  html += `
    <div class="col product-container">
        <div class="product-img">
            <img src="${cartItem.image}" />
        </div>
        <div class="product-description">
            <p>${cartItem.name}</p>
        </div>
        <div class="product-rating">
        <img class="product-rating-stars"
              src="images/ratings/rating-${cartItem.rating.stars * 10}.png">
        <p>${cartItem.rating.count}</p>
        </div>
        <div>
        <p class="product-price">${cartItem.priceCents}</p>
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
        <button>Add To Cart</button>
        </div>
    </div>
    `;
  productRowContainer.innerHTML = html;
});

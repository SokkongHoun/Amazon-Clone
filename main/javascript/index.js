import { products } from "../../data/product.js";
import { cart, cartQuantityDisplay, saveToStorage } from "./shoppingCart.js";

let productRowContainer = document.querySelector(".js-product-row");

// Generating product UI
function generateProductHTML(product) {
  return `
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
          <select class="item-selector" data-selector-id=${product.id}>
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
        >Add To Cart</button>
      </div>
  </div>
  `;
}

// Product UI component for re-using front page UI
function miniGenerateProductHTML(filteredProducts) {
  let html = "";
  filteredProducts.forEach((product) => {
    html += generateProductHTML(product);
  });
  productRowContainer.innerHTML = html;

  addToCart();
}

// Handling add to cart
function addToCart() {
  const addToCartButton = document.querySelectorAll(".js-add-to-cart-btn");

  addToCartButton.forEach((button) => {
    button.addEventListener("click", () => {
      const atcProductId = button.dataset.productId;
      let cartItem = cart.find((item) => item.productId === atcProductId);
      let select = document.querySelector(
        `.item-selector[data-selector-id='${atcProductId}']`
      );
      let selectValue = parseInt(select.value);

      if (cartItem) {
        cartItem.quantity += selectValue; // Use the select value
      } else {
        cart.push({
          productId: atcProductId,
          quantity: selectValue, // Use the select value
          deliveryId: "1",
        });
      }
      saveToStorage();
      cartQuantityDisplay();
    });
  });
}

// Perform add to cart function
function aTcRenderingPage() {
  let html = "";
  products.forEach((product) => {
    html += generateProductHTML(product);
  });
  productRowContainer.innerHTML = html;
  addToCart();
}

// Handling search action
const searchButton = document.querySelector(".btn-outline-success");
const inputField = document.getElementById("js-search-input");
function performSearch() {
  const inputVal = inputField.value.trim().toLowerCase();

  let matchingProducts = products.filter((product) => {
    return product.keywords.some((keyword) =>
      keyword.toLowerCase().includes(inputVal)
    );
  });

  inputField.value = "";

  let filteredProducts = matchingProducts;

  miniGenerateProductHTML(filteredProducts);
}

// Event listener for click & Enter event
searchButton.addEventListener("click", performSearch);
inputField.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    performSearch();
  }
});

// Select Radio for Rating
const filterRating = document.querySelector(".js-rating-radio");
filterRating.addEventListener("click", () => {
  const sortedProducts = products.sort(
    (a, b) => b.rating.count - a.rating.count
  );

  let sortedRating = sortedProducts.filter(() => {
    return true;
  });

  let filteredProducts = sortedRating;

  miniGenerateProductHTML(filteredProducts);
});

// Select Radio for Pricing
const filterPrice = document.querySelector(".js-rating-price");
filterPrice.addEventListener("click", () => {
  const sortedProducts = products.sort((a, b) => a.priceCents - b.priceCents);

  let sortedPrice = sortedProducts.filter(() => {
    return true;
  });

  let filteredProducts = sortedPrice;

  miniGenerateProductHTML(filteredProducts);
});

aTcRenderingPage();
cartQuantityDisplay();
// If you expect a large number of product items, consider using event delegation for the "Add to Cart" buttons. Instead of attaching individual event listeners to each button, you can attach one listener to a common ancestor (like productRowContainer) and determine which button was clicked.

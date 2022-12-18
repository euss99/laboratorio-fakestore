const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/';

/* === Endpoints === */
const endpoint_PRODUCTS = "products";

/* Query parameters */
const qp_PAGINACIÓN = "?offset=5&limit=10";

const api = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

async function getProducts() {
  const products = await api(endpoint_PRODUCTS + "?offset=5&limit=10");
  const arrayProducts = products.data;
  console.log(arrayProducts);
  arrayProducts.forEach(product => {
    const productContainer = document.createElement("article");
    productContainer.classList.add("Card");

    const productImg = document.createElement("img");
    productImg.setAttribute("alt", product.category.description);
    productImg.setAttribute("src", product.category.image);
    
    const productTitle = document.createElement("h2");
    productTitle.innerHTML = product.category.name;
    
    const productPrice = document.createElement("small");
    productPrice.innerHTML = product.price;
  
    productTitle.appendChild(productPrice);
    productContainer.appendChild(productImg);
    productContainer.appendChild(productTitle);
    $app.appendChild(productContainer);
  });
}

getProducts();

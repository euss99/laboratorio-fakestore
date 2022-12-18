const main = document.querySelector(".Main")
const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
// const btnLoadMore = document.querySelector(".btnLoad");
const API = 'https://api.escuelajs.co/api/v1/';

/* === Endpoints === */
const endpoint_PRODUCTS = "products";

/* === Query parameters === */
const qp_PAGINACION = "?offset=0&limit=10";

/* === Axios === */
const api = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

/* === Eventos === */
// btnLoadMore.addEventListener("click", getPaginatedProducts);
window.addEventListener("scroll", getPaginatedProducts);

/* === Funciones === */

function creatrProductsCards(array) {
  array.forEach(product => {
    const productContainer = document.createElement("article");
    productContainer.classList.add("Card");

    const productImg = document.createElement("img");
    productImg.setAttribute("alt", product.category.description);
    productImg.setAttribute("src", product.category.image);
    
    const productTitle = document.createElement("h2");
    productTitle.innerHTML = product.category.name;
    
    const productPrice = document.createElement("small");
    productPrice.innerHTML = `$ ${product.price}`;
  
    productTitle.appendChild(productPrice);
    productContainer.appendChild(productImg);
    productContainer.appendChild(productTitle);
    $app.appendChild(productContainer);
  });
};

async function getProducts() {
  const products = await api(endpoint_PRODUCTS, {
    params: {
      offset: 0,
      limit: 10,
    }
  });
  const arrayProducts = products.data;
  console.log(arrayProducts);

  // btnLoadMore.classList.remove("inactive") 
  creatrProductsCards(arrayProducts);

};

let offset = 10;
async function getPaginatedProducts() {
  const { 
    scrollTop, 
    scrollHeight, 
    clientHeight 
  } = document.documentElement;

  const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);

  if (scrollIsBottom) {
    offset = offset + 10;
    const products = await api(endpoint_PRODUCTS, {
      params: {
        offset,
        limit: 10,
      }
    });
    const arrayProducts = products.data;
    console.log(arrayProducts.length);
    console.log(arrayProducts);
    
    if (arrayProducts.length == 0) {
      // btnLoadMore.classList.add("inactive") 
      const productText = document.createElement("p");
      productText.classList.add("info-container");
      productText.innerHTML = "Todos los productos Obtenidos.";
      main.appendChild(productText);
    } else {
      creatrProductsCards(arrayProducts);
    }

  }


};

getProducts();

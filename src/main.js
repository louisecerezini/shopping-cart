import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const productsElement = document.querySelector('.products');

window.onload = (async () => {
  const produtos = await fetchProductsList('computador');
  produtos.forEach((product) => {
    productsElement.appendChild(createProductElement(product));
  });
  // console.log(produtos);
});

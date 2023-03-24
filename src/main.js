import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const productsElement = document.querySelector('.products');
const container = document.querySelector('.container');
const cart = document.querySelector('.cart');

const carregar = document.createElement('p');
const error = document.createElement('p');
carregar.innerText = 'carregando...';
carregar.className = 'loading';
container.appendChild(carregar);

window.onload = async () => {
  try {
    const produtos = await fetchProductsList('computador');
    produtos.forEach((product) => {
      productsElement.appendChild(createProductElement(product));
    });
    container.removeChild(carregar);
    error.remove();
  } catch (ex){
    console.log(ex);
    error.innerText =
      'Algum erro ocorreu, recarregue a página e tente novamente';
    error.className = 'error';
    cart.appendChild(error);
  }
};

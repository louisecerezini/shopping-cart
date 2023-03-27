import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import { saveCartID } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const productsElement = document.querySelector('.products');
const container = document.querySelector('.container');
const cart = document.querySelector('.cart');
const cartElementList = document.querySelector('.cart__products');

const carregar = document.createElement('p');
const error = document.createElement('p');
carregar.innerText = 'carregando...';
carregar.className = 'loading';
container.appendChild(carregar);

const saveCartIdCallback = async (productId) => {
  const product = await fetchProduct(productId);
  saveCartID(productId);
  const cartElement = createCartProductElement(product);
  cartElementList.appendChild(cartElement);
};

window.onload = async () => {
  try {
    const produtos = await fetchProductsList('computador');
    produtos.forEach((product) => {
      // cria a caixa toda com o elemento que representa o produto
      const productElement = createProductElement(product);
      // pega o botao da caixa
      const buttonElement = productElement.querySelector('.product__add');
      // colocar o listener no onclick do botao passando como parametro o callback contendo uma chamada para o savecartid com o id do produto
      buttonElement.addEventListener('click', () => saveCartIdCallback(product.id));
      productsElement.appendChild(productElement);
    });
    container.removeChild(carregar);
    error.remove();
  } catch (ex) {
    console.log(ex);
    error.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
    error.className = 'error';
    cart.appendChild(error);
  }
};

import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import {
  createCartProductElement,
  createProductElement,
} from './helpers/shopFunctions';
import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';

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
const carregarCart = async () => {
  const savedCarts = getSavedCartIDs();
  const productsPromise = savedCarts.map((id) => fetchProduct(id));

  Promise.all(productsPromise).then((products) => {
    products.forEach((product) => {
      const productElement = createCartProductElement(product);
      cartElementList.appendChild(productElement);
    });
  });
};

window.onload = async () => {
  try {
    const produtos = await fetchProductsList('computador');
    produtos.forEach((product) => {
      const productElement = createProductElement(product);
      const buttonElement = productElement.querySelector('.product__add');
      buttonElement.addEventListener('click', () => saveCartIdCallback(product.id));
      productsElement.appendChild(productElement);
    });
    container.removeChild(carregar);
    error.remove();
    await carregarCart();
  } catch (ex) {
    console.log(ex);
    error.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
    error.className = 'error';
    cart.appendChild(error);
  }
};

// Ao carregar a página, o estado atual do carrinho de compras deve ser carregado do LocalStorage.
// Para isso, você deve utilizar a função getSavedCartIDs, que já está implementada no arquivo helpers/cartFunctions.

// Note que o retorno da função getSavedCartIDs é um array de ids,
// você deve utilizar a função fetchProduct para cada um desses ids e recuperar as informações de cada produto.

// No entanto, é importante manter a ordem que os produtos foram adicionados ao carrinho, para isso,
// você deve utilizar o método Promise.all para aguardar a resposta de todas as requisições e só então adicionar os produtos ao carrinho.

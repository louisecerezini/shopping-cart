export const fetchProduct = () => {
  // seu código aqui
};

const fetchProdutos = (produto) => fetch (`https://api.mercadolibre.com/sites/MLB/search?q=${produto}`)

export const fetchProductsList = async (produto) => {
  if (!produto) {
    return Promise.reject(new Error('Termo de busca não informado'));
  }
  try{
  const response = await fetchProdutos(produto);
  const data = await response.json(); 
  return data.results; 
} catch (error) {
  return error.message;
}
}



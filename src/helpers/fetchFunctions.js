const fetchProductById = (id) => fetch(`https://api.mercadolibre.com/items/${id}`);

export const fetchProduct = async (id) => {
  if (!id) {
    return Promise.reject(new Error('ID não informado'));
  }
  const response = await fetchProductById(id);
  const data = await response.json();
  return data;
};

const fetchProdutos = (produto) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${produto}`);

export const fetchProductsList = async (produto) => {
  if (!produto) {
    return Promise.reject(new Error('Termo de busca não informado'));
  }
  const response = await fetchProdutos(produto);
  const data = await response.json();
  return data.results;
};

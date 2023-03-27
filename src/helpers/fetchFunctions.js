const fetchProductById = (id) => fetch(`https://api.mercadolibre.com/items/${id}`);

export const fetchProduct = async (id) => {
  if (!id) {
    return Promise.reject(new Error('ID não informado'));
  }
  try {
    const response = await fetchProductById(id);
    const data = await response.json();
    return data;
  } catch (error) {
    return Promise.reject(new Error('Erro ao buscar produto'));
  }
};
//Note que o retorno da função getSavedCartIDs é um array de ids, 
//você deve utilizar a função fetchProduct para cada um desses ids e recuperar as informações de cada produto.

const fetchProdutos = (produto) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${produto}`);

export const fetchProductsList = async (produto) => {
  if (!produto) {
    return Promise.reject(new Error('Termo de busca não informado'));
  }
  try {
    const response = await fetchProdutos(produto);
    const data = await response.json();
    return data.results;
  } catch (error) {
    return Promise.reject(new Error('Erro ao buscar produtos'));
  }
};

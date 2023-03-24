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

// Por isso, é importante que você trate esse erro, exibindo uma mensagem para o usuário. Para isso:

// Crie um elemento que contenha o texto Algum erro ocorreu, recarregue a página e tente novamente, que deve ser exibido em algum lugar da página;
// Adicione a classe error ao elemento que possui o texto;
// Exiba esse elemento apenas caso ocorra algum erro durante a requisição à API.

import './mocks/fetchSimulator';
import { fetchProduct, fetchProductsList } from '../helpers/fetchFunctions';
import product from './mocks/product';

describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', async () => {
    expect(typeof fetchProduct).toBe('function');
  });
  it('fetch é chamado ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });
  it('fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/items/MLB1405519561'
    );
  });
  it(`retorno da função fetchProduct com o argumento do produto ""MLB1405519561" é uma estrutura de dados igual ao objeto produto`, async () => {
    const atual = await fetchProduct('MLB1405519561');
    expect(atual).toEqual(product);
  });
  it('ao chamar a funcao fetchProduct sem argumento, retorna um erro com a mensagem', async () => {
    await expect(fetchProduct()).rejects.toThrow(new Error('ID não informado'));
  });

  it('ao chamar a funcao fetchProduct com id de produto invalido, retorna um erro tratado', async () => {
    await expect(fetchProduct('abc123')).rejects.toThrow(new Error('Erro ao buscar produto'));
  });
});

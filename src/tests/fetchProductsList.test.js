import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    );
  });

  it(`retorno da função fetchProductsList com o argumento 'computador' é uma estrutura de dados igual ao objeto computadorSearch`, async () => {
    const atual = await fetchProductsList('computador');
    expect(atual).toEqual(computadorSearch);
  });

  it('ao chamar a funcao fetchProductsList sem argumento, retorna um erro com a mensagem', async () => {
    await expect(fetchProductsList()).rejects.toThrow(
      new Error('Termo de busca não informado')
    );
  });

  it('ao chamar a funcao fetchProductsList com categoria de produto invalida, retorna um erro tratado', async () => {
    await expect(fetchProductsList('abc123')).rejects.toThrow(new Error('Erro ao buscar produtos'));
  });
});

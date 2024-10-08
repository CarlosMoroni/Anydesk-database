/**
 * Classe que contem todas as funções que fazem requisição no banco de dados da tabela device.
 *
 * @class DeviceService
 */
class DeviceService {

    constructor() {
        this.url = "http://localhost:3333/device/";
    };

    #showLoader() {
        document.getElementById('load-container').style.display = 'flex';
    }

    #hideLoader() {
        document.getElementById('load-container').style.display = 'none';
    }

    /**
     * função findAll( ) da tabela device.
     *
     * @async
     * @returns {Promise<Array|null>} retorna um array de objetos
     */
    async getAllElements() {
        this.#showLoader()
        try {
            const response = await fetch(this.url, { method: 'GET' });

            if (!response.ok) {
                throw new Error('Problema na rede: ' + response.status);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro na requisição getAllElements(): ' + error);
            return null;
        } finally {
            this.#hideLoader()
        }
    };


    /**
     * faz a requisição http do tipo get( ) e retorna um json device
     *
     * @async
     * @param {Number} id
     * @returns {object} Device
     */
    async getByPk(id) {
        let urlNew = this.url + id
        this.#showLoader()

        try {
            const response = await fetch(urlNew, { method: 'GET' });

            if (!response.ok) {
                throw new Error('Problema na rede: ' + response.status);
            }

            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Erro na requisição getByPk(): ' + error);
            return null
        } finally {
            this.#hideLoader()
        }
    };

    /**
     * faz requisição do tipo GET e retorna o array de devices correspondentes
     * ao termo de busca usado no paramentro search_term
     *
     * @async
     * @param {string} search_term
     * @returns {Array<Device>}
     */
    async getSearchTerm(search_term) {
        let urlNew = this.url + 'buscar?search_term=' + search_term
        this.#showLoader();

        try {
            const response = await fetch(urlNew, { method: 'GET' });

            if (!response.ok) {
                throw new Error('Problema na rede: ' + response.status);
            }

            const data = response.json();
            return data;
            console.log(data);
        } catch (error) {
            console.error('Erro na requisição getSearchTerm(): ' + error);
            return null
        } finally {
            this.#hideLoader()
        }

    }

    /**
     * faz a requisição do tipo POST caso parametro de entrada nao conter ID,
     * caso contenha, faz requisição do tipo PUT e altera linha com ID informado.
     *
     * @async
     * @param {Device} objeto
     * @returns {JSON} response
     */
    async saveDevice(objeto) {
        let urlNew = this.url;
        this.#showLoader()

        try {
            // Se existir um id, será feito um PUT para atualizar
            if (objeto.id) {
                urlNew += objeto.id;

                const response = await fetch(urlNew, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(objeto)
                });

                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }

                const data = await response.json();
                console.log("Sucesso (PUT): ", data);
                return data;
            }

            // Caso contrário, faz um POST para criar
            const response = await fetch(urlNew, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objeto)
            });

            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }

            const data = await response.json();
            console.log("Sucesso (POST): ", data);
            return data;

        } catch (error) {
            console.error("Erro na requisição saveDevice(): " + error);
            return null;  // Retorna null em caso de erro
        } finally {
            this.#hideLoader()
        }
    };


    /**
     * deleta linha com ID correspondente ao paramentro.
     *
     * @async
     * @param {Number} id
     * @returns {JSON} response
     */
    async deleteDevice(id) {
        let urlNew = this.url + id;
        this.#showLoader()

        try {
            const response = await fetch(urlNew, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Problema na rede: ' + response.status);
            }

            const data = await response.json();
            successAlert();  // Função de sucesso após a exclusão
            return data;  // Retorna os dados (se necessário)

        } catch (error) {
            console.error('Erro na requisição deleteDevice(): ' + error);
            return null;  // Retorna null em caso de erro
        } finally {
            this.#hideLoader()
        }
    };
}
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
            console.error('Erro na requisição: ' + error);
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
            console.log(error);
        } finally {
            this.#hideLoader()
        }
    };

    async getSearchTerm(url) {
        
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
            console.error("Erro na requisição: " + error);
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
            console.error('Erro na requisição: ' + error);
            return null;  // Retorna null em caso de erro
        } finally {
            this.#hideLoader()
        }
    };
}
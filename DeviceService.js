/**
 * Classe que conten todas as funções que fazem requisição no banco de dados da tabela device.
 *
 * @class DeviceService
 */
class DeviceService {

    constructor() {
        this.url = "http://localhost:3333/device/";
    };

    /**
     * função findAll( ) da tabela device.
     *
     * @async
     * @returns {Promise<Array|null>} retorna um array de objetos
     */
    async getAllElements() {
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

        try {
            const response = await fetch(urlNew, { method: 'GET' });

            if (!response.ok) {
                throw new Error('Problema na rede: ' + response.status);
            }

            const data = await response.json();
            console.log(data);

            return data;
        } catch (error) {
            console.log(error);
        }
    };

    
    /**
     * faz a requisição do tipo POST caso parametro de entrada nao conter ID,
     * caso contenha, faz requisição do tipo PUT e altera linha com ID informado.
     *
     * @async
     * @param {Device} objeto
     * @returns {JSON} response
     */
    async createDevice(objeto) {
        let urlNew = this.url;

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
        }
    };

    
    /**
     * deleta linha com ID correspondente ao paramentro.
     *
     * @async
     * @param {number} id
     * @returns {JSON} response
     */
    async deleteDevice(id) {
        let urlNew = this.url + id;

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
        }
    };
}

// module.exports = DeviceService;
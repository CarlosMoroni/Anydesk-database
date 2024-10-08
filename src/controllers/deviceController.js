const { Op } = require('sequelize');
const Device = require('../models/Device');

module.exports = {
    async createDevice(req, res) {
        const { name_device, access_code, category, department } = req.body;

        try {
            const device = await Device.create({
                name_device: name_device,
                access_code: access_code,
                category: category,
                department: department
            })

            return res.status(201).json(device);
        } catch (error) {
            console.error("erro em device controller, createDevice() " + error);
            res.status(500);
        }

    },

    async getAllDevice(req, res) {
        try {
            const devices = await Device.findAll();
            return res.status(200).json(devices);
        } catch (error) {
            console.error("erro em device controller, getAllDevice() " + error);
            res.status(500);
        }
    },

    async getByIdDevice(req, res) {
        try {
            const id = req.params.id;

            if (!id) {
                res.json({ message: "objeto nao encontado" })
            }
            const device = await Device.findByPk(id);
            if (!device) {
                res.json({ message: "objeto nao encontado!" })
            }

            return res.status(200).json(device);
        } catch (error) {
            console.error("erro em device controller, getByIdDevice() " + error);
            res.status(500);
        }
    },

    async getBySearchTerm(req, res) {
        const { search_term } = req.query;

        if (!search_term) {
            return res.status(400).json({ message: 'Termo de busca não fornecido' });
        };

        try {
            const devices = await Device.findAll({
                where: {
                    [Op.or]: [
                        { name_device: { [Op.like]: `%${search_term}` } },
                        { access_code: { [Op.like]: `%${search_term}` } },
                        { department: { [Op.like]: `%${search_term}` } },
                    ]
                }
            })

            if(!devices.length){
                return res.status(200).json({message: 'nenhum dispositivo encontrado'});
            }

            return res.status(200).json(devices);
        } catch (error) {
            return console.error('Erro no getBySearchTerm(): ' + error);
            res.status(500);
        }
    },

    async updateDevice(req, res) {
        try {
            const id = req.params.id;

            if (!id) {
                res.json({ message: "id nao especificado!" });
            };
            const deviceResearch = await Device.findByPk(id);
            if (!deviceResearch) {
                res.json({ message: "objeto nao encontado!" });
            };

            const device = req.body;
            await Device.update(device, {
                where: { id: id },
            });

            return res.status(201).json({ message: "Objeto atualizado com sucesso!" });
        } catch (error) {
            console.error("erro em device controller, updateDevice() " + error);
            res.status(500);
        }
    },

    async deleteDevice(req, res) {
        try {
            const id = req.params.id;

            if (!id) {
                res.json({ message: "id não especificado!" });
            }
            const device = await Device.findByPk(id);
            if (!device) {
                res.json({ message: "objeto não encontrado!" })
            } else {
                await device.destroy();
            }

            return res.status(201).json({ message: "Objeto excluido com sucesso!" });
        } catch (error) {
            console.error("erro em device controller, deleteDevice() " + error);
            res.status(500);
        }
    }
}
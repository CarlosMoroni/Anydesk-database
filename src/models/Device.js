const { Model, DataTypes } = require('sequelize');

class Device extends Model {
    static init(sequelize) {
        super.init({
            name_device: DataTypes.STRING,
            access_code: DataTypes.STRING,
            category: DataTypes.STRING,
        }, {
            sequelize: sequelize
        });
    }
}

module.exports = Device;
const { Model, DataTypes } = require('sequelize');

class Device extends Model {
    static init(sequelize) {
        super.init({
            name_device: DataTypes.STRING,
            access_code: DataTypes.STRING,
            category: DataTypes.ENUM(
                'SERVER', 
                'JJ', 
                'JK', 
                'SK-TK', 
                'SK-RB'
            ),
        }, 
        {
            sequelize: sequelize
        });
    }
}

module.exports = Device;
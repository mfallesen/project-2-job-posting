module.exports = function (sequelize, DataTypes) {
    var Managers = sequelize.define("Managers", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false

        },
        phone: {
            type: DataTypes.INTERGER,
            allowNull: false

        },
        company_id: {
            type: DataTypes.INTERGER,
            allowNull: false

        }
    });
    return Managers;
};

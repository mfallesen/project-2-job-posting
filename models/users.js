module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
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

        }
    });
    return Users;
};

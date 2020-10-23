module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
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
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        underscored: true
    });

    User.associate = function(models) {
        User.belongsToMany(models.Job, {through: "User_Job"})
    }

    return User;
}
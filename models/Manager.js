module.exports = function(sequelize, DataTypes) {
    var Manager = sequelize.define('Manager', {
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
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        underscored: true
    });

    Manager.associate = function(models) {
        Manager.belongsTo(models.Company, {
            foreignKey: {
                allowNull: false,
                name: 'company_id'
            }
        });

        Manager.hasMany(models.Job, {
            foreignKey: {
                allowNull: false,
                name: 'manager_id'
            }
        })
    }

    return Manager;
}
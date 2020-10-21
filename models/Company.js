module.exports = function(sequelize, DataTypes) {
    var Company = sequelize.define('Company', {
        company_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        underscored: true
    });

    Company.associate = function(models) {
        Company.hasMany(models.Manager, {
            foreignKey: {
                allowNull: false,
                name: 'company_id'
            }
        })
    }

    return Company;
}
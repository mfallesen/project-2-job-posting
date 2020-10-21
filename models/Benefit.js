module.exports = function(sequelize, DataTypes) {
    var Benefit = sequelize.define('Benefit', {
        benefit_text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        underscored: true
    });

    Benefit.associate = function(models) {
        Benefit.belongsToMany(models.Job, {through: "Job_Benefit"})
    }

    return Benefit;
}
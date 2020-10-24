module.exports = function(sequelize, DataTypes) {
    var Job = sequelize.define('Job', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        wage: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        underscored: true
    });

    Job.associate = function(models) {
        Job.belongsTo(models.Manager, {
            foreignKey: {
                allowNull: false,
                name: 'manager_id'
            }
        })

        Job.belongsToMany(models.User, {through: "User_Job"})

        Job.belongsToMany(models.Benefit, {through: "Job_Benefit"})
    }

    return Job;
}
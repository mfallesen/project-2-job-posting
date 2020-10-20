module.exports = function (sequelize, DataTypes) {
    var Jobs = sequelize.define("Jobs", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false

        },
        wage: {
            type: DataTypes.STRING,
            allowNull: false

        },
        manager_id: {
            type: DataTypes.INTEGER,
            allowNull: true

        }
        
    });

    Jobs.associate = function (models){

        //Managers.hasMany(models.jobs);
        
        Jobs.belongsToMany(models.Users, {through: "UsersJobs"});
        Jobs.belongsToMany(models.Benefits, {through: "BenefitsJobs"});
    
    }

    return Jobs;
};


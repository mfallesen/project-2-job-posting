module.exports = function (sequelize, DataTypes) {
    var Benefits = sequelize.define("Benefits", {
        benefit_text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Benefits.associate = function (models){

        //Managers.hasMany(models.jobs);
        Benefits.belongsToMany(models.Jobs, {through: "BenefitsJobs"});
    
    }

    return Benefits;
};


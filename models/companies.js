module.exports = function (sequelize, DataTypes) {
    var Companies = sequelize.define("Companies", {
        company_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        phone: {
            type: DataTypes.INTEGER,
            allowNull: false

        }
        
    });

    Companies.associate = function (models){

        Companies.hasMany(models.Manager, {
            onDelete: "cascade" 
         });
    
    }

    return Companies;
};


module.exports = function (sequelize, DataTypes) {
    var Manager = sequelize.define("Manager", {
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
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: false

        },
        userName:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });
Manager.associate = function (models){

    Manager.hasMany(models.Jobs,{
       onDelete: "cascade" 
    });

    //Manager.belongsToMany(models.Job, {through: "ManagerJob"});

}
    return Manager;
};



/*     Managers.beforeCreate(function(manager){

    manager.password = bcrypt.hashSync(manager.password, bcrypty.genSaltSync(10), null);

}); */

const { HostNotFoundError } = require("sequelize");

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
            type: DataTypes.INTEGER,
            allowNull: false

        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false

        }
    });

    Users.associate = function (models){

        //Users.hasMany(models.jobs);
        Users.belongsToMany(models.Jobs, {through: "UsersJobs"});

    }

/*     Users.beforeCreate(function(user){

        user.password = bcrypt.hashSync(user.password, bcrypty.genSaltSync(10), null);

    }); */

    return Users;
};

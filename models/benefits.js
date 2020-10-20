module.exports = function (sequelize, DataTypes) {
    var Benefits = sequelize.define("Benefits", {
        benefit_text: {
            type: DataTypes.STRING,
            allowNull: false
        },

        job_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    ret
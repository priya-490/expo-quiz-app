// # database model
const {DataTypes} = require("sequelize");
const sequelize = require("../db");

const Question = sequelize.define("Question", {
    question: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    options: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    correctAnswer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Question;

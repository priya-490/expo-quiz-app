// setting up connection with postgres
const { Sequelize } = require("sequelize");  // help to interact with sql databases

const sequelize = new Sequelize(
    "quizdb",
    "postgres",
    "Priya@#1234",  
    {
        host:"localhost",
        dialect:"postgres",
    }
);

module.exports = sequelize;


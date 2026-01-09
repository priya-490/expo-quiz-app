// it tells graphql how to actually fetch data
// fetches data from db for graphql queries
const Question = require("./models/Question");

module.exports = {
    Query: {
        questions: async ()=> {
            return await Question.findAll();
        },
    },
};
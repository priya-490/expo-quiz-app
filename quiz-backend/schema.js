// const { gql } = require("apollo-server-express");

// module.exports = gql`
//     type Question {
//     id: ID!
//     question: String!
//     options : [String!]!
//     }
//     type Query {
//         questions: [Question!]!
//     }
// `

// # it defines what the graphql looks like 
//  it also takes care what clients are allowed to query and what fields exist
//  graphql schema -> api level
const { gql } = require("apollo-server-express");

module.exports = gql`
    type Question {
    id: ID!
    question: String!
    options : [String!]!
    correctAnswer: String! 
    }
    type Query {
        questions: [Question!]!
    }
`;
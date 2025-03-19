const typeDef = `
    type Query {
        me: User
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }
`

const resolvers = {
    Query: {
        me: (root, args, context) => {
            return context.user
        }
    }
}

module.exports = { typeDef, resolvers }
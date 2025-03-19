const Author = require('../../mongoose/models/author')
const Book = require('../../mongoose/models/book')

const typeDef = `
    extend type Query {
        authorCount: Int!
        allAuthors: [Author!]!
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        books: [Book]
        bookCount: Int!
    }
`

const resolvers = {
    Query: {
        authorCount: async () => {
            const authors = await Author.find({})

            return authors.length
        },
        allAuthors: async () => {
            return Author.find({}).populate('books')
        },
    },

    Author: {
        bookCount: async (root) => {
            return root.books.length
        }
    },
}

module.exports = { typeDef, resolvers }
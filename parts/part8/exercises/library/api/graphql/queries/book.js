const Author = require('../../mongoose/models/author')
const Book = require('../../mongoose/models/book')

const typeDef = `
    extend type Query {
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }
`

const resolvers = {
    Query: {
        bookCount: async () => (await Book.find({})).length,
        allBooks: async (_, args) => {
            if (Object.keys(args).length > 0) {
                if (args.author && !args.genre) {
                    const author = await Author.findOne({ name: args.author })

                    return Book.find({ author: author._id }).populate('author')
                } else if (!args.author && args.genre) {
                    return Book.find({ genres: args.genre }).populate('author')
                } else if (args.author && args.genre) {
                    const author = await Author.findOne({ name: args.author })

                    return Book.find({ author: author.id, genres: args.genre }).populate('author')
                }
            }

            return Book.find({}).populate('author')
        },
    }
}

module.exports = { typeDef, resolvers }
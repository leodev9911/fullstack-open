const Author = require('../../mongoose/models/author')
const Book = require('../../mongoose/models/book')
const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const typeDef = `
    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book
    }
    
    type Subscription {
        bookAdded: Book!
    }
`

const resolvers = {
    Mutation: {
        addBook: async (_, args, { user }) => {
            if (!user) {
                return new GraphQLError('Wrong Credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const newBook = new Book({ ...args })
            try {
                let author = await Author.findOne({ name: args.author })
                if (!author) {
                    author = new Author({
                        name: args.author,
                        born: null,
                    })
                }
                
                newBook.author = author._id
                author.books.push(newBook._id)
                
                await author.save()
                await newBook.save()
            } catch (error) {
                throw new GraphQLError('Saving Book Failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        error
                    }
                })
            }

            pubsub.publish('BOOK_ADDED', { bookAdded: newBook.populate('author') })

            return newBook.populate('author')
        },
    },

    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
        }
    }
}

module.exports = { typeDef, resolvers }
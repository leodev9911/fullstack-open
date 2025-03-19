const Author = require('../../mongoose/models/author')
const { GraphQLError } = require('graphql')

const typeDef = `
    type Mutation {
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }
`

const resolvers = {
    Mutation: {
        editAuthor: async (_, args, { user }) => {
            if (!user) {
                return new GraphQLError('Wrong Credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo

            try {
                await author.save()
            } catch (error) {
                throw new GraphQLError('Edit Author Failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }

            return author
        },
    },
}

module.exports = { typeDef, resolvers }
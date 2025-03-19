const User = require('../../mongoose/models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const { GraphQLError } = require('graphql')

const jwtSecret = process.env.JWT_SECRET

const typeDef = `
    type Mutation {
        login(
            username: String!
            password: String!
        ): Token

        createUser(
            username: String!
            password: String!
            favoriteGenre: String!
        ): User
    }
`

const resolvers = {
    Mutation: {
        login: async (_, args) => {
            const { username, password } = args

            const user = await User.findOne({ username })

            const passwordCorrect = user === null
                ? false
                : bcrypt.compare(password, user.passwordHash)

            if (!user || !passwordCorrect) {
                return new GraphQLError('Login Failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        error: 'incorrect username or password'
                    }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            const token = jwt.sign(userForToken, jwtSecret)

            return { value: token }
        },

        createUser: async (_, args) => {
            if (!args.password) {
                return new GraphQLError('Create User Failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.password,
                        error: 'The password is required'
                    }
                })
            } else if (args.password.length < 3) {
                return new GraphQLError('Create User Failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.password,
                        error: 'The password must be at least 3 characters long'
                    }
                })
            }

            const saltRounds = await bcrypt.genSalt(10)
            const passwordHash = await bcrypt.hash(args.password, saltRounds)

            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre,
                passwordHash
            })

            try {
                user.save()
            } catch (error) {
                throw new GraphQLError('Create User Failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.username,
                        error
                    }
                })
            }

            return user
        }
    }
}

module.exports = { typeDef, resolvers }
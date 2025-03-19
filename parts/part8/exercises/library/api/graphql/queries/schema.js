const { typeDef: authorQueries, resolvers: authorQueriesResolvers } = require('../queries/author')
const { typeDef: bookQueries, resolvers: bookQueriesResolvers } = require('../queries/book')
const { typeDef: userQueries, resolvers: userQueriesResolvers } = require('../queries/user')
const { typeDef: authorMutations, resolvers: authorMutationsResolvers } = require('../mutations/author')
const { typeDef: bookMutations, resolvers: bookMutationsResolvers } = require('../mutations/book')
const { typeDef: userMutations, resolvers: userMutationsResolvers } = require('../mutations/user')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { merge } = require('lodash')

const Query = `
  type Query {
    _empty: String
  }
`

const schema = makeExecutableSchema({
    typeDefs: [
        Query,
        authorQueries,
        bookQueries,
        userQueries,
        authorMutations,
        bookMutations,
        userMutations
    ],
    resolvers: merge(
        authorQueriesResolvers,
        bookQueriesResolvers,
        userQueriesResolvers,
        authorMutationsResolvers,
        bookMutationsResolvers,
        userMutationsResolvers
    ),
})

module.exports = schema
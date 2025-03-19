
const { startStandaloneServer } = require('@apollo/server/standalone')
const { ApolloServer } = require('@apollo/server')
const jwt = require('jsonwebtoken')
const User = require('./mongoose/models/user')
const mongoose = require('mongoose')
const schema = require('./graphql/queries/schema')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/use/ws')
const cors = require('cors')
const http = require('http')
const express = require('express')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { expressMiddleware } = require('@apollo/server/express4')
require('dotenv').config()

mongoose.set('strictQuery', false)

const MONGODB_URI = process.env.MONGODB_URI
const jwtSecret = process.env.JWT_SECRET

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error))

mongoose.set('debug', true)

const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/'
    })

    const serverCleanup = useServer({ schema }, wsServer)

    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose()
                        }
                    }
                }
            }
        ]
    });

    await server.start()

    app.use(
        '/',
        cors(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                const auth = req ? req.headers.authorization : null

                if (auth && auth.startsWith('Bearer ')) {
                    const decodedToken = jwt.verify(auth.substring(7), jwtSecret)

                    const user = await User.findById(decodedToken.id)

                    return { user }
                }
            }
        })
    )

    const PORT = 4000

    httpServer.listen(PORT, () =>
        console.log(`Server ready at http://localhost:${PORT}`)
    )
}

start()
var fs = require('fs')
const { GraphQLServer } = require('graphql-yoga')

const typeDefs = fs.readFileSync(__dirname + '/schema.gql', 'utf8')

const opts = {
    port: process.env.PORT || 4000
}

const resolvers = {
    Query: {
        hello: (_, { name }) => {
            const returnValue = !name ? `Hello ${name || 'World!'}` : null
            return returnValue
        },
        godotSnakeServerHost: (parent, args) => {
            return {
                host: 'localhost',
                port: 4000
            }
        }
    }
}

const server = new GraphQLServer({ typeDefs, resolvers, opts })
server.start(() => console.log(`Server is running at http://localhost:${process.env.PORT || 4000}`))

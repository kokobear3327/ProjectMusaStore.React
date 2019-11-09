// So this is where we create our GraphQL Yoga server
// Note: GraphQL is an express server
const { GraphQLServer } = require('graphql-yoga');
// Whenever you add an item, delete an item, etc, you need to use the resolvers.
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
// Pull in that db you just created too... 
const db = require('./db'); 

// Do Yoga aka make your graphQL Yoga server:

// So what is going on here?  Created a db in the db.js file, injected it here, then
//    initialized the server where typeDefs must be defined to map to resolvers, 
//    then in the index you initialize that puppy and map it to the frontend 👍

function createServer() { 
    return new GraphQLServer({
        typeDefs: 'src/schema.graphql',
        resolvers: {
            Mutation,
            Query
    },
    resolverValidationOptions: {
        requireResolversForResolveType: false
    },
    context: req => ({ ...req, db }),    
    });
}

module.exports = createServer;
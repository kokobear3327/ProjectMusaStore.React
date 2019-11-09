// So this is how we connect to the remote prisma DB and query it with JS
// no import in node.js btw, you use require 👊
const { Prisma } = require('prisma-binding');

const db = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    debug: false 
}) 

module.exports = db;
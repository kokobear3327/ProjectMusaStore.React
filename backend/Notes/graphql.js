// So when you change your schema, you need to update your resolvers(mutation or query)

// when you change your datamodel, you need to rerun npm run deploy wherein you run the code in package.json

// ): means it returns means in this case lol 👍


// More GraphQL Notes : For schema.graphql

// """ This is the public facing API and this is how you import ^^^ Notive we don't need to define type Item
//       because its imported from the generated/prisma.graphql file.  Also, : Item! means it returns an item
//       👍👍👍 """



// """ No bang operator on the end because it doesn't always have to return an item"""
// """ In general, you should make it the same as prisma.graphql """
// """ Next you need to write resolvers, but this is shortened by forwardTo db """


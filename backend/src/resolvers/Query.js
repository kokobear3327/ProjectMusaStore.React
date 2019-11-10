const { forwardTo } = require('prisma-binding');

// the forwardTo makes you not have to write the async items(4 arguemnts) out = why its commented out
        //  So this is what forwardTo replaces:
    // async items(parent, args, ctx, info) {
    //     const items = await ctx.db.query.items();
    //     return items;
    // }
// Anytime you have a request it gives you a signature of these 4 different variables:   Parent schema
//   as parent, arguments as args, ctx that you defined earlier, and info around graphql query as info.
const Query = {
    items: forwardTo('db'),
    item: forwardTo('db'),
    itemsConnection: forwardTo('db'),
    me(parent, args, ctx, info) {
        // first check if there is a current user ID.  Notice its not req!!! 
        if(!ctx.request.userId) {
        return null;
        }
        //  You lookin the prisma.graphql API and find there is a user for query with a where 👍
        return ctx.db.query.user({
            where: { id: ctx.request.userId },
        }, 
        info
        );
    },
    async order(parent, args, ctx, info) {
        // 1.  Validate login details 
        if(!ctx.request.userId) {
            throw new Error('You arent logged in!');
        }
        // 2.  Query their order then return the order.  Info part is so you can query it later 👍
        const order = await ctx.db.query.order({
            where: { id: args.id  },
        }, info);

        return order;
        
    }
};

module.exports = Query;

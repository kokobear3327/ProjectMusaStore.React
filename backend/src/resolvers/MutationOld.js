const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// You have to add the info argument to the end for querying purposes.

// Likewise, if you don't make it async, it returns a promise instead of going into the item variable
//   don't forget to add await with async at proper placements
const Mutation = {
    async createItem(parent, args, ctx, info) {
        //Check if they are logged in first
        const item = await ctx.db.mutation.createItem({
            data: {
                ...args,
            },
        }, 
        info
        );
        console.log(item)
        return item;
    },
    updateItem(parent, args, ctx, info) {
        // takes a copy of the update first
        const updtes = { ...args };
        // remove the ID from the updates because this has to be unique
        delete updates.id;
        // run the updating method...Check the API for the method that is updateItem...it takes 2 arguments
        // info is same as before, its so it knows what to return when queried
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id
            },
        }, 
        info
        );
    },
    async signup(parent, args, ctx, info){
        // lowercase their email so capitalization is invariant
        args.email = args.email.toLowerCase();
        // hash their password 👍
        const password = await bcrypt.hash(args.password, 10)
        // create the user in the database.  You're overwriting the password by adding it after ...args.  Have to
        //   set permissions too btw 👍
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                permissions: { set: ['USER']},
                },
            },
            // Now that you've signed up, how ab that web token cookie thing? 😻
        info
        );
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        // Now we need to set that cookie on the response, httpOnly for CORS Defense! 🙅‍
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 365 * 24, // 1 year bra
        });
        // Then return the user to the browser
        return user;
    },
    // whew...
};



module.exports = Mutation;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// stripe has all the methods in it you need 🙅‍
const stripe = require('../stripe');

const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args,
        },
      },
      info
    );

    console.log(item);

    return item;
  },
  async createOrder(parent, args, ctx, info) {
    // 1.  Query the current user and assure they're signed in.  Go into the nested cart and dig out details 👍
    const { userId } = ctx.request;
    if (!userId) throw new Error('You are not signed in');
    const user = await ctx.db.query.user(
      { where: { id: userId } },
      `{ 
        id 
        name 
        email 
        cart { 
          id 
          quantity 
          item { title price id description image} 
        }}`
      );
    // 2.  Recalculate the total for the price where they can't interfere with it on the client side (js)
    const amount = user.cart.reduce(
      (tally, cartItem) => tally + cartItem.item.price * 
      cartItem.quantity, 
      0
    );
    console.log(`Charge total is ${amount}`);
    // 3.  Create the Stripe charge
    // 4.  Convert the Cartitems to Orderitems
    // 5.  Create the Order
    // 6.  Clear up the cart, clear the cache and delete the cart items, return order to client
  },
  updateItem(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. find the item
    const item = await ctx.db.query.item({ where }, `{ id title}`);
    // 2. Check if they own that item, or have the permissions
    // TODO
    // 3. Delete it!
    return ctx.db.mutation.deleteItem({ where }, info);
  },
  async removeFromCart(parent, args, ctx, info) {
    // 1.  Locate the cart item
    const cartItem = await ctx.db.query.cartItem({
      where: {
        id: args.id
      },
    }, `{ id, user { id }}`
    );
    if(!cartItem) throw new Error('No CartItem Found!');
    // 2.  Make sure they own that cart item
    if(cartItem.user.id !== ctx.request.userId) {
      throw new Error('naaawww');
    }
    // 3.  Delete that cart item where the prisma.graphql provides the API to do this...deleteCartItem is a mutation 
    //   in there with a where argument
    return ctx.db.mutation.deleteCartItem(
      {
      where: { id: args.id },
      }, 
      info 
    );
  },
  async signup(parent, args, ctx, info) {
    // lowercase their email
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info
    );
    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // We set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });
    // Finalllllly we return the user to the browser
    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    // 1. check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. Check if their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid Password!');
    }
    // 3. generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    // 5. Return the user
    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Peace!'}
  },
  async addToCart(parent, args, ctx, info) {
    // 1.  Check if the user is signed in 👍
    const { userId } = ctx.request;
    // if(!userId) {
    //   throw new Error('Bro, you are not signed in');
    // }

    // 2.  Query that users cart, you gotta do cartItems to look through all.  Look in the prisma.graphql API...
    //   when you dig in the API, there is the whereId noise going on which makes the logic work out 👍
    //     Try not putting await there and have fun debugging that error lol
    const [existingCartItem] = await ctx.db.query.cartItems({
      // isnt where great? 😆
      where: { 
        user: { id: userId  },
        item: { id: args.id },
      }
    });
    // 3.  Check if they already have one of said item, increment appropriately
    if(existingCartItem) {
      console.log('Product is already in their cart');
      // Again, check updateCartItem in the prisma.graphql API for updateCartItem...it takes in a where argument
      return ctx.db.mutation.updateCartItem({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + 1}
      }, info);
    }
    // 4.  Create it fresh depending on aforementioned check, i.e., if its not already there in the cart
    return ctx.db.mutation.createCartItem({
      data: {
        user: {
          connect: { id: userId },
        },
        item: { 
          connect: { id: args.id }
        },
      },
    }, info);
  },
};

module.exports = Mutations;

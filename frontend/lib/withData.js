// withApollo then exposes what in the client database provided by apollo-boost via a prop...helps with server-side rendering
import withApollo from 'next-with-apollo';
// This has all of the standard things you would want to use.  Apollo Boost includes apollo-client
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';
import { LOCAL_STATE_QUERY } from '../components/Cart';

// The credentials include logs the cookies for the request...so if your already logged in
// Headers are for our authentication.
function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    // local data to store cart changes coming in hot 🔥
    clientState: {
      resolvers: {
        Mutation: {
          // Oh snap were gonna read the value from the cache then flip that MO
          toggleCart(_, variables, { cache }) {
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            // Now we write the cart state to the opposite value of whatever it is !duh
            const data = {
              data: { cartOpen: !cartOpen },
            };
            cache.writeData(data);
            return data;
          },
        },
      },
      defaults: {
        // Boolean you gonna be flippin
        cartOpen: true
      }
    }
  });
}



export default withApollo(createClient);

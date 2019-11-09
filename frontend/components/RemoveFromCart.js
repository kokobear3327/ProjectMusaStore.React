import React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

// Notice you only care about getting the id for the item you are removing, need nothing else! (cache removal) 👍
//   Next step is to make a mutation and fuse this puppy into it 🐶

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.blue};
    cursor: crosshair;
  }
`;

class RemoveFromCart extends React.Component {
  // This is necessary for the cartItem.id prop to work in the CartItem.js function needed for deletion 👍
  static propTypes = {
    id: PropTypes.string.isRequired,
  };
  // This gets called as soon as we get a response back from the server after a mutation has been performed
  //   Its literally not optimistic, unless you call optimisticResponse as attribute on mutation
  //     but whose counting.  The 👞 fits 👍
  optimisticUpdate = (cache, payload) => {
    console.log('Ran remove from cart updating function! 🤸‍')
    // 1. first read the cache
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    // 2. remove that item from the cart using filter duh, after your grab the id! 👍
    const cartItemId = payload.data.removeFromCart.id;
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
    // 3. write it back to the cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };
  render() {
    return (
      <Mutation
        variables={{ id: this.props.id }}
        update={this.optimisticUpdate}
        mutation={REMOVE_FROM_CART_MUTATION}
        // This is where you give it what you think the server will respond with!  It will do this while promise thingy
        //   is executed in background.
        optimisticResponse={{
          __typename: 'Mutation',
          removeFromCart: {
            __typename: 'CartItem',
            id: this.props.id,
          },
        }}
      >
        {(removeFromCart, { loading, error }) => (
          <BigButton
            disabled={loading}
            onClick={() => {
              removeFromCart().catch(err => alert(err.message));
            }}
            title="Remove from 🛒"
          >
            💩
          </BigButton>
        )}
      </Mutation>
    );
  }
}

export default RemoveFromCart;
export { REMOVE_FROM_CART_MUTATION };

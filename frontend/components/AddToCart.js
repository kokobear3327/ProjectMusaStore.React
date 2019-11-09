import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

// You gotta refetch the current user query else it won't update the cart appropriately when its open and you add
//   So it would have added it on the server but that cache is all 🦆'd up, hence the refetch
const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

class AddToCart extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        variables={{
            id,
          }}
        mutation={ADD_TO_CART_MUTATION}
      >
        {(addToCart, { loading }) => (
          <button onClick={addToCart} disabled={loading} >
            Add{loading && 'ing'} To Cart 🛒
          </button>
        )}
      </Mutation>
    );
  }
}
export default AddToCart;

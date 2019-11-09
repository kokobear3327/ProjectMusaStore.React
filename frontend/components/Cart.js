import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`

// So the client part is saying don't go to the graphQL server, go to the client in local state
const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`

const Cart = () => (
  <Mutation mutation={TOGGLE_CART_MUTATION}>{(toggleCart) => (
  <Query query={LOCAL_STATE_QUERY}>
    {({data}) => console.log(data) || (
  <CartStyles open={data.cartOpen}>
    <header>
      <CloseButton 
        title="close"
        onClick={toggleCart}
      >
        &times;
      </CloseButton>
      <Supreme>Your Cart</Supreme>
      <p>You have __ Items in your cart</p>
    </header>

  <footer>
    <p>$17.76</p>
  </footer>
       <SickButton>Checkout</SickButton>
       </CartStyles>
      )}
      </Query>
    )}
    </Mutation>
);

export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION }
export default Cart;
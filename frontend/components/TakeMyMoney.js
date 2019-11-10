import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import User, { CURRENT_USER_QUERY } from './User';

// So StripeCheckout takes a ton of parameters...look up the documentation to see the whole list.
//   Options include things like currency, amount, token, desription, and even bitcoin 🤔
//   Obviously, you want to interpolate things like the amount into these arguments 👍

// Likewise, we get an awful error it item doesn't exist, so you check with me.cart[0].item && 👍

// So the way it works:
//   You create a token with the CC info that is sent to Stripe who then send your token to the server

// Generating the token is crucial to the process.  Once you get the token, you then pass that MO to the server 👍

// Passing the createOrder function as a secondary argument to token is a 🔑 step in this whole process.  Scoping

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

const CREATE_ORDER_MUTATION = gql` 
mutation createOrder($token: String!) {
  createOrder(token: $token) {
    id
    charge
    total
    items {
      id
      title
    }
  }
}

`

class TakeMyMoney extends React.Component {
  onToken = (res, createOrder) => {
    console.log('On Token Called!');
    console.log('this is the res:');
    console.log(res);
    // manually call the mutation once we have the stripe token.  
    createOrder({
      variables: {
        token: res.id
      }
    }).catch(err => {
      alert(err.message);
    });
  };
  render() {
    return (
    <User>
    {({ data: { me } }) => (
    <Mutation mutation={CREATE_ORDER_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY}
    ]}>
    {createOrder => (
    <StripeCheckout
      name="Project Musa"
      amount={calcTotalPrice(me.cart[0].item && me.cart)}
      // Here is where the error is coming from, cannot query totalItems...
      description={`${totalItems(me.cart)} products ordered!`}
      // Be careful, this produces an awful bug if you dont do the preceding && logic :
      image={me.cart[0].item && me.cart[0].item.image}
      stripeKey="pk_test_2vx7bJ9C6SY3O8LUWtaydvWx00ZoPPIAgd"
      currency="USD"
      email={me.email}
      token={res => this.onToken(res, 
        createOrder)}
      >
                {this.props.children}       
              </StripeCheckout>
            )}
          </Mutation>
          )}
      </User>
    );
  }
}

export default TakeMyMoney;


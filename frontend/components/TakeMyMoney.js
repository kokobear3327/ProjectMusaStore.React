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


function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class TakeMyMoney extends React.Component {
  onToken = res => {
    console.log('On Token Called!');
    console.log('this is the res:');
    console.log(res);
  }
  render() {
    return <User>{({ data: { me } }) => <StripeCheckout
      amount={calcTotalPrice(me.cart)}
      name="Project Musa"
      description={`${totalItems(me.cart)} products ordered!`}
      // Be careful, this produces an awful bug:
      image={me.cart[0].item && me.cart[0].item.image}
      stripeKey="pk_live_grzfRYXcSWt70FeeiFIKFucz00tkYgt2an"
      currency="USD"
      email={me.email}
      token={res => this.onToken(res)}

    >{this.props.children}</StripeCheckout>}</User>;
  }
}

export default TakeMyMoney;


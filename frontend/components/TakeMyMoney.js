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


class TakeMyMoney extends React.Component {
  render() {
    return <User>{({ data: { me } }) => <StripeCheckout
    >{this.props.children}</StripeCheckout>}</User>;
  }
}

export default TakeMyMoney;


import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
import Head from 'next/head';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
// import Error from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`;

class Order extends React.Component {
    static propTypes = {
    id: PropTypes.string.isRequired
    }
    render() {
        return (
            <Query query={SINGLE_ORDER_QUERY} variables={{ id: 
            this.props.id}}>
                {({data, error, loading}) => {
                    if(error) return <Error error={error}/>
                    if(loading) return <p>Its Loading 🤸‍</p>
                    console.log(data)
                    const order = data.order;
                    return (
                      <OrderStyles data-test="order">
                      <Head>
                        <title>Project Musa - Your Order</title>
                      </Head>
                      <p>
                        <span>Order ID:</span>
                        <span>We might need this from you: {this.props.id} </span>
                      </p>
                      <p>
                        <span>Charge</span>
                        <span>And this too: {order.charge}</span>
                      </p>
                      <p>
                        <span>Date</span>
                        <span>Your order was created at: {format(order.createdAt, 'MMMM d, YYYY h:mm a', { awareOfUnicodeTokens: true })}</span>
                      </p>
                      <p>
                        <span>Your Bill:</span>
                        <span>{formatMoney(order.total)}</span>
                      </p>
                      <p>
                        <span>Item Count</span>
                        <span>{order.items.length}</span>
                      </p>
                      <div className="items">
                        {order.items.map(item => (
                          <div className="order-item" key={item.id}>
                            <img src={item.image} alt={item.title} />
                            <div className="item-details">
                              <h2>{item.title}</h2>
                              <p>Qty: {item.quantity}</p>
                              <p>Each: {formatMoney(item.price)}</p>
                              <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
                              <p>{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </OrderStyles>
                    );
                }}
            </Query>
        );
    }
}

export default Order;

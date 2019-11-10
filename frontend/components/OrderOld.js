import React from 'react'
// like moment.js, has date functions
import { format } from 'date-fns';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import gql from 'graphql-tag';
import OrderStyles from './styles/OrderStyles';
import formatMoney from '../lib/formatMoney';

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
`

class Order extends React.Component {
    static propTypes = {
    id: PropTypes.string.isRequired
    }
    render() {
        return (
            <Query query={SINGLE_ORDER_QUERY} variables={{ id: this.props.id}}>
                {({data, error, loading}) => {
                    if(error) return <Error error={error}/>
                    if(loading) return <p>Its Loading 🤸‍</p>
                    console.log(data)
                    return (
                    <div>
                        <p>Order ID: {this.props.id}</p>
                    </div>
                    );
                }}
            </Query>
        );
    }
}

export default Order;

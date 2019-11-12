import React, { Component } from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag'
import styled from 'styled-components';
import Item from './Item';
import Pagination from './Pagination';
import { perPage } from '../config';

// This is how you do it via Apollo.  The child of a query(or mutation) component must be a function!

// run npm run dev on the backend, then it should properly communicate with the localhost:1776

// You could also call ${props => props.theme.maxWidth} for max-width
const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: 1200px;
  margin: auto;
`;

const CenteredDiv = styled.div`
  text-align: center;
`

// orderBy DESC is how you get it ordering by most recent
const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: id_DESC ) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;




// Complicated but : this.props.page * perPage - perPage This satisfies the numbers needed...do it 👍

class Items extends Component {
  render() {
    return (
      <CenteredDiv>
        <Pagination page={this.props.page} />
        <Query query={ALL_ITEMS_QUERY} variables={{
          skip: this.props.page * perPage - perPage,
          }}>
          {({ data, error, loading }) => {
            if (loading) return <p>It's Loading! One Sec...</p>
            if (error) return <p>Returned an error:  {error.message} </p>
            return <ItemsList>
              {data.items.map(item => 
                <Item item={item} key={item.id}></Item>
                )}
            </ItemsList>
          }}
        </Query>
        <Pagination page={this.props.page} />
      </CenteredDiv>
    )
  }
}

export default Items;
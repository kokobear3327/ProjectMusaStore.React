import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import Router from 'next/router';

// So the mutation(createItem) and query(whatever you defined in schema) have to return...
//   wait for it...a function! 🕵️ For arguments for said function, You first get the mutation 
//  function, and second the payload which actually is (loading, error, called, and data)

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: {id: $id}){
            id
            title
            description
            price
        }
    }
`

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
  ) {
    updateItem(
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;


export default class UpdateItem extends Component {
  state = {};
  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  }

  updateItem = async (e, updateItemMutation) => {
      e.preventDefault();
      console.log("Updating Item!!");
      console.log(this.state)
      const res = await updateItemMutation({
          variables: {
              id: this.props.id,
              ...this.state,
          }
      });
      console.log()
  };

 
// We are nesting the mutation inside of the query, which in turn has the form = How you expose multiple 
//   mutations and queries to it.

// So in summary:  
//   We are running the query, then we have the render prop function with data and loading arguments
//     If its not loading, we then return our mutation which renders the form tag which exposes both
//     the data of the item and the createItem function

// So how do we show the user what they have?  We use defaultValue={this.state.title}
  render() {
    return (
    <Query query={SINGLE_ITEM_QUERY} variables={{
        id: this.props.id
    }}>
        {({data, loading}) => {
            
            if (loading) return <p>Loading...</p>;
            if (!data.item) return <p>No item found that id bro: {this.props.id}</p>

    // Holy cow, this is complex, but we pass a function to the function return.
    return (

      <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
        {(updateItem, { loading, error }) => (

      <Form onSubmit={e => this.updateItem(e, updateItem)}>
        <Error error={error} />
        <fieldset disabled={loading} aria-busy={true}>
        <br></br>
          <label htmlFor="title">
            Title
            <input 
              type="text" 
              id="title" 
              name="title" 
              placeholder="Title" 
              required 
              defaultValue={data.item.title} 
              onChange={this.handleChange}
              />
          </label>

    
          <label htmlFor="price">
            Price
            <input 
              type="text" 
              id="price" 
              name="price" 
              placeholder="Price" 
              required 
              defaultValue={data.item.price} 
              onChange={this.handleChange}
              />
          </label>


          <label htmlFor="description">
            Description
            <textarea 
              id="description" 
              name="description" 
              placeholder="Describe the Speaker" 
              required 
              defaultValue={data.item.description} 
              onChange={this.handleChange}
              />
                    </label>

                    <button type="submit">Save Speaker Changes</button>
                    </fieldset>
                </Form>
                )}
                </Mutation>
            );
        }}
    </Query>
    );
  }
}

export { UPDATE_ITEM_MUTATION };
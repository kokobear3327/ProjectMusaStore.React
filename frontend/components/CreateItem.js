import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import structureMonies from '../lib/structureMonies';
// import Error from './ErrorMessage';
import Router from 'next/router';

// So the mutation(createItem) and query(whatever you defined in schema) have to return...
//   wait for it...a function! 🕵️ For arguments for said function, You first get the mutation 
//  function, and second the payload which actually is (loading, error, called, and data)

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;


export default class CreateItem extends Component {
  state = {
    title: 'Title of Speaker?',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
};
  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  }

  uploadFile = async e => {
    console.log("Uploading file...");
    const files = e.target.files;
    // part of the JS language bra 👍
    const data = new FormData()
    data.append('file', files[0]);
    data.append('upload_preset', 'projectmusa')

    const res = await fetch('https://api.cloudinary.com/v1_1/project-musa/image/upload', {
      method: 'POST',
      body: data
      });
      const file = await res.json()
      console.log(file);
      // Now we gotta put the data back into those spots in our state.
      // You can do file.eager[0].secure_url to get the resized one 👍
      this.setState({
        image: file.secure_url,
        largeImage: file.eager[0].secure_url
      })
    };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (

      <Form onSubmit={async e => {
        // So we stop the form from submitting
        e.preventDefault();
        console.log("here is the state:")
        console.log(this.state);
        // call the mutation
        const res = await createItem();
        console.log("here is the response:")
        console.log(res)

        // This is how you would route it to the specific page that you want!
        //   but bro you need refetching queries to not get a 404 👍

        // Router.push({
        //   pathname: '/item',
        //   query: { id: res.data.createItem.id }
        // })

      }}>
        {/* <Error error={error} /> */}
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
              value={this.state.title} 
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
              value={this.state.price} 
              onChange={this.handleChange}
              />
          </label>

          <label htmlFor="image">
            Image
            <input
              type="file"
              id="image" 
              name="image" 
              placeholder="Upload Speaker Nudes Please" 
              required 
              onChange={this.uploadFile}
              />
              {this.state.image && <img src={this.state.image} alt="Image Preview" />}
        
          </label>

          <label htmlFor="description">
            Description
            <textarea 
              id="description" 
              name="description" 
              placeholder="Describe the Speaker" 
              required 
              value={this.state.description} 
              onChange={this.handleChange}
              />
          </label>

          <button type="submit">Create Speaker</button>
        </fieldset>
      </Form>
                )}
                </Mutation>
    );
  }
}

export { CREATE_ITEM_MUTATION };
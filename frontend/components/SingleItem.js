import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
// import Error from './ErrorMessage';
import Head from 'next/head'

// So we gotta use SideEffects to change the title tag from the head...So oyu put the head tag in there with the desired title

// Object-fit: contain alwaus forcibly fits the item into the container.  cover cuts sides off, none makes it warped
const SoloProductDisplayDiv = styled.div`
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    min-height: 800px;
    box-shadow: ${props => props.theme.bs};
    display: grid;
    max-width: 1200px;
    margin: 2rem auto;
    img {
        /* width: 100%;
        height: 100%;
        object-fit: contain; */
    }
    .details {
        margin: 3rem;
        font-size: 2rem;
    }
`

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: {id: $id }) {
            id
            title
            description
            largeImage
        }
    }
`
class SingleItem extends Component {
    render() {
        return (
            <Query 
                query={SINGLE_ITEM_QUERY}
                variables={{
                    id: this.props.id
                }}
            >
                {({error, loading, data}) => {
                    if(error) return <Error error={error} />
                    if(loading) return <p>Loadin 🤸‍♂️ </p>
                    if (!data.item) return <p>No item found!! for {this.props.id}</p>
                    const item = data.item;
                    return <SoloProductDisplayDiv>
                        <Head>
                            <title>Our {item.title}</title>
                        </Head>
                        <img src={item.largeImage} alt={item.title} />
                        <div className="details">
                            <h2>Viewing {item.title}</h2>
                            <p>{item.description}</p>


                        </div>
                    </SoloProductDisplayDiv>
                }}
            </Query>
        )
    }
}

export default SingleItem;

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { perPage } from '../config';
import { Query } from 'react-apollo'
import PaginationStyles from './styles/PaginationStyles';
import gql from 'graphql-tag';



const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        itemsConnection {
            aggregate {
                count
            }
        }
    }
`

// So you use prisma ItemConnection to figure out how many items you have as this is exposed via the API

const Pagination = props => (
        <Query query={PAGINATION_QUERY}>
            {({data, loading, error}) => {
                if (error) return <p>shit is fucked 💩Aka Error</p>
                if (loading) return <p>Its Loading 🤸‍♂️</p>
                const count = data.itemsConnection.aggregate.count;
                const pages = Math.ceil(count / perPage);
                const page = props.page;
                // page - 1 cuz you want the previous page 👍
                // prefetch is going to prerender the previous and forward looking page for faster

                return (
                    <PaginationStyles>
                        <Head> 
                            <title>Project Musa! {page} of {pages}</title>
                        </Head>
                        <Link prefetch href={{
                            pathname: 'items',
                            query: { page: page - 1 }
                        }}>
                            <a className="prev" aria-disabled={page <= 1}>  ◀️   </a>
                        </Link>
                        <p>{props.page} of {pages}</p>
                        <p>{count} Pictures Total </p>
                        <Link prefetch href={{
                            pathname: 'items',
                            query: { page: page + 1 }
                        }}>
                            <a className="prev" aria-disabled={page >= pages}>  ▶️  </a>
                        </Link>
                    </PaginationStyles>
                )}}
            </Query>
)

export default Pagination;
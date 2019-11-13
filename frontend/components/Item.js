import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import structureMonies from '../lib/structureMonies';
import AddToCart from './AddToCart';

// You gotta {{}} things because the first {} is just saying its a JS object, the second is the ref 👍

// The item.image logic works out where the second argument doesn't run unless there is an image...

// Next.js doesn't do custom URL paths unless you use an external package.

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    };
  
    render() {
      const { item } = this.props;
      return (
        <ItemStyles>
          {item.image && <img src={item.image} alt={item.title} />}
            <Title>
              <Link href={{
                pathname: '/item',
                query: {id: item.id}
              }}>
              <a> {item.title} </a>
              </Link>
            </Title>
            <PriceTag>{structureMonies(item.price)}</PriceTag>
            <p>{item.description}</p>

            <div className="buttonList">
              {/* <Link href={{
                pathname: 'update',
                query: { id: item.id }
              }}>
                <a>Write ✍️</a>
              </Link> */}
              <AddToCart id={item.id} />
              <button>Remove from 🛒</button>
            </div>
        </ItemStyles>
      );
    }
  }

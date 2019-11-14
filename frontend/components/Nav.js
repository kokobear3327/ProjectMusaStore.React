import Link from 'next/link';
import CartCount from './CartCount'
import NavStyles from './styles/NavStyles';
import { Mutation } from 'react-apollo'
import User from './User';
import Signout from './Signout';
import { TOGGLE_CART_MUTATION } from './Cart'

// So you wrap the User component over the whole enchilada and it gives you access to their items and what not

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href="/items">
          <a>Store</a>
        </Link>
        {me && (
          <>
            <Link href="/history">
              <a>History</a>
            </Link>
            {/* <Link href="/admin">
              <a>Admin</a>
            </Link> */}

            <Signout />
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {(toggleCart) => (
                <button onClick={toggleCart} >
                  My Cart 🛒
                  <CartCount count={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)}></CartCount>
                  </button>
            )}
            </Mutation>
          </>
        )}
        {!me && (
          <Link href="/signup">
            <a>Sign In</a>
          </Link>

        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;

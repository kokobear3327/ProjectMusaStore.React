import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { TOGGLE_CART_MUTATION } from './Cart';
import NavStyles from './styles/NavStyles';
import User from './User';
import CartCount from './CartCount';
import Signout from './Signout';

const Nav = () => (
    <NavStyles>
        <User>
            {({data: { me } }) => {
                console.log(me);
                if (me) return <p>{me.name}</p>
                return null
            }}
        </User>
        <Link href='/items'>
        <a>Shop</a>
        </Link>

        <Link href='/signup'>
        <a>Signup</a>
        </Link>
        <Link href='/orders'>
        <a>Orders</a>
        </Link>
        <Link href='/me'>
        <a>Account</a>
        </Link>
        <Link href='/admin'>
        <a>Admin</a>
        </Link>
        <Mutation mutation={TOGGLE_CART_MUTATION}>
            {(toggleCart) => (
                <button onClick={toggleCart}>My Cart 🛒</button>
         )}
        </Mutation>

        

    </NavStyles>
);

export default Nav;
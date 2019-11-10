import Order from '../components/Order';

const OrderPage = props => (
    <div>
        <Order id={props.query.id} />
    </div>
);

export default OrderPage;
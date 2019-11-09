import Link from 'next/link';
import UpdateItem from '../components/UpdateItem';


// so in _app.js you have the ctx.db assignment, this makes the query available to every component. 
//  You can also destructure props immediately into ({query}) then have id={query.id}

const Admin = props => (
    <div>
        <UpdateItem id={props.query.id} />
    </div>
);

export default Admin
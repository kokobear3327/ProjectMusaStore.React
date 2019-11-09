import SingleItem from '../components/SingleItem';

// You put the query on the component preferable to this page (its in SingleItem)
const Item = props => (
        <div>
            <SingleItem id={props.query.id} />
        </div>
);

export default Item;
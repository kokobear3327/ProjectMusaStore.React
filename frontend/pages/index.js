import Link from 'next/link'
import Items from '../components/Items'

// parseFloat cuz its otherwise a stringy number 👍

// You also get NaN if you go to /items path so you gotta make it || 1
const Home = props => (
    <div>
        <Items page={parseFloat(props.query.page) || 1 } />
    </div>
);

export default Home
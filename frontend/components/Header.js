import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';
import Router from 'next/router';
// CSS that is required for nProgress can be found in the meta
import NProgress from 'nprogress';
import Cart from './Cart'

// So these are the Router Event methods provided by the next.js framework.  Look into Router Events in the next.js github documentation for additional reference.
Router.onRouteChangeStart = () => { 
    NProgress.start();
}

Router.onRouteChangeComplete = () => { 
    NProgress.done();
}

Router.onRouteChangeError = () => { 
    NProgress.done();
}

const Logo = styled.h1`
  font-size: 5rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.2rem 1rem;
    /* background: ${props => props.theme.blue}; */
    color: black;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  .bar {
    border-bottom: 8px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
`;

const Header = () => (
    <StyledHeader>
        <div className="bar">
            <Logo>
                <Link href="/">
                    <a>The Project Musa Store</a>
                </Link>
            </Logo>
            <Nav />
        </div>
        <div className="sub-bar">
            {/* <p>Search</p> */}
        </div>
        <Cart />
    </StyledHeader>
)

export default Header
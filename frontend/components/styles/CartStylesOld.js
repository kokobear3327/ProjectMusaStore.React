import styled from 'styled-components';

const CartStyles = styled.div`
  background: rgba(228, 228, 228, 1);
  box-shadow: 0 0 45px 13px rgba(1, 10, 0, 0.9);
  height: 83.9%;
  bottom: 0;
  right: 0;
  width: 41.2%;
  min-width: 550px;
  padding: 23px;
  position: fixed;
  transform: translateX(100%);
  transition: all 1.5s;
  z-index: 5;
  display: grid;
  grid-template-rows: auto;
  ${props => props.open && `transform: translateX(0);`};
  header {
    border-bottom: 12px solid ${props => props.theme.black};
    margin-bottom: 12px;
    padding-bottom: 2rem;
  }
  footer {
    border-top: 10px double ${props => props.theme.black};
    margin-top: 2rem;
    padding-top: 2rem;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    font-size: 3rem;
    font-weight: 900;
    font-family: 'Advertising Script'
    p {
      margin: 0;
    }
  }
  ul {
    list-style: none;
    overflow: scroll;
    margin: 0;
    padding: 0;

  }
`;

export default CartStyles;

import styled from 'styled-components';

const Item = styled.div`
  border: 3px solid ${props => props.theme.black};
  box-shadow: 0 0 76px 34px rgba(1, 10, 0, 0.9);
  display: flex;
  background: rgba(1, 1, 0, 0.2101);
  flex-direction: column;
  position: relative;
  a {
    font-size: 23px;
    /* padding-top: 20px;
    margin-top: 20px; */
  }
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  p {
    padding: 0 2.3rem;
    font-size: 2.3rem;
    line-height: 1.4;
    font-weight: 300;
    flex-grow: 1; 
  
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 3px solid ${props => props.theme.black};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 3px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 16px;
      padding: 1rem;
    }
  }
`;

export default Item;

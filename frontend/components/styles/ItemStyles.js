import styled from 'styled-components';

const Item = styled.div`
  border: 1px solid ${props => props.theme.black};
  box-shadow: 0 0 76px 30px rgba(1, 10, 0, 0.9);
  display: flex;
  background: rgba(1, 1, 0, 0.2101);
  flex-direction: column;
  position: relative;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  p {
    padding: 0 3rem;
    font-size: 1.5rem;
    font-size: 17px;
    line-height: 1.4;
    font-weight: 300;
    flex-grow: 1;
    /* padding: 0 3rem; */
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;

export default Item;

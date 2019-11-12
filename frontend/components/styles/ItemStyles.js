import styled from 'styled-components';

const Item = styled.div`
  display: flex;
  background: white;
  flex-direction: column;
  border: 1px solid ${props => props.theme.black};
  box-shadow: 0 0 56px 12px rgba(1, 10, 0, 0.9);
  // corner-radius: 12px;
  position: relative;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  p {
    padding: 0 3rem;
    font-size: 1.5rem;
    font-size: 12px;
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
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

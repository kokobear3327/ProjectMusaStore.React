import styled from 'styled-components';

const PaginationStyles = styled.div`
  box-shadow: 0 0 66px 23px rgba(1, 10, 0, 0.9);
  font-size: 17px;
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  border: 2px solid ${props => props.theme.lightgrey};
  border-radius: 34px;
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid ${props => props.theme.lightgrey};
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
`;

export default PaginationStyles;

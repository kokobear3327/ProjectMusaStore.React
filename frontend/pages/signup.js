import Signup from '../components/Signup';
import styled from 'styled-components';
import Signin from '../components/Signin';

// So if we were to hypothetically add more and more columns, they would break the 300px minimum and would then wrap 👍
const ColumnsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignupPage = props => (
  <ColumnsDiv>
    <Signup />
    <Signin />
  </ColumnsDiv>
);

export default SignupPage;

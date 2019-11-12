import styled from 'styled-components';

const ProjectmusaButton = styled.button`
  background: black; 
  color: white;
  font-weight: 500;
  border: 10;
  border-radius: 28px;

  font-size: 23px;
  font-family: "Advertising Script";
  padding: 0.8rem 1.5rem;
  /* transform: skew(-20npm rundeg); */
  display: inline-block;
  transition: all 0.5s;
  &[disabled] {
    opacity: 0.5;
  }
`;

export default ProjectmusaButton;

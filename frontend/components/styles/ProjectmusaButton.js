import styled from 'styled-components';

const ProjectmusaButton = styled.button`
  background: black; 
  color: white;
  font-weight: 200;
  border: 0;
  border-radius: 28px;
  font-size: 21px;
  font-family: "Advertising Script";
  padding: 0.8rem 1.5rem;
  display: inline-block;
  transition: all 0.5s;
  &[disabled] {
    opacity: 0.5;
  }
`;

export default ProjectmusaButton;

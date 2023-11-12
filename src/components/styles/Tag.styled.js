import styled from "styled-components";

export const StyledTag = styled.button`
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #000;
  font-size: ${(props) => (props.$bg ? "0.7rem" : "0.6rem")};
  font-weight: normal;
  border: 1px solid black;
  padding: ${(props) => (props.$bg ? "0.8em 1.8em" : "0.6em 1.2em")};
  box-shadow: -4px 3px 0 0 #000;
  background-color: white;
  opacity: 0.9;
  text-decoration: none;
`;

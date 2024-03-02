import { Button } from "react-bootstrap";
import styled from "styled-components";

export const BotaoStyle = styled(Button)`
  height: 40px;
  padding: 0 20px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

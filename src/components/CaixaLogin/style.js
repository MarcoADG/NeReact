import styled from "styled-components";
import Card from "react-bootstrap/Card";
import PC from "../../assets/man-working-with-pc.jpg";

export const CaixaLoginStyle = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border: solid 3px black;
  height: 60vh;
  width: 60%;
  background-image: url(${PC});
  background-size: cover;

  .cardb1 {
    flex: 1;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    text-align: center;
    padding: 15px;
    margin: 10px;
    background-color: var(--creme-secundario) !important;
    height: 90%;
    border-radius: 3%;
  }

  .card-title {
    font-size: 30px;
    font-weight: bold;
    margin: 3px;
  }

  .cardb2 {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .botoes {
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
  }

  .checkforms {
    display: flex;
    justify-content: space-evenly;
    align-content: center;
  }

  .error {
    display: flex;
    justify-content: center;
    font-size: 15px;
    color: red;
    margin-bottom: 8px;
    margin-top: 0px;
  }
`;

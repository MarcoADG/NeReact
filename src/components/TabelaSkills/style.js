import Table from "react-bootstrap/Table";
import styled from "styled-components";

export const TabelaStyle = styled(Table)`
  border: solid gray;
  background-color: lightgray;
  width: 80vw;
  height: 60vh;

  thead {
    background-color: gray;
    color: #212529;
    padding: 10px;
  }

  th,
  td {
    text-align: center;
    padding: 8px;
    vertical-align: middle;
    height: 10px;
    max-width: 30px;
  }

  .inputTabela {
    margin: 3px;
    font-size: 18px;
    max-width: 100px;
  }

  .adicionar {
    text-align: center;
  }

  .adicionar svg {
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
  }
`;

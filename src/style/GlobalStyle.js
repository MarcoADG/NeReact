import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`


:root {
  --branco: ${(props) => props.theme.colors.white};
  --branco-primario: ${(props) => props.theme.colors.whitePrimary};
  --preto: ${(props) => props.theme.colors.black};
  --preto-primario: ${(props) => props.theme.colors.blackPrimary};
  --azul-primario: ${(props) => props.theme.colors.bluePrimary};
  --azul-secundario: ${(props) => props.theme.colors.blueSecondary};
  --marrom-primario: ${(props) => props.theme.colors.brownPrimary};
  --creme-primario: ${(props) => props.theme.colors.creamPrimary};
  --creme-secundario: ${(props) => props.theme.colors.creamSecondary};
  --cinza-primario: ${(props) => props.theme.colors.grayPrimary};
  
  --cor-fonte: var(--creme-primario);
  --cor-fundo: var(--azul-primario);
}

body {
    font-size: ${(props) => props.theme.font.size};
    list-style-type: none;
    background-color: var(--bg-color) !important;
    color: var(--preto-primario) !important;
    font-family: 'Source Sans Pro', sans-serif !important;
  }
`;
export default GlobalStyle;

import React from "react";
import { BotaoStyle } from "./style";

export default function Botao({ texto, action }) {
  return (
    <>
      <BotaoStyle onClick={action}>{texto}</BotaoStyle>
    </>
  );
}

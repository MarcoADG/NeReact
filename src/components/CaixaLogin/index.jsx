import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { CaixaLoginStyle } from "./style.js";
import Formulario from "../Input/index.jsx";

export default function CaixaLogin() {
  return (
    <CaixaLoginStyle>
      <Card.Body className="cardb1">
        <Card.Title>Bem vindo ao Website de skills</Card.Title>
        <Formulario />
      </Card.Body>
      <Card.Body className="cardb2"></Card.Body>
    </CaixaLoginStyle>
  );
}

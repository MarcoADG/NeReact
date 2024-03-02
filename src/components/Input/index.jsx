import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Botao from "../Botao/index.jsx";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Formulario() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState("");
  const [modo, setModo] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [savePassword, setSavePassword] = useState(false);

  const navigate = useNavigate();

  function navigateTo(route) {
    navigate(route);
  }

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
    setError(false);
  };

  const handleSavePasswordChange = () => {
    if (!savePassword) {
      localStorage.setItem("savedPassword", senha);
    } else {
      localStorage.removeItem("savedPassword");
    }
    setSavePassword(!savePassword);
  };

  function cadastrar() {
    setModo(!modo);
    setSenha("");
    setLogin("");
    setShowPassword("");
    setConfirmarSenha("");
  }

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
    setError(false);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
    setError(false);
  };

  const handleConfirmarSenhaChange = (event) => {
    setConfirmarSenha(event.target.value);
    setError(false);
  };

  const handleSubmit1 = async (event) => {
    event.preventDefault();
    if (!login || !senha) {
      setError("Por favor, preencha todos os campos.");
    } else {
      setError("");
      try {
        const response = await axios.post("http://localhost:8080/login", {
          username: login,
          password: senha,
        });
        const token = response.headers["authorization"];
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        const userId = decoded.userId;
        localStorage.setItem("id", userId);
        navigateTo("/skills");
      } catch (error) {
        setError("Credenciais inválidas. Por favor, tente novamente.");
      }
    }
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    if (!login || !senha || !confirmarSenha) {
      setError("Por favor, preencha todos os campos.");
    } else if (senha != confirmarSenha) {
      setError("Senhas diferentes.");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/usuario/cadastrar",
          {
            login: login,
            senha: senha,
          }
        );
        setError("");
        setModo(!modo);
        setLogin("");
        setSenha("");
        setConfirmarSenha("");
        window.alert("Conta criada com sucesso!");
      } catch (error) {}
    }
  };

  useEffect(() => {
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedPassword) {
      setSenha(savedPassword);
      setSavePassword(true);
    }
  }, []);

  return (
    <>
      {modo ? (
        <Form className="formularios" onSubmit={handleSubmit1}>
          <Form.Control
            value={login}
            onChange={handleLoginChange}
            type="text"
            placeholder="Login"
            className="formulario1"
          />
          <InputGroup className="mb-3">
            <InputGroup.Checkbox
              aria-label="Checkbox for following text input"
              onChange={handleCheckboxChange}
              checked={showPassword}
            />
            <Form.Control
              value={senha}
              onChange={handleSenhaChange}
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              className="formulario"
            />
          </InputGroup>
          {error && <p className="error">{error}</p>}
          <div className="checkforms">
            <Form.Check
              type="checkbox"
              label="Salvar senha"
              onChange={handleSavePasswordChange}
              checked={savePassword}
            />
          </div>
          <div className="botoes">
            <Botao texto="Cadastrar-se" action={cadastrar} />
            <Botao texto="Login" action={handleSubmit1} />
          </div>
        </Form>
      ) : (
        <Form className="formularios" onSubmit={handleSubmit2}>
          <Form.Control
            value={login}
            onChange={handleLoginChange}
            type="text"
            placeholder="Login"
            className="formulario1"
          />
          <InputGroup className="mb-3">
            <InputGroup.Checkbox
              aria-label="Checkbox for following text input"
              onChange={handleCheckboxChange}
              checked={showPassword}
            />
            <Form.Control
              value={senha}
              onChange={handleSenhaChange}
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              className="formulario"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Checkbox
              aria-label="Checkbox for following text input"
              onChange={handleCheckboxChange}
              checked={showPassword}
            />
            <Form.Control
              value={confirmarSenha}
              onChange={handleConfirmarSenhaChange}
              type={showPassword ? "text" : "password"}
              placeholder="Confirmar Senha"
              className="formulario"
            />
          </InputGroup>
          {error && <p className="error">{error}</p>}
          <div className="checkforms">
            <Form.Check
              type="checkbox"
              label="Salvar senha"
              onChange={handleSavePasswordChange}
              checked={savePassword}
            />
          </div>
          <div className="botoes">
            <Botao texto="Cancelar" action={cadastrar} />
            <Botao texto="Cadastrar-se" action={handleSubmit2} />
          </div>
        </Form>
      )}
    </>
  );
}

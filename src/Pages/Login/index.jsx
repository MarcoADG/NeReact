import { React, useEffect } from "react";
import { LoginStyle } from "./style";
import CaixaLogin from "../../components/CaixaLogin";

function Login() {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }, []);

  return (
    <LoginStyle>
      <CaixaLogin />
    </LoginStyle>
  );
}

export default Login;

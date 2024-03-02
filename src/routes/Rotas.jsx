import { React, useEffect, useState } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Skills from "../Pages/Skills";

export default function Rotas({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  resetFontSize,
}) {
  const [windowSize, setWindowSize] = useState(getWindowsSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowsSize());
    }
    window.addEventListener("resize", handleWindowResize);
  }, [windowSize]);

  function getWindowsSize() {
    return window.screen.width;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>
    </BrowserRouter>
  );
}

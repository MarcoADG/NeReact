import { ThemeProvider } from "styled-components";
import { useState } from "react";
import GlobalStyle from "../src/style/GlobalStyle.js";
import Rotas from "./routes/Rotas.jsx";
import { darkTheme, lightTheme } from "./utils/themes.jsx";
import useFontSize from "./utils/hooks/fontSize.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const savedDarkMode = localStorage.getItem("darkMode");
  const [darkMode, setDarkMode] = useState(savedDarkMode === "true");
  const { size, increaseFontSize, decreaseFontSize, resetFontSize } =
    useFontSize();

  const HandledarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = {
    ...(darkMode ? darkTheme : lightTheme),
    font: {
      size: `${size}px`,
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Rotas
        resetFontSize={resetFontSize}
        increaseFontSize={increaseFontSize}
        decreaseFontSize={decreaseFontSize}
        HandledarkMode={HandledarkMode}
        isDarkMode={darkMode}
      />
    </ThemeProvider>
  );
}

export default App;

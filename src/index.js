
import React from "react";
import ReactDOM from "react-dom/client";  // Import from react-dom/client
import App from "./App";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./styles/GlobalStyle"; // Import both GlobalStyle and theme
import { ExpenseProvider } from "./context/ExpenseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));  // Create root with createRoot

root.render(
  <React.StrictMode>
    <ExpenseProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </ExpenseProvider>
  </React.StrictMode>
);

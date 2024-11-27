// import { createGlobalStyle } from "styled-components";


// export const GlobalStyle = createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }

//   body {
//     font-family: Arial, sans-serif;
//     background-color: ${({ theme }) => theme.background};
//     color: ${({ theme }) => theme.text};
//   }

//   h3 {
//     color: ${({ theme }) => theme.primary};
//   }
// `;




import { createGlobalStyle } from "styled-components";

export const theme = {
  primary: "#6200ea", // Replace with your desired color
  accent: "#03dac5",  // Replace with your desired color
  background: "#f5f5f5",
  text: "#333",
};

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background-color: ${theme.background};
    color: ${theme.text};
  }
`;

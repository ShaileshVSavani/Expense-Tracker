
import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./styles/GlobalStyle";
import { ExpenseProvider } from "./context/ExpenseContext";
import Dashboard from "./pages/Dashboard";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import styled from "styled-components";

// Styled Components
const AppContainer = styled.div`
  text-align: center;
  font-family: "Inter", sans-serif;
`;

const Header = styled.header`
  background-color: #6c63ff; /* Soft Purple */
  padding: 1.5rem;
  color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2rem;
    margin: 0;
  }
`;

const NavBar = styled.nav`
  background-color: #f5f5f5; /* Light Neutral Background */
  padding: 1rem 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
  }

  li {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: #6c63ff; /* Soft Purple */
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: background-color 0.3s ease, color 0.3s ease;

    &.active {
      background-color: #6c63ff; /* Active Soft Purple */
      color: white;
    }

    &:hover {
      background-color: #d4d2ff; /* Soft Lavender */
    }
  }
`;

const NotFound = styled.div`
  margin-top: 2rem;
  font-size: 1.5rem;
  color: #ff4d4d; /* Soft Red */
`;

const Footer = styled.footer`
  background-color: #f5f5f5; /* Light Neutral */
  padding: 1rem 0;
  text-align: center;
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #666; /* Subtle Grey */
`;

const App = () => {
  return (
    <Router>
      <ExpenseProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AppContainer>
            <Header>
              <h1>Expense Tracker</h1>
            </Header>
            <NavBar>
              <ul>
                <li>
                  <NavLink to="/" end activeClassName="active">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/add-expense" activeClassName="active">
                    Add Expense
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/expense-list" activeClassName="active">
                    Expense List
                  </NavLink>
                </li>
              </ul>
            </NavBar>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-expense" element={<ExpenseForm />} />
              <Route path="/expense-list" element={<ExpenseList />} />
              <Route
                path="*"
                element={
                  <NotFound>
                    <p>404 - Page Not Found</p>
                  </NotFound>
                }
              />
            </Routes>
            <Footer>
              <p>&copy; 2024 Expense Tracker. All rights reserved.</p>
            </Footer>
          </AppContainer>
        </ThemeProvider>
      </ExpenseProvider>
    </Router>
  );
};

export default App;


import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./styles/GlobalStyle"; // Import Global styles and theme
import { ExpenseProvider } from "./context/ExpenseContext"; // Wrap the app with ExpenseProvider
import { Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseList from "./components/ExpenseList/ExpenseList";

const App = () => {
  return (
    <Router>
      <ExpenseProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <div>
            <h1>Expense Tracker</h1>
            <nav>
              <ul>
                <li>
                  <Link to="/">Dashboard</Link>
                </li>
                <li>
                  <Link to="/add-expense">Add Expense</Link>
                </li>
                <li>
                  <Link to="/expense-list">Expense List</Link>
                </li>
              </ul>
            </nav>
            <Routes> {/* Replace Switch with Routes */}
              {/* Use 'element' prop instead of 'component' */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-expense" element={<ExpenseForm />} />
              <Route path="/expense-list" element={<ExpenseList />} />
            </Routes>
          </div>
        </ThemeProvider>
      </ExpenseProvider>
    </Router>
  );
};

export default App;

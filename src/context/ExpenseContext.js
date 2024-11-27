

import React, { createContext, useState, useEffect, useContext } from 'react';

// Create context for Expense
const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  // Load expenses from localStorage or default to an empty array
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Add a new expense
  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  // Update an existing expense
  const updateExpense = (id, updatedExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === id ? { ...expense, ...updatedExpense } : expense
      )
    );
  };

  // Delete an expense by ID
  const deleteExpense = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

  // Provide the functions and data to the rest of the app
  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, updateExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

// Custom hook to use expense context
export const useExpenseContext = () => useContext(ExpenseContext);

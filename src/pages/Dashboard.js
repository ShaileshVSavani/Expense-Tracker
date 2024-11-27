
import React, { useState, useEffect } from 'react';
import { useExpenseContext } from '../context/ExpenseContext';
import LineChart from '../charts/LineChart';
import PieChart from '../charts/PieChart';

const Dashboard = () => {
  const { expenses = [], filters = {}, setFilters } = useExpenseContext(); // Default filters to an empty object
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('amount'); // Default sort by amount
  const [sortOrder, setSortOrder] = useState('asc'); // Default to ascending order

  useEffect(() => {
    // Log the expenses and filters to check if they are being updated correctly
    console.log(expenses); 
    console.log(filters);
  }, [expenses, filters]);

  // Handle sorting of expenses
  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
    } else {
      setSortBy(criteria);
      setSortOrder('asc'); // Default to ascending when changing the criteria
    }
  };

  // Filter the expenses based on category, date range, payment method, and search term
  const filteredExpenses = expenses.filter((expense) => {
    if (!expense || !expense.category || !expense.date || !expense.amount) {
      console.warn('Invalid expense data:', expense);
      return false; // Skip invalid expense data
    }

    // Apply category filter
    const categoryFilter = filters.category || 'All';
    const paymentMethodFilter = filters.paymentMethod || 'All';
    const dateRangeFilter = filters.dateRange || { start: new Date('2000-01-01'), end: new Date() }; // Default to all time
    const expenseDate = new Date(expense.date);

    const matchesCategory = categoryFilter === 'All' || expense.category === categoryFilter;
    const matchesPaymentMethod = paymentMethodFilter === 'All' || expense.paymentMethod === paymentMethodFilter;
    const matchesDate =
      expenseDate >= new Date(dateRangeFilter.start) && expenseDate <= new Date(dateRangeFilter.end);
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesPaymentMethod && matchesDate && matchesSearch;
  });

  // Sort expenses based on selected criteria and order
  const sortedExpenses = filteredExpenses.sort((a, b) => {
    const compare = (field) => {
      if (typeof a[field] === 'string' && typeof b[field] === 'string') {
        return a[field].localeCompare(b[field]);
      } else if (typeof a[field] === 'number' && typeof b[field] === 'number') {
        return a[field] - b[field];
      }
      return 0;
    };

    const comparison = compare(sortBy);
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Prepare data for the charts (Line chart and Pie chart)
  const chartData = filteredExpenses.map((expense) => ({
    month: new Date(expense.date).toLocaleString('default', { month: 'long' }),
    amount: expense.amount,
    category: expense.category || 'Unknown',
  }));

  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filters (Category, Date Range, Payment Method) */}
      <div>
        <select
          value={filters.category || 'All'}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          {/* Add more categories */}
        </select>

        <select
          value={filters.paymentMethod || 'All'}
          onChange={(e) => setFilters({ ...filters, paymentMethod: e.target.value })}
        >
          <option value="All">All Payment Methods</option>
          <option value="Cash">Cash</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          {/* Add more payment methods */}
        </select>

        {/* Date Range Filter */}
        <input
          type="date"
          value={filters.dateRange?.start || ''}
          onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })}
        />
        <input
          type="date"
          value={filters.dateRange?.end || ''}
          onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })}
        />
      </div>

      {/* Sorting Options */}
      <div>
        <button onClick={() => handleSort('amount')}>Sort by Amount</button>
        <button onClick={() => handleSort('date')}>Sort by Date</button>
        <button onClick={() => handleSort('category')}>Sort by Category</button>
      </div>

      {/* Expense Charts */}
      <div>
        <LineChart data={chartData} />
        <PieChart data={chartData} />
      </div>

      {/* Render Filtered and Sorted Expenses */}
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Payment Method</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedExpenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.amount}</td>
              <td>{expense.date}</td>
              <td>{expense.category}</td>
              <td>{expense.description}</td>
              <td>{expense.paymentMethod}</td>
              <td>
                {/* Add your update or delete buttons here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

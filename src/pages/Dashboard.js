
import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useExpenseContext } from "../context/ExpenseContext";
import LineChartComponent from "../charts/LineChart";
import PieChart from "../charts/PieChart";

// Styled Components
const DashboardContainer = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const Filters = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  select, input {
    margin-left: 1rem;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    select, input {
      margin-left: 0;
      margin-bottom: 0.5rem;
    }
  }
`;

const SortButtons = styled.div`
  margin: 1rem 0;
  button {
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }

  @media (max-width: 768px) {
    button {
      margin-bottom: 1rem;
    }
  }
`;

const ChartsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  flex-wrap: wrap;

  > div {
    flex: 1;
    margin: 0 1rem;
    min-width: 300px;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    > div {
      margin-bottom: 1rem;
    }
  }
`;

const CategoryExpenses = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: #333;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      padding: 0.5rem 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      span {
        color: #555;
      }

      strong {
        display: inline-flex;
        align-items: center;
        color: #007bff;
      }

      .color-indicator {
        width: 12px;
        height: 12px;
        margin-right: 0.5rem;
        border-radius: 50%;
      }
    }
  }

  .total-expenses {
    margin-top: 1rem;
    font-weight: bold;
    font-size: 1.1rem;
    color: #007bff;
  }
`;

const Dashboard = () => {
  const { expenses } = useExpenseContext();
  const [filters, setFilters] = useState({ category: "All", paymentMethod: "All", startDate: "", endDate: "" });
  const [sortBy, setSortBy] = useState("amount");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  const filteredExpenses = expenses.filter((expense) => {
    const { category, paymentMethod, startDate, endDate } = filters;
    const matchesCategory = category === "All" || expense.category === category;
    const matchesPaymentMethod = paymentMethod === "All" || expense.paymentMethod === paymentMethod;
    const matchesDateRange = (!startDate || new Date(expense.date) >= new Date(startDate)) &&
                             (!endDate || new Date(expense.date) <= new Date(endDate));
    return matchesCategory && matchesPaymentMethod && matchesDateRange;
  });

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === "amount") {
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
    } else if (sortBy === "date") {
      return sortOrder === "asc" ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
    } else if (sortBy === "category") {
      return sortOrder === "asc" ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category);
    } else if (sortBy === "paymentMethod") {
      return sortOrder === "asc"
        ? a.paymentMethod.localeCompare(b.paymentMethod)
        : b.paymentMethod.localeCompare(a.paymentMethod);
    }
    return 0;
  });

  const monthlyData = sortedExpenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleString("default", { month: "short", year: "numeric" });
    const existingMonth = acc.find((item) => item.month === month);
    if (existingMonth) {
      existingMonth.amount += parseFloat(expense.amount);
    } else {
      acc.push({ month, amount: parseFloat(expense.amount) });
    }
    return acc;
  }, []);

  const lastThreeMonthsData = useMemo(() => {
    const currentMonth = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentMonth.getMonth() - 3);

    return monthlyData.filter((data) => {
      const monthDate = new Date(data.month);
      return monthDate >= threeMonthsAgo && monthDate <= currentMonth;
    });
  }, [monthlyData]);

  const aggregatedData = sortedExpenses.reduce((acc, expense) => {
    const amount = parseFloat(expense.amount);
    const existingCategory = acc.find((item) => item.category === expense.category);
    if (existingCategory) {
      existingCategory.amount += amount;
    } else {
      acc.push({ category: expense.category, amount });
    }
    return acc;
  }, []);

  const finalAggregatedData = aggregatedData.map((item) => ({ ...item, amount: Math.round(item.amount) }));
  const totalExpenses = finalAggregatedData.reduce((sum, item) => sum + item.amount, 0);

  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

  const categories = Array.from(new Set(expenses.map(expense => expense.category)));
  const paymentMethods = Array.from(new Set(expenses.map(expense => expense.paymentMethod)));

  categories.unshift("All Categories");
  paymentMethods.unshift("All Payment Methods");

  return (
    <DashboardContainer>
      <Header>
        <Filters>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={filters.paymentMethod}
            onChange={(e) => setFilters({ ...filters, paymentMethod: e.target.value })}
          >
            {paymentMethods.map((method) => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            placeholder="Start Date"
          />
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            placeholder="End Date"
          />
        </Filters>
      </Header>

      <SortButtons>
        <button onClick={() => handleSort("amount")}>Sort by Amount</button>
        <button onClick={() => handleSort("date")}>Sort by Date</button>
        <button onClick={() => handleSort("category")}>Sort by Category</button>
      </SortButtons>

      <ChartsContainer>
        <div>
          <LineChartComponent data={lastThreeMonthsData} />
        </div>
        <div>
          <PieChart data={finalAggregatedData} />
        </div>
      </ChartsContainer>

      <CategoryExpenses>
        <h3>Category-wise Expenses</h3>
        <ul>
          {finalAggregatedData.map((item, index) => (
            <li key={item.category}>
              {item.category}{" "}
              <strong>
                <span
                  className="color-indicator"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                Rs. {item.amount}
              </strong>
            </li>
          ))}
        </ul>
        <div className="total-expenses">
          Total Expenses: Rs. {totalExpenses}
        </div>
      </CategoryExpenses>
    </DashboardContainer>
  );
};

export default Dashboard;

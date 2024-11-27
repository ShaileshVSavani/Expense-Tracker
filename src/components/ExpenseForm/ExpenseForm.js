
import React, { useState, useContext } from "react";
import { FormContainer, Input, Button, Error } from "./ExpenseForm.styles";
import { useExpenseContext } from "../../context/ExpenseContext";


const ExpenseForm = () => {
  const { addExpense } = useExpenseContext(); // Correct usage of the custom hook

  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
    category: "",
    paymentMethod: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
      newErrors.amount = "Amount must be a positive number.";
    }
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.paymentMethod) newErrors.paymentMethod = "Payment Method is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addExpense({ ...formData, id: Date.now() });
    setFormData({ amount: "", description: "", date: "", category: "", paymentMethod: "" });
    setErrors({});
  };

  return (
    <FormContainer>
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <Input
          type="number"
          name="amount"
          value={formData.amount}
          placeholder="Amount"
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
        {errors.amount && <Error>{errors.amount}</Error>}

        <Input
          type="text"
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        {errors.description && <Error>{errors.description}</Error>}

        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        {errors.date && <Error>{errors.date}</Error>}

        <Input
          type="text"
          name="category"
          value={formData.category}
          placeholder="Category"
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
        {errors.category && <Error>{errors.category}</Error>}

        <Input
          type="text"
          name="paymentMethod"
          value={formData.paymentMethod}
          placeholder="Payment Method"
          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
        />
        {errors.paymentMethod && <Error>{errors.paymentMethod}</Error>}

        <Button type="submit">Add Expense</Button>
      </form>
    </FormContainer>
  );
};

export default ExpenseForm;


import React, { useContext, useState } from "react";
import { FilterContainer, FilterLabel, FilterInput, FilterSelect, Button } from "./Filters.styles";
import { ExpenseContext } from "../../context/ExpenseContext";

const Filters = () => {
  const { filters, setFilters } = useContext(ExpenseContext);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({ ...localFilters, [name]: value });
  };

  const handleApplyFilters = () => {
    setFilters(localFilters);
  };

  return (
    <FilterContainer>
      <FilterLabel>Category:</FilterLabel>
      <FilterInput
        type="text"
        name="category"
        value={localFilters.category}
        onChange={handleInputChange}
        placeholder="Enter category"
      />

      <FilterLabel>Date Range:</FilterLabel>
      <FilterInput
        type="date"
        name="startDate"
        value={localFilters.startDate}
        onChange={handleInputChange}
      />
      <FilterInput
        type="date"
        name="endDate"
        value={localFilters.endDate}
        onChange={handleInputChange}
      />

      <FilterLabel>Payment Method:</FilterLabel>
      <FilterSelect
        name="paymentMethod"
        value={localFilters.paymentMethod}
        onChange={handleInputChange}
      >
        <option value="">All</option>
        <option value="cash">Cash</option>
        <option value="credit">Credit</option>
      </FilterSelect>

      <Button onClick={handleApplyFilters}>Apply Filters</Button>
    </FilterContainer>
  );
};

export default Filters;

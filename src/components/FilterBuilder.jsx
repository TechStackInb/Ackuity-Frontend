import React, { useState } from "react";
// import Satori components and methods here

const FilterBuilder = ({ filters, onFiltersChange }) => {
  const handleAddFilter = () => {
    onFiltersChange([...filters, { field: "", operator: "", value: "" }]);
  };

  const handleRemoveFilter = (index) => {
    const newFilters = filters.filter((_, i) => i !== index);
    onFiltersChange(newFilters);
  };

  const handleFilterChange = (index, field, value) => {
    const newFilters = filters.map((filter, i) =>
      i === index ? { ...filter, [field]: value } : filter
    );
    onFiltersChange(newFilters);
  };

  return (
    <div className="filter-builder">
      {filters.map((filter, index) => (
        <div key={index} className="filter-row">
          <select
            value={filter.field}
            onChange={(e) => handleFilterChange(index, "field", e.target.value)}
          >
            <option value="">Select Field</option>
            <option value="document">Document</option>
            <option value="user">User</option>
            <option value="field">Field</option>
          </select>
          <select
            value={filter.operator}
            onChange={(e) =>
              handleFilterChange(index, "operator", e.target.value)
            }
          >
            <option value="">Select Operator</option>
            <option value="equals">Equals</option>
            <option value="contains">Contains</option>
            <option value="startsWith">Starts With</option>
          </select>
          <input
            type="text"
            value={filter.value}
            onChange={(e) => handleFilterChange(index, "value", e.target.value)}
          />
          <button onClick={() => handleRemoveFilter(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddFilter}>Add Filter</button>
    </div>
  );
};

export default FilterBuilder;

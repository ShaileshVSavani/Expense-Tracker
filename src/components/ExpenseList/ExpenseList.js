

// import React, { useState } from "react";
// import { Table } from "./ExpenseList.styles";
// import { useExpenseContext } from "../../context/ExpenseContext";  // Corrected import

// const ExpenseList = () => {
//   const { expenses, updateExpense, deleteExpense } = useExpenseContext(); // Using updateExpense
//   const [editingId, setEditingId] = useState(null);
//   const [editableData, setEditableData] = useState({});

//   const handleUpdateClick = (expense) => {
//     setEditingId(expense.id);
//     setEditableData(expense);
//   };

//   const handleSaveClick = () => {
//     updateExpense(editingId, editableData); // Use the updateExpense function to modify the existing expense
//     setEditingId(null); // Reset editing state after saving
//   };

//   const handleDeleteClick = (id) => {
//     deleteExpense(id); // Call deleteExpense when the delete button is clicked
//   };

//   return (
//     <Table>
//       <thead>
//         <tr>
//           <th>Amount</th>
//           <th>Description</th>
//           <th>Date</th>
//           <th>Category</th>
//           <th>Payment Method</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {expenses.map((expense) => (
//           <tr key={expense.id}>
//             {editingId === expense.id ? (
//               // In Edit Mode: Show Save Button
//               <>
//                 <td>
//                   <input
//                     type="number"
//                     value={editableData.amount}
//                     onChange={(e) => setEditableData({ ...editableData, amount: e.target.value })}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={editableData.description}
//                     onChange={(e) => setEditableData({ ...editableData, description: e.target.value })}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="date"
//                     value={editableData.date}
//                     onChange={(e) => setEditableData({ ...editableData, date: e.target.value })}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={editableData.category}
//                     onChange={(e) => setEditableData({ ...editableData, category: e.target.value })}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={editableData.paymentMethod}
//                     onChange={(e) => setEditableData({ ...editableData, paymentMethod: e.target.value })}
//                   />
//                 </td>
//                 <td>
//                   <button onClick={handleSaveClick}>Save</button> {/* Save button while editing */}
//                   <button onClick={() => setEditingId(null)}>Cancel</button>
//                 </td>
//               </>
//             ) : (
//               // In Normal Mode: Show Update and Delete Buttons
//               <>
//                 <td>{expense.amount}</td>
//                 <td>{expense.description}</td>
//                 <td>{expense.date}</td>
//                 <td>{expense.category}</td>
//                 <td>{expense.paymentMethod}</td>
//                 <td>
//                   <button onClick={() => handleUpdateClick(expense)}>Edit</button> {/* Edit button */}
//                   <button onClick={() => handleDeleteClick(expense.id)}>Delete</button> {/* Delete button */}
//                 </td>
//               </>
//             )}
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   );
// };

// export default ExpenseList;



import React, { useState } from "react";
import { Table } from "./ExpenseList.styles";
import { useExpenseContext } from "../../context/ExpenseContext";  // Corrected import

const ExpenseList = () => {
  const { expenses, updateExpense, deleteExpense } = useExpenseContext(); // Using updateExpense
  const [editingId, setEditingId] = useState(null);
  const [editableData, setEditableData] = useState({});
  const [sortBy, setSortBy] = useState("amount"); // Default sorting by amount
  const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order

  const handleUpdateClick = (expense) => {
    setEditingId(expense.id);
    setEditableData(expense);
  };

  const handleSaveClick = () => {
    updateExpense(editingId, editableData); // Use the updateExpense function to modify the existing expense
    setEditingId(null); // Reset editing state after saving
  };

  const handleDeleteClick = (id) => {
    deleteExpense(id); // Call deleteExpense when the delete button is clicked
  };

  const handleSort = (criteria) => {
    // Toggle sort order if the same criteria is selected again
    if (sortBy === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("asc"); // Default to ascending when switching criteria
    }
  };

  // Function to sort the expenses based on the selected criteria
  const sortedExpenses = [...expenses].sort((a, b) => {
    const compare = (field) => {
      if (typeof a[field] === "string" && typeof b[field] === "string") {
        return a[field].localeCompare(b[field]);
      } else if (typeof a[field] === "number" && typeof b[field] === "number") {
        return a[field] - b[field];
      }
      return 0;
    };

    const comparison = compare(sortBy);
    return sortOrder === "asc" ? comparison : -comparison;
  });

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th onClick={() => handleSort("amount")}>Amount {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}</th>
            <th onClick={() => handleSort("date")}>Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}</th>
            <th onClick={() => handleSort("category")}>Category {sortBy === "category" && (sortOrder === "asc" ? "↑" : "↓")}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedExpenses.map((expense) => (
            <tr key={expense.id}>
              {editingId === expense.id ? (
                <>
                  <td>
                    <input
                      type="number"
                      value={editableData.amount}
                      onChange={(e) => setEditableData({ ...editableData, amount: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={editableData.date}
                      onChange={(e) => setEditableData({ ...editableData, date: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editableData.category}
                      onChange={(e) => setEditableData({ ...editableData, category: e.target.value })}
                    />
                  </td>
                  <td>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{expense.amount}</td>
                  <td>{expense.date}</td>
                  <td>{expense.category}</td>
                  <td>
                    <button onClick={() => handleUpdateClick(expense)}>Edit</button>
                    <button onClick={() => handleDeleteClick(expense.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ExpenseList;

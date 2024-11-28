

// import React, { useState } from "react";
// import { useExpenseContext } from "../../context/ExpenseContext";
// import styled from "styled-components";

// // Styled Components
// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 1rem;
//   background-color: #f9f9f9;
// `;

// const TableContainer = styled.div`
//   overflow-x: auto;
//   max-width: 90%;
//   width: 800px;
// `;

// const StyledTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   background-color: white; /* White table background */
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
//   font-family: "Inter", sans-serif;

//   thead {
//     background-color: #d4d2ff; /* New soft purple header */
//     color: #333; /* Dark text for contrast */

//     th {
//       padding: 1rem;
//       text-align: center;
//       cursor: pointer;
//       user-select: none;

//       &:hover {
//         background-color: #b6b4f7; /* Slightly darker purple on hover */
//       }
//     }
//   }

//   tbody {
//     tr {
//       &:hover {
//         background-color: #f2f2f2; /* Light grey hover effect */
//       }
//     }

//     td {
//       padding: 0.75rem;
//       text-align: center;
//       border-bottom: 1px solid #ddd;
//     }
//   }
// `;

// const ActionButton = styled.button`
//   padding: 0.5rem 1rem;
//   margin: 0 0.25rem;
//   border: none;
//   border-radius: 4px;
//   font-size: 0.9rem;
//   font-weight: bold;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     opacity: 0.9;
//   }

//   ${({ variant }) => {
//     switch (variant) {
//       case "edit":
//         return `
//           background-color: #ffc107; /* Yellow for Edit */
//           color: black;
//         `;
//       case "delete":
//         return `
//           background-color: #f44336; /* Red for Delete */
//           color: white;
//         `;
//       case "save":
//         return `
//           background-color: #4caf50; /* Green for Save */
//           color: white;
//         `;
//       case "cancel":
//         return `
//           background-color: #9e9e9e; /* Grey for Cancel */
//           color: white;
//         `;
//       default:
//         return `
//           background-color: #4caf50;
//           color: white;
//         `;
//     }
//   }}
// `;

// const ExpenseList = () => {
//   const { expenses, updateExpense, deleteExpense } = useExpenseContext();
//   const [editingId, setEditingId] = useState(null);
//   const [editableData, setEditableData] = useState({});
//   const [sortBy, setSortBy] = useState("amount");
//   const [sortOrder, setSortOrder] = useState("asc");

//   const handleUpdateClick = (expense) => {
//     setEditingId(expense.id);
//     setEditableData(expense);
//   };

//   const handleSaveClick = () => {
//     updateExpense(editingId, editableData);
//     setEditingId(null);
//   };

//   const handleDeleteClick = (id) => {
//     deleteExpense(id);
//   };

//   const handleSort = (criteria) => {
//     if (sortBy === criteria) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(criteria);
//       setSortOrder("asc");
//     }
//   };

//   const sortedExpenses = [...expenses].sort((a, b) => {
//     const compare = (field) => {
//       if (typeof a[field] === "string" && typeof b[field] === "string") {
//         return a[field].localeCompare(b[field]);
//       } else if (typeof a[field] === "number" && typeof b[field] === "number") {
//         return a[field] - b[field];
//       }
//       return 0;
//     };

//     const comparison = compare(sortBy);
//     return sortOrder === "asc" ? comparison : -comparison;
//   });

//   return (
//     <Container>
//       <TableContainer>
//         <StyledTable>
//           <thead>
//             <tr>
//               <th onClick={() => handleSort("amount")}>
//                 Amount {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
//               </th>
//               <th onClick={() => handleSort("date")}>
//                 Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
//               </th>
//               <th onClick={() => handleSort("category")}>
//                 Category {sortBy === "category" && (sortOrder === "asc" ? "↑" : "↓")}
//               </th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedExpenses.map((expense) => (
//               <tr
//                 key={expense.id}
//                 style={{
//                   backgroundColor:
//                     editingId === expense.id ? "#e8f5e9" : "inherit",
//                 }}
//               >
//                 {editingId === expense.id ? (
//                   <>
//                     <td>
//                       <input
//                         type="number"
//                         value={editableData.amount}
//                         placeholder="Amount"
//                         onChange={(e) =>
//                           setEditableData({
//                             ...editableData,
//                             amount: e.target.value,
//                           })
//                         }
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="date"
//                         value={editableData.date}
//                         placeholder="Date"
//                         onChange={(e) =>
//                           setEditableData({
//                             ...editableData,
//                             date: e.target.value,
//                           })
//                         }
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="text"
//                         value={editableData.category}
//                         placeholder="Category"
//                         onChange={(e) =>
//                           setEditableData({
//                             ...editableData,
//                             category: e.target.value,
//                           })
//                         }
//                       />
//                     </td>
//                     <td>
//                       <ActionButton variant="save" onClick={handleSaveClick}>
//                         Save
//                       </ActionButton>
//                       <ActionButton
//                         variant="cancel"
//                         onClick={() => setEditingId(null)}
//                       >
//                         Cancel
//                       </ActionButton>
//                     </td>
//                   </>
//                 ) : (
//                   <>
//                     <td>{expense.amount}</td>
//                     <td>{expense.date}</td>
//                     <td>{expense.category}</td>
//                     <td>
//                       <ActionButton
//                         variant="edit"
//                         onClick={() => handleUpdateClick(expense)}
//                       >
//                         Edit
//                       </ActionButton>
//                       <ActionButton
//                         variant="delete"
//                         onClick={() => handleDeleteClick(expense.id)}
//                       >
//                         Delete
//                       </ActionButton>
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </StyledTable>
//       </TableContainer>
//     </Container>
//   );
// };

// export default ExpenseList;


// import React, { useState } from "react";
// import { useExpenseContext } from "../../context/ExpenseContext";
// import styled from "styled-components";

// // Styled Components
// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 1rem;
//   background-color: #f9f9f9;
// `;

// const TableContainer = styled.div`
//   overflow-x: auto;
//   max-width: 90%;
//   width: 800px;
// `;

// const StyledTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   background-color: white; /* White table background */
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
//   font-family: "Inter", sans-serif;

//   thead {
//     background-color: #d4d2ff; /* New soft purple header */
//     color: #333; /* Dark text for contrast */

//     th {
//       padding: 1rem;
//       text-align: center;
//       cursor: pointer;
//       user-select: none;

//       &:hover {
//         background-color: #b6b4f7; /* Slightly darker purple on hover */
//       }
//     }
//   }

//   tbody {
//     tr {
//       &:hover {
//         background-color: #f2f2f2; /* Light grey hover effect */
//       }
//     }

//     td {
//       padding: 0.75rem;
//       text-align: center;
//       border-bottom: 1px solid #ddd;
//     }
//   }
// `;

// const ActionButton = styled.button`
//   padding: 0.5rem 1rem;
//   margin: 0 0.25rem;
//   border: none;
//   border-radius: 4px;
//   font-size: 0.9rem;
//   font-weight: bold;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     opacity: 0.9;
//   }

//   ${({ variant }) => {
//     switch (variant) {
//       case "edit":
//         return `background-color: #ffc107; /* Yellow for Edit */`;
//       case "delete":
//         return `background-color: #f44336; /* Red for Delete */`;
//       case "save":
//         return `background-color: #4caf50; /* Green for Save */`;
//       case "cancel":
//         return `background-color: #9e9e9e; /* Grey for Cancel */`;
//       default:
//         return `background-color: #4caf50; color: white;`;
//     }
//   }}
// `;

// const ExpenseList = () => {
//   const { expenses, updateExpense, deleteExpense } = useExpenseContext();
//   const [editingId, setEditingId] = useState(null);
//   const [editableData, setEditableData] = useState({});
//   const [sortBy, setSortBy] = useState("amount");
//   const [sortOrder, setSortOrder] = useState("asc");

//   const handleUpdateClick = (expense) => {
//     setEditingId(expense.id);
//     setEditableData(expense);
//   };

//   const handleSaveClick = () => {
//     updateExpense(editingId, editableData);
//     setEditingId(null);
//   };

//   const handleDeleteClick = (id) => {
//     deleteExpense(id);
//   };

//   const handleSort = (criteria) => {
//     if (sortBy === criteria) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(criteria);
//       setSortOrder("asc");
//     }
//   };

//   const sortedExpenses = [...expenses].sort((a, b) => {
//     const compare = (field) => {
//       if (typeof a[field] === "string" && typeof b[field] === "string") {
//         return a[field].localeCompare(b[field]);
//       } else if (typeof a[field] === "number" && typeof b[field] === "number") {
//         return a[field] - b[field];
//       }
//       return 0;
//     };

//     const comparison = compare(sortBy);
//     return sortOrder === "asc" ? comparison : -comparison;
//   });

//   return (
//     <Container>
//       <TableContainer>
//         <StyledTable>
//           <thead>
//             <tr>
//               <th onClick={() => handleSort("amount")}>
//                 Amount {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
//               </th>
//               <th onClick={() => handleSort("date")}>
//                 Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
//               </th>
//               <th onClick={() => handleSort("category")}>
//                 Category {sortBy === "category" && (sortOrder === "asc" ? "↑" : "↓")}
//               </th>
//               {/* <th onClick={() => handleSort("description")}>
//                 Description {sortBy === "description" && (sortOrder === "asc" ? "↑" : "↓")}
//               </th> */}
//               <th onClick={() => handleSort("paymentMethod")}>
//                 Payment Method {sortBy === "paymentMethod" && (sortOrder === "asc" ? "↑" : "↓")}
//               </th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedExpenses.map((expense) => (
//               <tr
//                 key={expense.id}
//                 style={{
//                   backgroundColor:
//                     editingId === expense.id ? "#e8f5e9" : "inherit",
//                 }}
//               >
//                 {editingId === expense.id ? (
//                   <>
//                     <td>
//                       <input
//                         type="number"
//                         value={editableData.amount}
//                         placeholder="Amount"
//                         onChange={(e) =>
//                           setEditableData({
//                             ...editableData,
//                             amount: e.target.value,
//                           })
//                         }
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="date"
//                         value={editableData.date}
//                         placeholder="Date"
//                         onChange={(e) =>
//                           setEditableData({
//                             ...editableData,
//                             date: e.target.value,
//                           })
//                         }
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="text"
//                         value={editableData.category}
//                         placeholder="Category"
//                         onChange={(e) =>
//                           setEditableData({
//                             ...editableData,
//                             category: e.target.value,
//                           })
//                         }
//                       />
//                     </td>
//                     {/* <td>
//                       <input
//                         type="text"
//                         value={editableData.description}
//                         placeholder="Description"
//                         onChange={(e) =>
//                           setEditableData({
//                             ...editableData,
//                             description: e.target.value,
//                           })
//                         }
//                       />
//                     </td> */}
//                     <td>
//                       <input
//                         type="text"
//                         value={editableData.paymentMethod}
//                         placeholder="Payment Method"
//                         onChange={(e) =>
//                           setEditableData({
//                             ...editableData,
//                             paymentMethod: e.target.value,
//                           })
//                         }
//                       />
//                     </td>
//                     <td>
//                       <ActionButton variant="save" onClick={handleSaveClick}>
//                         Save
//                       </ActionButton>
//                       <ActionButton
//                         variant="cancel"
//                         onClick={() => setEditingId(null)}
//                       >
//                         Cancel
//                       </ActionButton>
//                     </td>
//                   </>
//                 ) : (
//                   <>
//                     <td>{expense.amount}</td>
//                     <td>{expense.date}</td>
//                     <td>{expense.category}</td>
//                     {/* <td>{expense.description}</td> */}
//                     <td>{expense.paymentMethod}</td>
//                     <td>
//                       <ActionButton
//                         variant="edit"
//                         onClick={() => handleUpdateClick(expense)}
//                       >
//                         Edit
//                       </ActionButton>
//                       <ActionButton
//                         variant="delete"
//                         onClick={() => handleDeleteClick(expense.id)}
//                       >
//                         Delete
//                       </ActionButton>
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </StyledTable>
//       </TableContainer>
//     </Container>
//   );
// };

// export default ExpenseList;




import React, { useState } from "react";
import { useExpenseContext } from "../../context/ExpenseContext";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-family: "Inter", sans-serif;

  thead {
    background-color: #d4d2ff;
    color: #333;

    th {
      padding: 1rem;
      text-align: center;
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: #b6b4f7;
      }
    }
  }

  tbody {
    tr {
      &:hover {
        background-color: #f2f2f2;
      }
    }

    td {
      padding: 0.75rem;
      text-align: center;
      border-bottom: 1px solid #ddd;
    }
  }

  @media (max-width: 1024px) {
    th, td {
      padding: 0.75rem;
    }
  }

  @media (max-width: 768px) {
    th, td {
      padding: 0.5rem;
      font-size: 0.85rem;
    }
  }

  @media (max-width: 480px) {
    th, td {
      padding: 0.25rem;
      font-size: 0.75rem;
    }
  }
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }

  ${({ variant }) => {
    switch (variant) {
      case "edit":
        return `
          background-color: #007bff; 
          color: white;
          &:hover {
            background-color: #0056b3; 
          }
        `;
      case "delete":
        return `
          background-color: #ff5722;
          color: white;
          &:hover {
            background-color: #e64a19; 
          }
        `;
      case "save":
        return `
          background-color: #4caf50; 
          color: white;
          &:hover {
            background-color: #388e3c; 
          }
        `;
      case "cancel":
        return `
          background-color: #9e9e9e; 
          color: white;
          &:hover {
            background-color: #616161; 
          }
        `;
      default:
        return `
          background-color: #4caf50;
          color: white;
          &:hover {
            background-color: #388e3c;
          }
        `;
    }
  }}

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.5rem;
    margin: 0.25rem 0;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.5rem 0.75rem;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.5rem;
  }
`;

const ExpenseList = () => {
  const { expenses, updateExpense, deleteExpense } = useExpenseContext();
  const [editingId, setEditingId] = useState(null);
  const [editableData, setEditableData] = useState({});
  const [sortBy, setSortBy] = useState("amount");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleUpdateClick = (expense) => {
    setEditingId(expense.id);
    setEditableData(expense);
  };

  const handleSaveClick = () => {
    updateExpense(editingId, editableData);
    setEditingId(null);
  };

  const handleDeleteClick = (id) => {
    deleteExpense(id);
  };

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

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
    <Container>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <th onClick={() => handleSort("amount")}>
                Amount {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("date")}>
                Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("category")}>
                Category {sortBy === "category" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("paymentMethod")}>
                Payment Method {sortBy === "paymentMethod" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedExpenses.map((expense) => (
              <tr
                key={expense.id}
                style={{
                  backgroundColor: editingId === expense.id ? "#e8f5e9" : "inherit",
                }}
              >
                {editingId === expense.id ? (
                  <>
                    <td>
                      <Input
                        type="number"
                        value={editableData.amount}
                        placeholder="Amount"
                        onChange={(e) =>
                          setEditableData({
                            ...editableData,
                            amount: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <Input
                        type="date"
                        value={editableData.date}
                        placeholder="Date"
                        onChange={(e) =>
                          setEditableData({
                            ...editableData,
                            date: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <Input
                        type="text"
                        value={editableData.category}
                        placeholder="Category"
                        onChange={(e) =>
                          setEditableData({
                            ...editableData,
                            category: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <Input
                        type="text"
                        value={editableData.paymentMethod}
                        placeholder="Payment Method"
                        onChange={(e) =>
                          setEditableData({
                            ...editableData,
                            paymentMethod: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <ActionButton variant="save" onClick={handleSaveClick}>
                        Save
                      </ActionButton>
                      <ActionButton
                        variant="cancel"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </ActionButton>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{expense.amount}</td>
                    <td>{expense.date}</td>
                    <td>{expense.category}</td>
                    <td>{expense.paymentMethod}</td>
                    <td>
                      <ActionButton
                        variant="edit"
                        onClick={() => handleUpdateClick(expense)}
                      >
                        Edit
                      </ActionButton>
                      <ActionButton
                        variant="delete"
                        onClick={() => handleDeleteClick(expense.id)}
                      >
                        Delete
                      </ActionButton>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </Container>
  );
};

export default ExpenseList;

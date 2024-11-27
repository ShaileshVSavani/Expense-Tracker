import styled from "styled-components";

// export const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;

//   th, td {
//     padding: 10px;
//     border: 1px solid #ddd;
//     text-align: left;
//   }

//   th {
//     background-color: ${({ theme }) => theme.primary};
//     color: white;
//   }
// `;





export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const PaginationButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.accent};
  }
`;



export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }
`;

export const Button = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
`;

export const SaveButton = styled(Button)`
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`;

export const UpdateButton = styled(Button)`
  background-color: #ff9800;
  color: white;
  &:hover {
    background-color: #e68900;
  }
`;

export const DeleteButton = styled(Button)`
  background-color: #f44336;
  color: white;
  &:hover {
    background-color: #e53935;
  }
`;

export const CancelButton = styled(Button)`
  background-color: #9e9e9e;
  color: white;
  &:hover {
    background-color: #757575;
  }
`;

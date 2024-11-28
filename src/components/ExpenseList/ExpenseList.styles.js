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




export const FormContainer = styled.div`
  padding: 20px;
  background: #fdfdfd;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 20px auto;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Select = styled.select`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
`;

export const Button = styled.button`
  background-color: #d4d2ff;
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background-color: #b6b4f7;
  }
`;

export const Error = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-bottom: 10px;
`;

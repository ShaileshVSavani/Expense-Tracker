import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
`;

export const FilterLabel = styled.label`
  font-weight: bold;
`;

export const FilterInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const FilterSelect = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.accent};
  }
`;

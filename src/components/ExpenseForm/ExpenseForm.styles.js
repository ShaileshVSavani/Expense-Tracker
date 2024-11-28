
import styled from "styled-components";

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

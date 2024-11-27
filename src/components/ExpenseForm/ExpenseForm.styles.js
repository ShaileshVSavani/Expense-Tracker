import styled from "styled-components";

export const FormContainer = styled.div`
  padding: 20px;
  background: white;
  border-radius: 10px;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.accent};
  }
`;



// import styled from "styled-components";
export const Error = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-bottom: 10px;
`;

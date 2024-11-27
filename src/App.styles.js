import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.primary};
  }
`;

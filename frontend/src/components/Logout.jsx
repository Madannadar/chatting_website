import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Button onClick={handleClick}>
      Logout
    </Button>
  );
};

export default Logout;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7b66d8;
  }
`;

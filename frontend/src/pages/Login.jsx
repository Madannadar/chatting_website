import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }

  useEffect( () => {
    if(localStorage.getItem('chat-app')) {
      navigate('/chat');
    }
  })

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (handelValidation()) {
      try {
        const { username, password } = values;
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });

        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }

        if (data.status === true) {
          localStorage.setItem('chat-app', JSON.stringify(data.user));
          toast.success("User registered successfully", toastOptions);
          navigate('/chat');
          setValues({
            username: '',
            password: '',
          });

        }
      } catch (err) {
        console.error("Registration Error:", err);
        toast.error("Something went wrong. Please try again.", toastOptions);
      }
    }
  };

  const handelValidation = () => {
    const { username, password } = values;

    if (!username.trim()) {
      toast.error("Username is required", toastOptions);
      return false;
    }

    if (password.length  === "") {
      toast.error("Password is required", toastOptions);
      return false;
    }
    return true;
  };


  const handelChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(values);
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handelSubmit(e)}>
          <div className='brand'>
            <img src={Logo} alt="Logo" />
            <h1>snappy</h1>
          </div>
          <input type="text" placeholder='Username' name='username' onChange={(e) => handelChange(e)} />
          <input type="password" placeholder='password' name='password' onChange={(e) => handelChange(e)} /> 
          <button type='submit'>Login User</button>
          <span>Do not have an account? <a href="/register">Register</a></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
      transition: 0.5s ease-in-out;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login

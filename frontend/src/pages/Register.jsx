import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';

const Register = () => {
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

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (handelValidation()) {
      try {
        const { username, email, password } = values;
        const { data } = await axios.post(registerRoute, {
          username,
          email,
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
            email: '',
            password: '',
            confirmPassword: ''
          });

        }
      } catch (err) {
        console.error("Registration Error:", err);
        toast.error("Something went wrong. Please try again.", toastOptions);
      }
    }
  };

  const handelValidation = () => {
    const { username, email, password, confirmPassword } = values;

    if (!username.trim()) {
      toast.error("Username is required", toastOptions);
      return false;
    }

    if (!email.trim()) {
      toast.error("Email is required", toastOptions);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address", toastOptions);
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters", toastOptions);
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", toastOptions);
      return false;
    }

    return true;
  };


  const handelChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
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
          <input type="email" placeholder='email' name='email' onChange={(e) => handelChange(e)} />
          <input type="password" placeholder='password' name='password' onChange={(e) => handelChange(e)} />
          <input type="password" placeholder='confirmPassword' name='confirmPassword' onChange={(e) => handelChange(e)} />
          <button type='submit'>Create User</button>
          <span>Already have an account? <a href="/login">Login</a></span>
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

export default Register

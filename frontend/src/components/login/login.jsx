import React, {useState} from 'react';
import './login.css';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import { useNavigate } from "react-router-dom"

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const navigate = useNavigate();
  const clientID = "676326473337-mvbo28pev3oo9gc5jn7p2ffmfcjptdt3.apps.googleusercontent.com";
  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const handleInput = (event) => {
    setData({...data, [event.target.name]: event.target.value});
  }
  function handleSubmit(event){
    event.preventDefault();
    if(action === "Login"){
      axios.post('https://emotorad-0edi.onrender.com/login', {email: data.email, password: data.password})
        .then(res => {
          console.log(res.data);
          navigate("/dashboard");
        })
        .catch(err => {
          if(err.response){
            if(err.response.status === 400){
              alert("User not found!");
            } else if(err.response.status === 401){
              alert("Incorrect Password!");
            } else{
              alert("Login failed. please try again!");
            }
          }
        });
    }
    else{
      axios.post('https://emotorad-0edi.onrender.com/register', {email: data.email, password: data.password, username: data.username})
        .then(res => {
          console.log(res.data);
          alert("Registration Successful!");
          setData({ username: "", email: "", password: "" });
          setAction("Login");
        })
        .catch(err => {
          if(err.response){
            if(err.response.status === 400){
              alert("User already exists!");
            } else if(err.response.status === 401){
              alert("All fields are required!");
            } else{
              alert("Registration failed. please try again!");
            }
          }
        });
    }
  }
  const handleSuccess = (credentialResponse) => {
    console.log("Sign in Successful!", credentialResponse);
    navigate("/dashboard");
  }
  const handlError = () => {
    console.log("Login Error!");
  }
  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          {action === "Login"? <div></div>:<div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder='Username' onChange={handleInput} name='username' value={data.username}/>
            </div>}
            <div className="input">
              <img src={email_icon} alt="" />
              <input type="email" placeholder='Email ID' onChange={handleInput} name='email' value={data.email}/>
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input type="password" placeholder='Password' onChange={handleInput} name='password' value={data.password}/>
            </div>
        </div>
        <div className="action-submit">
          <button type='submit' className='submit-button'>Submit</button>
        </div>
      <div className="googleButton">
        <GoogleOAuthProvider clientId={clientID}>
          <GoogleLogin onSuccess={handleSuccess} onError={handlError}/>
        </GoogleOAuthProvider>
      </div>
      <div className="submit-container">
        <div className={action === "Login"? "submit gray" : "submit"} onClick={() =>{setAction("Register")}}>Register</div>
        <div className={action === "Register"?"submit gray":"submit"} onClick={() => {setAction("Login")}}>Login</div>
      </div>
      </form>
    </div>
  )
}

export default LoginSignup;

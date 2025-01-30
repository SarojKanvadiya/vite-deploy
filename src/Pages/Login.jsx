import React from 'react'
import { useState } from 'react'
import { baseUrl } from '../component/baseurl';
import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null)
  const {login} = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
       const response = await axios.post(`${baseUrl}/login`,{
        username,password
       })
      // const response = await axios({
      //   method: "POST",
      //   url: `${baseUrl}/login`,
      //   data: {
      //     username, password
      //   }
      // })
      if (response.data.success) {
        console.log(response.data.token, "response");
        const {token} = response.data;
        login(token)
        // setToken(token);
      }
    } catch (err) {
      console.log(err)
      setError(err.response.data.message)
    }
  }
  return (
    <div className='form-container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="usename">Username: </label>
        <input type="text" placeholder='Enter Name' value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password: </label>
        <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default Login

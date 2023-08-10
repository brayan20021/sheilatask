import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setToken } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    let userData; // Variable para almacenar los datos del usuario

    try {
      const response = await axios.post('http://localhost:4000/signin', {
        username,
        password
      });

      if (response.data.success) {
        // Inicio de sesión exitoso
        setMessage('Inicio de sesión exitoso');
        setToken(response.data.token);
        const token = response.data.token;
        const userData = response.data.userData // Store only the user's name and ID
        setUser(userData)

        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(userData)); // Store user data in localStorage

        // Update user state here
        navigate('/dashboard')
        window.location.reload()


      } else {
        // Login failed
        setMessage(response.data.message);
      }
    } catch (error) {
      // Request failed
      setMessage('Error en la solicitud');
      console.log(error);
    }

    setUser(userData);
  };



  return (

    <div id="auth">
      <div className="row h-100">
        <div className="col-lg-5 col-12">
          <div id="auth-left">
            <h1 className="auth-title">Log in.</h1> <br />
            <form onSubmit={loginUser}>
              <div className="form-group position-relative has-icon-left mb-4">
                <input
                  type="text"
                  name="username"
                  className="form-control form-control-xl"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="form-control-icon">
                  <i className="bi bi-person"></i>
                </div>
              </div>
              <div className="form-group position-relative has-icon-left mb-4">
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-xl"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="form-control-icon">
                  <i className="bi bi-shield-lock"></i>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg shadow-lg mt-5">
                Log in
              </button>
            </form>
            <div className="text-center mt-5 text-lg fs-4">
              <p className="text-gray-600">
                Don't have an account? <a href="auth-register.html" className="font-bold">Sign up</a>.
              </p>
              <p>
                <a className="font-bold" href="auth-forgot-password.html">
                  {message && <p>{message}</p>}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-7 d-none d-lg-block">
          <div id="auth-right"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;

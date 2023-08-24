import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthContext";
import { UserContext } from "../../UserContext";
import { logots } from "../../assets";

import config from '../../config';
const server_backend = config.API_URL;


const SignUp = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("")
    const { setToken } = useContext(AuthContext);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const Register = async (e) => {
        e.preventDefault();
       

        try {
            const response = await axios.post(`${server_backend}/signup`, {
                username,
                password,
                fullname,
                email
            });

           
            
            if (response.data.confirmationData === 1048) {
                Swal.fire({
                    icon: "success",
                    title: "Te has registrado, excelente!",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    setToken(response.data.token);
                    const token = response.data.token;
                    const userData = response.data.userData // Store only the user's name and ID
                    setUser(userData)

                    localStorage.setItem('token', token);
                    localStorage.setItem('userData', JSON.stringify(userData)); // Store user data in localStorage

                    // Update user state here
                    navigate('/dashboard')
                    window.location.reload()
                });

            } else {
               
                Swal.fire({
                    icon: "error",
                    title: "El usuario existe o caracteres incorrectos",
                    showConfirmButton: false,
                    timer: 1500,
                })
                
            }

        } catch (error) {
           
        }

    }

    return (

        <div id="auth">
            <div className="row h-100">
                <div className="col-lg-5 col-12">
                    <div id="auth-left">
                        <h1 className="auth-title">Registro  <img src={logots} style={{width: "20%"}}/></h1>
                       
                        <form onSubmit={Register}>
                            <div className="form-group position-relative has-icon-left mb-4">
                                <input
                                    type="text"
                                    name="fullname"
                                    className="form-control form-control-xl"
                                    placeholder="fullname"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    required/>
                                <div className="form-control-icon">
                                    <i className="bi bi-person"></i>
                                </div>
                            </div>

                            <div className="form-group position-relative has-icon-left mb-4">
                                <input
                                    type="text"
                                    name="email"
                                    className="form-control form-control-xl"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required/>
                                <div className="form-control-icon">
                                    <i className="bi bi-person"></i>
                                </div>
                            </div>

                            <div className="form-group position-relative has-icon-left mb-4">
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control form-control-xl"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required/>
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
                                    required/>
                                <div className="form-control-icon">
                                    <i className="bi bi-shield-lock"></i>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block btn-lg shadow-lg mt-5">
                                Registrarse
                            </button>
                        </form>
                        <div className="text-center mt-5 text-lg fs-4">
                            <p className='text-gray-600'>Tienes una cuenta? <Link to="signin" className="font-bold">Log in</Link>.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7 d-none d-lg-block">
                    <div id="auth-right">

                    </div>
                </div>
            </div>
        </div>

    )
}

export default SignUp 
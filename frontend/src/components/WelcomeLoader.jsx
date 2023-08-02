import React from "react";
import { logo } from "../assets";
import { loader } from "../assets";


const WelcomeLoader = ({ user }) => {

  const username = JSON.parse(user)
  console.log(username)
  return (

    <section className="loader-container d-flex justify-content-center align-items-center vh-100">
      <div className={`col-12 loader ? "show" : ""}`}>
        <img src={logo} alt="Sheila Note" style={{ width: "80%" }} /><br /><br /><br /><br />
        <center>
          <h1 className="slide-up">Bienvenido, {username.fullname}</h1>
          <img src={loader} style={{ width: "50px" }} />
        </center>
      </div>
    </section>

  )
}

export default WelcomeLoader
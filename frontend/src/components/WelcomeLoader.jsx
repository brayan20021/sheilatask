import React from "react";
import { loadervideo } from "../assets";


const WelcomeLoader = () => {



    return (

        <section class="section d-flex justify-content-center align-items-center vh-100">
            <video src={loadervideo} class="me-4" style={{ width: "12rem" }} />
        </section>

    )
}

export default WelcomeLoader
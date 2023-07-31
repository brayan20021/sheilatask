import React from "react";
import { loader } from "../assets";


const Spinner = () => {



    return (

        <section class="section d-flex justify-content-center align-items-center vh-100">
            <img src={loader} class="me-4" style={{ width: "12rem" }} />
        </section>

    )
}

export default Spinner
import React from "react"

import { note_blue, note_pink, note_puple, note_red } from "../assets";
import axios from "axios";
import config from "../config";

const server_backend = config.API_URL

const Themes = ({ user }) => {

    const userData = JSON.parse(user);
    const idUser = userData.id;

    const changeTheme = (themecode) => {

        try {

            const response = axios.post(`${server_backend}/update-theme`, {
                idUser,
                themecode
            })

            console.log(response.data)

        } catch (error) {

        }
    }

    return (

        <div className="row fadeIn">
            <div className="col-12">
                <div className="card-header transparent">
                    <center><h4 className='custom-text-shadow text-white'>¿Que tipo de diseño de gustaria tener en tu nota?</h4></center>
                    <div className='row'>
                        <div className="col-6">
                            <div className="card dashboard-lastn">
                                <div className="form-check">
                                    <label htmlFor="flexRadioDefault1">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={() => {
                                            changeTheme("#190c5c")
                                        }} />
                                        <div className="card-body">
                                            <img src={note_blue} style={{ width: "350px", height: "180px" }} />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="card dashboard-lastn">
                                <div className="form-check">
                                    <label htmlFor="flexRadioDefault2">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={() => {
                                            changeTheme("rgb(116 0 145)")
                                        }} />
                                        <div className="card-body">
                                            <img src={note_puple} style={{ width: "350px", height: "180px" }} />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="card dashboard-lastn">
                                <div className="form-check">
                                    <label htmlFor="flexRadioDefault3">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" onClick={() => {
                                            changeTheme("rgb(130 0 0)")
                                        }} />
                                        <div className="card-body">
                                            <img src={note_red} style={{ width: "350px", height: "180px" }} />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="card dashboard-lastn">
                                <div className="form-check">
                                    <label htmlFor="flexRadioDefault4">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" onClick={() => {
                                            changeTheme("rgb(169 0 151)")
                                        }} />
                                        <div className="card-body">
                                            <img src={note_pink} style={{ width: "350px", height: "180px" }} />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Themes;
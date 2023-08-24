import React from "react"

import { note_blue, note_pink, note_puple, note_red } from "../assets";

const Themes = () => {

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
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
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
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
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
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
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
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
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
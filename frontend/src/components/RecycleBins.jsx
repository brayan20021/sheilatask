import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

const server_backend = config.API_URL;

const RecycleBins = ({ user }) => {

    const [deleted_notes, setDeleted_notes] = useState([]);
    const userData = JSON.parse(user);
    const idUser = userData.id;


    useEffect(() => {

        const fetchSignature = async () => {
            try {
                const response = await axios.post(`${server_backend}/deleted-notes`, { idUser });
                setDeleted_notes(response.data);
                console.log(response.data)
            } catch (error) {
                console.log('Lo sentimos, ha ocurrido un error en la solicitud');
            }
        };

        fetchSignature();
    }, [idUser]);

    return (

        <div className="container p-4">
            <div className="row">
                <div className="col-12 col-md-6 order-md-2 order-first">
                </div>
            </div>
            <section className="section">
                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <center> <h1>Notas eliminadas</h1></center>
                            <div className="card-header">
                            </div>
                            <div className="card-content">

                                <div className="table-responsive">
                                    <table className="table table-striped mb-0">
                                        <thead>
                                            <tr>
                                                <th>NOMBRE</th>
                                                <th>Descripcion</th>
                                                <th>FECHA</th>
                                                <th>ACCION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {deleted_notes.map((d_notes) => (

                                                <tr>
                                                    <td>{d_notes.title}</td>
                                                    <td className="deleted_note">{d_notes.description}</td>
                                                    <td>{d_notes.created_at}</td>
                                                    <td><button className="btn btn-primary">Recuperar</button></td>
                                                </tr>

                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )


}


export default RecycleBins;
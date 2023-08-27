import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";

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
            } catch (error) {
                console.log('Lo sentimos, ha ocurrido un error en la solicitud');
            }
        };

        fetchSignature();
    }, [idUser]);

    const restore = async (idNote) => {

        try {

            const confirmResult = await Swal.fire({
                title: '¿Estás seguro de que deseas rescuperarlo?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, recuperar',
                cancelButtonText: 'Cancelar',
            })
            if (confirmResult.isConfirmed) {


                const response = await axios.post(`${server_backend}/restore-note`, {
                    idNote
                }).then(

                    Swal.fire({
                        title: 'Nota recuperada correctamente',
                        icon: 'success',
                    })
                );
            }

            setDeleted_notes((notes) => notes.filter((note) => note.id !== idNote))

        } catch (error) {
            console.log(error);
        }
    }

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
                                                    <td><button className="btn btn-primary" onClick={() => {
                                                        restore(d_notes.id)
                                                    }}>Recuperar</button></td>
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
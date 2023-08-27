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
                title: 'La nota se va a restaurar ¿desea continuar?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, recuperar',
                cancelButtonText: 'Cancelar',
            });

            if (confirmResult.isConfirmed) {
                const response = await axios.post(`${server_backend}/restore-note`, { idNote });

                if (response.data === 1048) {
                    Swal.fire({
                        title: 'Nota recuperada correctamente',
                        icon: 'success',
                    });

                    setDeleted_notes((notes) => notes.filter((note) => note.id !== idNote));
                } else {
                    Swal.fire({
                        title: 'No se ha podido recuperar, si persiste contacte con el administrador del sistema',
                        icon: 'error'
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Ha ocurrido un error, por favor intente de nuevo más tarde',
                icon: 'error'
            });
        }
    };

    const removed_all = async () => {
        try {
            const confirmResult = await Swal.fire({
                title: 'Esta seguro que deseas eliminar todo, esta accion no se puede deshacer',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar todo',
                cancelButtonText: 'Cancelar',
            });

            if (confirmResult.isConfirmed) {
                const response = await axios.post(`${server_backend}/empty-trash`, {
                    idUser
                });
                console.log(response.data)

                if (response.data === 1048) {
                    Swal.fire({
                        title: "Las notas han sido eliminadas completamente",
                        icon: "success"
                    });
                    setDeleted_notes([])
                } else {
                    Swal.fire({
                        title: 'Ha ocurrido un error, por favor intente de nuevo más tarde',
                        icon: 'error'
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Ha ocurrido un error, por favor intente de nuevo más tarde',
                icon: 'error'
            });
        }
    };



    return (

        /*  <div className="d-flex justify-content-end">
         <button className="btn btn-danger" onClick={() => {
             removed_all()
         }}>Vaciar papelera</button>
     </div> */

        <section className="section">

            <div class="row" id="basic-table">
                <div class="col-12 col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <center><h4 class="card-title">Papelera de reciclaje</h4></center>
                        </div>
                        <div class="card-content">

                            <div class="card-body">
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-danger" onClick={() => {
                                        removed_all()
                                    }}>Vaciar papelera</button>
                                </div>
                                <br />
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
            </div>
        </section>
    )


}


export default RecycleBins;
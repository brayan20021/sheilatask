import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";


const AddSignatureNote = ({setSignature, idsignature, user, setAddsignote }) => {

    const idUser = user
    const [title, setTitle] = useState([0]);
    const [description, setDescription] = useState([0]);


    const addSignature_note = async (e) => {
        e.preventDefault();

        try {

            if (title.trim() === "" || description.trim() === "") {
                Swal.fire({
                    icon: "warning",
                    title: "Los datos no pueden ir vacios",
                    showConfirmButton: false,
                    timer: 1500,
                })
            }

            const response = await axios.post('http://localhost:4000/add-signature-note', {
                idUser,
                title,
                description,
                idsignature
            });
            
            if (response.data[1] === 1048) {

                Swal.fire({
                    icon: "success",
                    title: "Se ha modificado la nota exitosamente",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    setAddsignote(false)
                    setSignature((signature) => signature.concat(response.data[0]))

                });

            } else {
                Swal.fire({
                    icon: "error",
                    title: "Ha ocurrido un error en el sistema, por favor contacte con el administrador del sistema",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    //navigate("/notes");
                });
            }

        } catch (error) {

            console.log("Ha ocurrido un error, por favor contacte con el administrador del sistema")

        }
    }

    return (
        <form onSubmit={addSignature_note}>
            <table className="table table-bordered mb-0">
                <thead>
                    <tr>
                        <th className="text-wrap text-break">
                            <input
                                className="form-control"
                                type="text"
                                name="title"
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Titulo"
                            />

                        </th>
                        <th className="col-1">
                            <button
                                type="submit"
                                className="btn btn-success">
                                <div className="icon dripicons-document-edit">
                                    <span>Guardar</span>
                                </div>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody style={{ height: '300px' }}>
                    <tr className="text-wrap text-break">
                        <td className="text-bold-500"><textarea
                            style={{ height: '300px' }}
                            className="form-control"
                            type="text"
                            name="description"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Escribe la nueva nota aqui">
                        </textarea></td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
    
}

export default AddSignatureNote;
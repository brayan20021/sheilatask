import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import config from '../../config';
const server_backend = config.API_URL;

const EditSignature = ({ idSnote, setEditSignature, setSignaturetext, idUser}) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [task, setTask] = useState('')


    useEffect(() => {

        const editsignature = async () => {
               
            try {

                const response = await axios.post(`${server_backend}/edit-signature-tasks`, {
                    idSnote,
                });
                setTask(response.data[0])
                setTitle(response.data[0].title)
                setDescription(response.data[0].description)

            } catch (error) {
                console.log(error)
                console.log("Lo sentimos, hemos presentado problema, contacte con el administrador.")
            }
        }
        editsignature()

    }, [idSnote])


    const updateTask = async (e) => {
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

            const response = await axios.put(`${server_backend}/update-signature-tasks`, {
                idSnote,
                title,
                description
            })
            if (response.data === 1048) {

                Swal.fire({
                    icon: "success",
                    title: "Se ha modificado la nota exitosamente",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    setTitle("");
                    setDescription("");
                    setSignaturetext([{id: idSnote, title: title, description: description}])
                    //Function to refresh components
                    setEditSignature(false)

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
        <form onSubmit={updateTask}>
            <table className="table table-bordered mb-0">
                <thead>
                    <tr>
                        <th className="text-wrap text-break">
                            <input
                                className="form-control"
                                type="text"
                                name="title"
                                 defaultValue= {task.title} 
                                onChange= {(e) => setTitle(e.target.value)} 
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
                            defaultValue={task.description} >
                        </textarea></td>
                    </tr>
                </tbody>
            </table>
        </form>
    )

}

export default EditSignature;
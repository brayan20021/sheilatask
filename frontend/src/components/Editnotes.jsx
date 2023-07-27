import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";


const Editnote = ({ idNote, edit_note, notes, setNotes }) => {
    const [note, setNote] = useState([]);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const newNotes = []
    useEffect(() => {

        const editNotes = async () => {

            try {

                const response = await axios.post('http://localhost:4000/edit-fast-notes', {
                    idNote,

                });
                setNote(response.data[0]);
                setTitle(response.data[0].title)
                setDescription(response.data[0].description)

            } catch (error) {

                console.log("Lo sentimos, hemos presentado problema, contacte con el administrador.")

            }
        }
        editNotes()

    }, [idNote])


    const updateNotes = async (e) => {
        e.preventDefault();

        try {

            if (title.trim() === "" || description.trim() === "") {
                Swal.fire({
                    icon: "warning",
                    title: "Los datos no pueden ir vacios",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    //navigate("/notes");
                });
                return
            }

            const response = await axios.put('http://localhost:4000/update-fast-notes', {
                idNote,
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
                    //setNotes((newNote) => newNote.map((newNote) => notes))
                    
                    //Function to refresh components
                    edit_note(false)

                });

            } else if (response.data === 0) {
                Swal.fire({
                    icon: "error",
                    title: "Ha ocurrido un error en el sistema, por favor contacte con el administrador del sistema",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    //navigate("/notes");
                });
            }

            console.log(response.data)

        } catch (error) {

            console.log("Ha ocurrido un error, por favor contacte con el administrador del sistema")

        }


    }

    return (
        <form onSubmit={updateNotes}>
            <table className="table table-bordered mb-0">
                <thead>
                    <tr>
                        <th className="text-wrap text-break">
                            <input
                                className="form-control"
                                type="text"
                                name="title"
                                defaultValue={note.title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                        </th>
                        <th className="col-1">
                            <button
                                type="submit"
                                className="btn btn-success"
                            >
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
                            defaultValue={note.description}>
                        </textarea></td>
                    </tr>
                </tbody>
            </table>
        </form>
    )

}

export default Editnote;
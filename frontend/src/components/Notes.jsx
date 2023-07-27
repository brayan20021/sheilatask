import React, { useEffect, useState } from "react";
import axios from "axios";
import Editnote from "./Editnotes";
import Swal from "sweetalert2";


const Note = ({ user }) => {

    const userData = JSON.parse(user);
    const idUser = userData.id;
    const [notes, setNotes] = useState([]);
    const [note_text, setNote_text] = useState([1]);
    const [edit_note, setEdit_note] = useState('')

    useEffect(() => {
        const fetchSignature = async () => {
            try {
                const response = await axios.post('http://localhost:4000/fast-notes', { idUser });
                setNotes(response.data);
            } catch (error) {
                console.log('Lo sentimos, ha ocurrido un error en la solicitud');
            }
        };

        fetchSignature();

    }, [idUser]);



    const textSignature = async (idnote) => {

        try {
            const response = await axios.post('http://localhost:4000/fast-notes-description', {
                idnote
            })
            setNote_text(response.data)
        } catch (error) {
            console.log('Lo sentimos, ha ocurrido un error en la solicitud');
        }
    }

    const [activeItem, setActiveItem] = useState('dashboard');

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const onDelete = async (idnote) => {
        try {
            const result = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Estás a punto de eliminar el archivo. Esta acción no se puede deshacer.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
            });

            if (result.isConfirmed) {
                const response = await axios.post("http://localhost:4000/delete-fast-notes", {
                    idnote,
                });

                if (response.data === 1048) {
                    Swal.fire("Eliminado", "El archivo ha sido eliminado exitosamente.", "success");
                    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== idnote));
                } else {
                    Swal.fire("Error", "No se ha podido eliminar, si persiste contacte con el admin del sistema.", "error");
                }
            }
        } catch (error) {

            console.error(error);
            Swal.fire("Error", "Ha ocurrido un error. Por favor, inténtelo de nuevo.", "error");
        }
    };


    return (

        <div className="row">
            <div className="col-md-12 mx-auto">
                <div className="card text-center">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-3">
                                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <div className="table-responsive">
                                        <table className="table table-lg">
                                            <tbody className="navbar px-14 active contenedor" style={{ minHeight: "370px", minWidth: "238px" }}>

                                                {notes.map((note) => (
                                                    <a className={activeItem === `${note.title}`
                                                        ? "nav-link active"
                                                        : "nav-link"}
                                                        id="v-pills-home-tab" aria-controls="v-pills-home" aria-selected="true" onClick={() => {
                                                            textSignature(note.id)
                                                            setActiveItem(note.title)
                                                            setEdit_note(false);
                                                        }}> <tr><td style={{ width: "300px", maxWidth: "300px" }} className="text-bold-500">{note.title}</td></tr></a>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-9">
                                <div className="tab-content" id="v-pills-tabContent">
                                    {!edit_note ? (
                                        <table className="table table-bordered mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="text-wrap text-break">
                                                        <h2>{note_text[0].title}</h2>
                                                    </th>
                                                    <th className="col-2">
                                                        <button
                                                            onClick={() => {
                                                                setEdit_note(true);
                                                            }}
                                                            className="btn btn-outline-primary"
                                                        >
                                                            <div className="icon dripicons-document-edit">
                                                            </div>
                                                        </button>
                                                        &nbsp;
                                                        <button
                                                            onClick={() => {
                                                                onDelete(note_text[0].id);
                                                            }}
                                                            className="btn btn-outline-danger"
                                                        >
                                                            <div className="icon dripicons-trash">
                                                            </div>
                                                        </button>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody style={{ height: '300px' }}>
                                                <tr>
                                                    <td><p className="text-bold-500 text-justify">{note_text[0].description}</p></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    ) : (
                                        <Editnote idNote={note_text[0].id} edit_note={setEdit_note} notes={notes} setNotes = {setNotes} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )

}

export default Note;
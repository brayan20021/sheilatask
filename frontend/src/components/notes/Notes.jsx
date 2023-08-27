import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import Editnote from "./Editnotes";
import Swal from "sweetalert2";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import config from '../../config';
const server_backend = config.API_URL;

const Note = ({ user }) => {
    const userData = JSON.parse(user);
    const idUser = userData.id;
    const [notes, setNotes] = useState([]);
    const [note_text, setNote_text] = useState([1]);
    const [edit_note, setEdit_note] = useState("");
    const [loading, setLoading] = useState(true);
    const [theme_design, setTheme_design] = useState("#190c5c")

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        const fetchSignature = async () => {
            try {
                const response = await axios.post(`${server_backend}/fast-notes`, {
                    idUser,
                });
                setNotes(response.data[0]);
                setTheme_design(response.data[1][0].design_note)

                if (response.data[0]) {
                    setNote_text([response.data[0][0]]);
                }
            } catch (error) {
                console.log("Lo sentimos, ha ocurrido un error en la solicitud");
            }
        };

        fetchSignature();
    }, [idUser]);

    const textSignature = async (idnote) => {
        try {
            const response = await axios.post(
                `${server_backend}/fast-notes-description`,
                {
                    idnote,
                }
            );
            setNote_text(response.data);
        } catch (error) {
            console.log("Lo sentimos, ha ocurrido un error en la solicitud");
        }
    };

    const [activeItem, setActiveItem] = useState("dashboard");


    const onDelete = async (idnote) => {
        try {
            const result = await Swal.fire({
                title: "¿Estás seguro?",
                text:
                    "Estás a punto de eliminar el archivo. Esta acción no se puede deshacer.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
            });

            if (result.isConfirmed) {
                const response = await axios.post(
                    `${server_backend}/delete-fast-notes`,
                    {
                        idnote,
                    }
                );

                if (response.data === 1048) {
                    
                    Swal.fire(
                        "Eliminado",
                        "El archivo ha sido eliminado exitosamente.",
                        "success"
                    );

                    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== idnote));

                } else {
                    Swal.fire(
                        "Error",
                        "No se ha podido eliminar, si persiste contacte con el admin del sistema.",
                        "error"
                    );
                }
            }
        } catch (error) {
            console.error(error);
            Swal.fire(
                "Error",
                "Ha ocurrido un error. Por favor, inténtelo de nuevo.",
                "error"
            );
        }
    };

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <Suspense fallback={<Spinner />}>
                    <div>
                        <div className="card text-center">
                            <div className="d-flex justify-content-end">
                                <Link to="/addnotes">
                                    <button className="btn btn-success ml-auto">
                                        <div className="icon dripicons-plus"></div>
                                    </button>
                                </Link>
                                &nbsp;
                                <button
                                    onClick={() => {
                                        setEdit_note(true);
                                    }}
                                    className="btn btn-primary"
                                >
                                    <div className="icon dripicons-document-edit"></div>
                                </button>
                                &nbsp;
                                <button
                                    onClick={() => {
                                        onDelete(note_text[0].id);
                                    }}
                                    className="btn btn-outline-danger"
                                >
                                    <div className="icon dripicons-trash"></div>
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div
                                            className="nav flex-column nav-pills"
                                            id="v-pills-tab"
                                            role="tablist"
                                            aria-orientation="vertical"
                                        >
                                            <div className="table-responsive">
                                                <table className="table table-lg">
                                                    <tbody
                                                        className="navbar px-14 active contenedor table-title">
                                                        {notes.map((note) => (
                                                            <Link
                                                                className={
                                                                    activeItem === `${note.title}`
                                                                        ? "nav-link active"
                                                                        : "nav-link note-title"
                                                                }
                                                                id="v-pills-home-tab"
                                                                aria-controls="v-pills-home"
                                                                aria-selected="true"
                                                                onClick={() => {
                                                                    textSignature(note.id);
                                                                    setActiveItem(note.title);
                                                                    setEdit_note(false);
                                                                }}
                                                                key={note.id}
                                                            >
                                                                <tr>
                                                                    <td
                                                                        style={{
                                                                            width: "300px",
                                                                            maxWidth: "300px",
                                                                        }}
                                                                        className="text-bold-500 td-table"
                                                                    >
                                                                        {note.title}
                                                                    </td>
                                                                </tr>
                                                            </Link>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="tab-content" id="v-pills-tabContent">
                                            {!edit_note ? (
                                                <table className="table table-bordered mb-0 notebook-table">
                                                    <thead className="header-notedpad" style={{ backgroundColor: theme_design }}>
                                                        <tr>
                                                            <td className="text-wrap text-break">
                                                                <h2 className="text-white">{note_text[0].title}</h2>
                                                            </td>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{ height: "400px" }} className="">
                                                        <tr>
                                                            {note_text[0].description ? (

                                                                <h5 className="text-bold-500 text-justify note-content-desc">{note_text[0].description}
                                                                </h5>
                                                            ) : (
                                                                <div className="d-flex justify-content">
                                                                    <Link to="/addnotes">
                                                                        <h1>Te animo a registrar tu primera nota!</h1>
                                                                        <button
                                                                            className="btn btn-outline-success"
                                                                            style={{ height: "200%", width: "100%" }} >
                                                                            <div className="icon dripicons-plus">
                                                                            </div>Agregar
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                            )}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <Editnote
                                                    idNote={note_text[0].id}
                                                    edit_note={setEdit_note}
                                                    setNote_text={setNote_text}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Suspense>
            )}
        </div>
    );
};

export default Note;

import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import EditSignature from "./EditSignature";
import AddSignatureNote from "./addSignatureNote";
import Swal from "sweetalert2";
import config from '../../config';
const server_backend = config.API_URL;

const SignatureList = ({ user }) => {
    const userData = JSON.parse(user);
    const idUser = userData.id;
    const { idsignature } = useParams();
    const [signature, setSignature] = useState([]);
    const [signature_text, setSignaturetext] = useState([1]);
    const [editsignature, setEditSignature] = useState(false);
    const [addsignote, setAddsignote] = useState(false);

    useEffect(() => {
        const fetchSignature = async () => {
            try {
                const response = await axios.post(`${server_backend}/signaturelist`, { idUser, idsignature });
                setSignature(response.data);
            } catch (error) {
                console.log('Lo sentimos, ha ocurrido un error en la solicitud');
            }
        };

        fetchSignature();
    }, [idUser]);

    const textSignature = async (idsignature) => {
        try {
            const response = await axios.post(`${server_backend}/signaturelist-text`, {
                idsignature
            });
            setSignaturetext(response.data);
        } catch (error) {
            console.log('Lo sentimos, ha ocurrido un error en la solicitud');
        }
    };

    const deleteNoteSignature = async (id) => {

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
                const response = await axios.post(`${server_backend}/delete-note-signature`, {
                    id,
                });

                if (response.data === 1048) {
                    Swal.fire("Eliminado", "El archivo ha sido eliminado exitosamente.", "success");
                    setSignature((signat) => signat.filter((signature) => signature.id !== id))
                    setSignaturetext([0])
                } else {
                    Swal.fire("Error", "No se ha podido eliminar, si persiste contacte con el admin del sistema.", "error");
                }
            }
        } catch (error) {

            console.error(error);
            Swal.fire("Error", "Ha ocurrido un error. Por favor, inténtelo de nuevo.", "error");
        }

    }

    const [activeItem, setActiveItem] = useState('dashboard');

    const handleItemClick = (item) => {
        setActiveItem(item);
    };


    // Componente para mostrar la firma seleccionada
    const ShowSignature = ({ signatureText }) => {
        return (
            <table className="table table-bordered mb-0 notebook-table">
                <thead className="header-notedpad">
                    <tr>
                        <th className="text-wrap text-break">
                            <h2 className="text-white">{signature_text[0].title}</h2>
                        </th>
                    </tr>
                </thead>
                <tbody style={{ height: "500px" }} className="">
                    <tr>
                        {signature_text[0] ? (
                            <h5 className="text-bold-500 text-justify note-content-desc">{signature_text[0].description}
                            </h5>
                        ) : (
                            <div className="d-flex justify-content">
                                <h1>Te animo a registrar tu primera nota!
                                    <button
                                        className="btn btn-outline-success"
                                        style={{ height: "400px", width: "600px" }} onClick={() => {
                                            setAddsignote(true);
                                        }}>
                                        <div className="icon dripicons-plus">
                                        </div>
                                    </button>
                                </h1>
                            </div>
                        )}
                    </tr>
                </tbody>
            </table>
        );
    };

    return (
        <div className="row">
            <div className="col-md-12 mx-auto">
                <div className="card text-center">
                    <section className="section">
                        <div className="row">
                            <div className="d-flex justify-content-end">
                                <button
                                    onClick={() => {
                                        setAddsignote(true);
                                    }}
                                    className="btn btn-success ml-auto"
                                >
                                    <div className="icon dripicons-plus"></div>
                                </button>
                                &nbsp;
                                <button
                                    onClick={() => {
                                        setEditSignature(true);
                                    }}
                                    className="btn btn-primary ml-auto"
                                >
                                    <div className="icon dripicons-document-edit"></div>
                                </button>
                                &nbsp;
                                <button
                                    onClick={() => {
                                        deleteNoteSignature(signature_text[0].id)
                                    }}
                                    className="btn btn-outline-danger ml-auto"
                                >
                                    <div className="icon dripicons-trash"></div>
                                </button>
                            </div>
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-3 border-right">
                                                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                    <div className="table-responsive" style={{ minHeight: "470px" }}>
                                                        <table className="table table-lg" style={{ minWidth: "238px" }}>
                                                            <tbody className="navbar px-14 active contenedor" >
                                                                {signature.map((signat) => (
                                                                    <a
                                                                        className={activeItem === `${signat.title}`
                                                                            ? "nav-link active"
                                                                            : "nav-link note-title"}
                                                                        id="v-pills-home-tab"
                                                                        aria-controls="v-pills-home"
                                                                        aria-selected="true"
                                                                        onClick={() => {
                                                                            textSignature(signat.id);
                                                                            setActiveItem(signat.title);
                                                                            setEditSignature(false);
                                                                            setAddsignote(false);
                                                                        }}
                                                                    >
                                                                        <tr>
                                                                            <td style={{ width: "300px", maxWidth: "300px" }} className="text-bold-500">
                                                                                {signat.title}
                                                                            </td>
                                                                        </tr>
                                                                    </a>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="tab-content" id="v-pills-tabContent">
                                                    {!editsignature ? (
                                                        addsignote === true ? (
                                                            <AddSignatureNote
                                                                idsignature={idsignature}
                                                                user={idUser}
                                                                setSignature={setSignature}
                                                                setAddsignote={setAddsignote}
                                                            />
                                                        ) :
                                                            <ShowSignature signatureText={signature_text} />
                                                    ) : (
                                                        <EditSignature
                                                            idSnote={signature_text[0].id}
                                                            setSignaturetext={setSignaturetext}
                                                            setEditSignature={setEditSignature}
                                                            idUser={idUser}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default SignatureList;

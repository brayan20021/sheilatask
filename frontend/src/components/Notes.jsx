import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import Editnote from "./Editnotes";



const Note = ({ user }) => {

    const userData = JSON.parse(user);
    const idUser = userData.id;
    const [signature, setSignature] = useState([]);
    const [signature_text, setSignaturetext] = useState([1]);
    const [edit_note, setEdit_note] = useState('')

    useEffect(() => {
        const fetchSignature = async () => {
            try {
                const response = await axios.post('http://localhost:4000/fast-notes', { idUser });
                setSignature(response.data);
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
            setSignaturetext(response.data)
        } catch (error) {
            console.log('Lo sentimos, ha ocurrido un error en la solicitud');
        }
    }

    const [activeItem, setActiveItem] = useState('dashboard');

    const handleItemClick = (item) => {
        setActiveItem(item);
    };


    return (

        <div className="row">
            <div className="col-md-12 mx-auto">
                <div className="card text-center">
                    <section className="section">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-3">
                                                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                    <div className="table-responsive">
                                                        <table className="table table-lg">
                                                            <tbody className="navbar px-14 active" style={{ minHeight: "370px" }}>

                                                                {signature.map((signat) => (
                                                                    <a className={activeItem === `${signat.title}`
                                                                        ? "nav-link active"
                                                                        : "nav-link"}
                                                                        id="v-pills-home-tab" aria-controls="v-pills-home" aria-selected="true" onClick={() => {
                                                                            textSignature(signat.id)
                                                                            setActiveItem(signat.title)
                                                                            setEdit_note(false);
                                                                        }}> <tr><td style={{ width: "300px", maxWidth: "300px" }} className="text-bold-500">{signat.title}</td></tr></a>
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
                                                                        <h2>{signature_text[0].title}</h2>
                                                                    </th>
                                                                    <th>
                                                                        <button
                                                                            onClick={() => {
                                                                            setEdit_note(true);
                                                                            }}
                                                                            className="btn btn-outline-primary"
                                                                        >
                                                                            <div className="icon dripicons-document-edit">
                                                                                <span>Editar</span>
                                                                            </div>
                                                                        </button>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody style={{ height: '300px' }}>
                                                                <tr className="text-wrap text-break">
                                                                    <td className="text-bold-500">{signature_text[0].description}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    ) : (
                                                        <Editnote idSignature = {signature_text[0].id} />
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

    )

}

export default Note;
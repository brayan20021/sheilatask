import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import EditSignature from "./EditSignature";





const SignatureList = ({ user }) => {

    const userData = JSON.parse(user);
    const idUser = userData.id;
    const { idsignature } = useParams();
    const [signature, setSignature] = useState([]);
    const [signature_text, setSignaturetext] = useState([1]);
    const [editsignature, setEditSignature] = useState(false);

    useEffect(() => {
        const fetchSignature = async () => {
            try {
                const response = await axios.post('http://localhost:4000/signaturelist', { idUser, idsignature });
                setSignature(response.data);
            } catch (error) {
                console.log('Lo sentimos, ha ocurrido un error en la solicitud');
            }
        };

        fetchSignature();


    }, [idUser]);



    const textSignature = async (idsignature) => {

        try {

            const response = await axios.post('http://localhost:4000/signaturelist-text', {
                idsignature
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
                                    <div className="card-header">
                                        <h4 className="card-title">Registros</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-3">
                                                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                    <div className="table-responsive">
                                                        <table class="table table-lg">
                                                            <tbody>
                                                                {signature.map((signat) => (
                                                                    <a className={activeItem === `${signat.title}`
                                                                        ? "nav-link active"
                                                                        : "nav-link"}
                                                                        id="v-pills-home-tab" aria-controls="v-pills-home" aria-selected="true" onClick={() => {
                                                                            textSignature(signat.id)
                                                                            setActiveItem(signat.title)
                                                                            setEditSignature(false)
                                                                        }}> <tr><td style={{ width: "300px", maxWidth: "300px" }} class="text-bold-500">{signat.title}</td></tr></a>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-9">
                                                <div className="tab-content" id="v-pills-tabContent">
                                                    {!editsignature ? (
                                                        <table className="table table-bordered mb-0">
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        <h2>{signature_text[0].title}</h2>
                                                                    </th>
                                                                    <th className="col-2">
                                                                        <button
                                                                            onClick={() => {
                                                                                setEditSignature(true)
                                                                            }}
                                                                            className="btn btn-outline-primary"
                                                                        >
                                                                            <div className="icon dripicons-document-edit">
                                                                            </div>
                                                                        </button>
                                                                        &nbsp;
                                                                        <button
                                                                            onClick={() => {
                                                                                //onDelete(note_text[0].id);
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
                                                                    <p className="text-bold-500">{signature_text[0].description}</p>
                                                                </tr>
                                                            </tbody>
                                                        </table>) : (
                                                        <EditSignature idSnote = {signature_text[0].id} setSignaturetext = {setSignaturetext} setEditSignature = {setEditSignature} idUser = {idUser} />
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

export default SignatureList;
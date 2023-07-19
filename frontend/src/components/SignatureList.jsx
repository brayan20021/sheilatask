import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";





const SignatureList = ({ user }) => {

    const userData = JSON.parse(user);
    const idUser = userData.id;
    const { idsignature } = useParams();
    //console.log(idsignature)
    const [signature, setSignature] = useState([]);
    const [signature_text, setSignaturetext] = useState([1]);
    //console.log(user)
    useEffect(() => {
        const fetchSignature = async () => {
            try {
                const response = await axios.post('http://localhost:4000/signaturelist', { idUser, idsignature });
                setSignature(response.data);
                console.log(response.data)
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
            //console.log(response.data)
            setSignaturetext(response.data)
        } catch (error) {
            console.log('Lo sentimos, ha ocurrido un error en la solicitud');
        }
    }

    const [activeItem, setActiveItem] = useState('dashboard');

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    console.log(signature_text)

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
                                                                        }}> <tr><td style={{width: "300px", maxWidth: "300px"}} class="text-bold-500">{signat.title}</td></tr></a>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-9">
                                                <div className="tab-content" id="v-pills-tabContent">
                                                    <table className="table table-bordered mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    <h2>{signature_text[0].title}</h2>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody style={{ height: '300px' }}>
                                                            <tr>
                                                               <p className="text-bold-500">{signature_text[0].description}</p> 
                                                            </tr>
                                                        </tbody>
                                                    </table>
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
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Addnote = ({ user }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()


    const idUser = JSON.parse(user)
    console.log(idUser)
    const addNotes = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post('http://localhost:4000/add-fast-notes', {
                idUser: idUser.id,
                title,
                description

            })
            console.log(response.data)
            setTitle('');
            setDescription('');

            if(response.data === 1048){
                
                Swal.fire({
                    icon: "success",
                    title: "Nota guardada exitosamente",
                    showConfirmButton: false,
                    timer: 1500,
                  }).then(() => {
                    setTitle("");
                    setDescription("");
                    navigate("/notes"); 
                  });

            }

        } catch (error) {
            console.log('Lo sentimos, ha ocurrido un error en la solicitud');
        }


    }


    return (

        <section className="section">
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-header">
                            Floating Labels
                        </div>
                        <form onSubmit={addNotes}>
                            <div className="card-body">
                                <div className="card">
                                    <input 
                                    type="text" 
                                    name="title" 
                                    placeholder="Titulo" 
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="form-floating">
                                    <textarea
                                        class="form-control"
                                        style={{ minHeight: "150px" }}
                                        placeholder="Leave a comment here"
                                        name="description"
                                        id="floatingTextarea"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}></textarea>
                                    <label for="floatingTextarea">Escribe tus apuntes aqui :)</label>
                                </div>
                                <div className="card">
                                    <button type="submit" className="btn btn-primary btn-block btn-lg shadow-lg mt-5">Guardar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}



export default Addnote;
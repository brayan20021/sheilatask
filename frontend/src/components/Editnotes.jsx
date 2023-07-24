import axios from "axios";
import React, { useState, useEffect } from "react";

const Editnote = ({ idSignature }) => {
    const [note, setNote] = useState([]);


    useEffect(() => {

        const editNotes = async () => {

            try {
                
                const response = await axios.post('http://localhost:4000/edit-fast-notes', {
                    idSignature
                });
                setNote(response.data[0]);
                console.log(response.data[0])
        
            } catch (error) {
        
                console.log("Lo sentimos, hemos presentado problema, contacte con el administrador.")
                
            }
        }
        editNotes()

    

    }, [idSignature])



//console.log(note)

    return (
        <table className="table table-bordered mb-0">
        <thead>
            <tr>
                <th className="text-wrap text-break">
                    <input className="form-control" type="text" name="title" value={note.title} />
                    
                </th>
                <th>
                    <button
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
                <td className="text-bold-500"><textarea style={{ height: '300px' }}  className="form-control" type="text" value={note.description} /></td>
            </tr>
        </tbody>
    </table>
    )

}

export default Editnote;
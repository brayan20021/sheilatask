import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Signature = ({ user }) => {
  const userData = JSON.parse(user);
  const idUser = userData.id;
  const [signature, setSignature] = useState([]);

  useEffect(() => {
    const fetchSignature = async () => {
      try {
        const response = await axios.post('http://localhost:4000/signature', { idUser });
        setSignature(response.data);
      } catch (error) {
        console.log('Lo sentimos, ha ocurrido un error en la solicitud');
      }
    };

    fetchSignature();
  }, [idUser]);

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-12 col-md-6 order-md-1 order-last">
          <h3>Asignaturas registradas</h3><br /><br />
        </div>
        <div className="col-12 col-md-6 order-md-2 order-first">
          <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
            <ol className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#inlineForm">
                  Agregar asignatura
                </button>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <section className="section">
        <div className="row" id="table-hover-row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title"></h4>
              </div>
              <div className="card-content">
                {/* Tabla con hover */}
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>NOMBRE</th>
                        <th>CANTIDAD DE APUNTES</th>
                        <th>ESTADO</th>
                        <th>ACCION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {signature.map((sig) => (
                        <tr key={sig.id}>
                          <td className="text-bold-500">{sig.name}</td>
                          <td className="text-bold-500">{sig.total_task}</td>
                          <td>Remote</td>
                          <td>
                            <button className="btn btn-sm btn-outline-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar Asignatura">
                              <span className="fa-fw select-all fas"></span>
                            </button> |
                            <button className="btn btn-sm btn-outline-warning" data-bs-toggle="tooltip" data-bs-placement="top" title="Modificar Asignatura">
                              <span className="fa-fw select-all fas"></span>
                            </button>
                            | <a className="btn btn-success" href={`/signaturelist/${sig.id}`}>Ver apuntes</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signature;

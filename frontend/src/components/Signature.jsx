import React from 'react';

const Signature = () => {
  // Datos ficticios para la lista de asignaturas
  const signatureList = [
    { id: 1, name: 'Asignatura 1', total_task: 10 },
    { id: 2, name: 'Asignatura 2', total_task: 5 },
    { id: 3, name: 'Asignatura 3', total_task: 7 },
  ];

  const deleteSignature = (id) => {
    // Lógica para eliminar la asignatura con el ID proporcionado
    console.log(`Eliminar asignatura con ID: ${id}`);
  };

  const modifySignature = (id) => {
    // Lógica para modificar la asignatura con el ID proporcionado
    console.log(`Modificar asignatura con ID: ${id}`);
  };

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
                      {signatureList.map((signature) => (
                        <tr key={signature.id}>
                          <td className="text-bold-500">{signature.name}</td>
                          <td className="text-bold-500">{signature.total_task}</td>
                          <td>Remote</td>
                          <td>
                            <button className="btn btn-sm btn-outline-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar Asignatura" onClick={() => deleteSignature(signature.id)}>
                              <span className="fa-fw select-all fas"></span>
                            </button> |
                            <button className="btn btn-sm btn-outline-warning" data-bs-toggle="tooltip" data-bs-placement="top" title="Modificar Asignatura" onClick={() => modifySignature(signature.id)}>
                              <span className="fa-fw select-all fas"></span>
                            </button>
                            | <a className="btn btn-success" href={`/signaturelist/${signature.id}`}>Ver apuntes</a>
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

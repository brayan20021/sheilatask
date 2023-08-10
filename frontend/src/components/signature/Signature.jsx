import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';



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

  const deleteSignature = async (id) => {

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
        const response = await axios.post("http://localhost:4000/delete-signature", {
          id,
        });

        if (response.data === 1048) {
          Swal.fire("Eliminado", "El archivo ha sido eliminado exitosamente.", "success");
          setSignature((signat) => signat.filter((signature) => signature.id !== id))
        } else {
          Swal.fire("Error", "No se ha podido eliminar, si persiste contacte con el admin del sistema.", "error");
        }
      }
    } catch (error) {

      console.error(error);
      Swal.fire("Error", "Ha ocurrido un error. Por favor, inténtelo de nuevo.", "error");
    }

  }
  const updateSignature = async (id) => {

    try {
      const result =
        Swal.fire({
          title: 'Ingrese el nuevo nombre',
          input: 'text',
          inputPlaceholder: 'Nombre de la asignatura',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Guardar',
          cancelButtonText: 'Cancelar',
          showLoaderOnConfirm: true,
          preConfirm: async (newName) => {
            // Aquí puedes realizar alguna validación si es necesario
            if (await newName.trim() !== "") {
              return newName;
            } else {
              Swal.fire("Error", "Los datos no pueden ir vacios", "error");
            }
          },
          allowOutsideClick: () => !Swal.isLoading()
        })

      if ((await result).isConfirmed) {
        const response = await axios.post("http://localhost:4000/add-signature", {
          id,
          newName: (await result).value
        });
        const resultvalue = (await result).value;
        setSignature((prevSignature) =>
          prevSignature.map((signature) => {
            if (signature.id === id) {

              return { ...signature, name: resultvalue };

            } else {

              return signature;

            }
          })
        );

        if (response.data === 1048) {
          Swal.fire("Actualizado", "La asignatura ha sido actualizada exitosamente.", "success");

        } else {
          Swal.fire("Error", "No se ha podido actualizar, si persiste contacte con el admin del sistema.", "error");
        }
      }
    } catch (error) {

      console.error(error);
      Swal.fire("Error", "Ha ocurrido un error. Por favor, inténtelo de nuevo.", "error");
    }

  }

  const addSignature = async () => {

    try {
      const result =
        Swal.fire({
          title: 'Agregar una nueva asignatura',
          input: 'text',
          inputPlaceholder: 'Nombre de la asignatura',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Guardar',
          cancelButtonText: 'Cancelar',
          showLoaderOnConfirm: true,
          preConfirm: async (newName) => {
            // Aquí puedes realizar alguna validación si es necesario
            if (await newName.trim() !== "") {
              return newName;
            } else {
              Swal.fire("Error", "Los datos no pueden ir vacios", "error");
            }
          },
          allowOutsideClick: () => !Swal.isLoading()
        })

      if ((await result).isConfirmed) {
        const response = await axios.post("http://localhost:4000/add-signature", {
          name: (await result).value,
          idUser
        });

        if (response.data[1] === 1048) {
          Swal.fire("Agregado", "La asignatura ha sido añadido exitosamente.", "success");
          console.log(response.data[0])
          setSignature((signature) => signature.concat(response.data[0]))

        } else {
          Swal.fire("Error", "No se ha podido agregar, si persiste contacte con el admin del sistema.", "error");
        }
      }
    } catch (error) {

      console.error(error);
      Swal.fire("Error", "Ha ocurrido un error. Por favor, inténtelo de nuevo.", "error");
    }

  }

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
                <button type="button" className="btn btn-primary" onClick={addSignature}>
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
                  <table className="table table-striped mb-0">
                    <thead>
                      <tr>
                        <th>NOMBRE</th>
                        <th>CANTIDAD DE APUNTES</th>
                        <th>FECHA</th>
                        <th>ACCION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {signature.map((sig) => (
                        <tr key={sig.id}>
                          <td className="text-bold-500">{sig.name}</td>
                          <td className="text-bold-500">{sig.total_task}</td>
                          <td>{sig.currentdate}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => deleteSignature(sig.id)} data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar Asignatura">
                              <span className="fa-fw select-all fas"></span>
                            </button>
                            &nbsp;<button className="btn btn-sm btn-outline-warning" onClick={() => updateSignature(sig.id)} data-bs-toggle="tooltip" data-bs-placement="top" title="Modificar Asignatura">
                              <span className="fa-fw select-all fas"></span>
                            </button>
                            &nbsp;<Link to={`/signaturelist/${sig.id}`}> <button className="btn btn-success">
                              Ver apuntes</button></Link>
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

import React from 'react';


const Dashboard = () => {

  return (
   
    <div className="row">
      <div className="col-md-12 mx-auto">
        <div className="card text-center">
          <div className="card-body">
            <h3>Bienvenido(a) a nuestro proyecto web </h3>
            <h6>
              Es normal que en medio de tanta teoría se nos escapen informaciones...
              <br />
              No te preocupes si a veces se te escapan algunas informaciones,
              <br />
              ¡estamos aquí para recordártelo!
            </h6>
            <a href="/dashboard" className="btn btn-success">Empezar</a>
          </div>
        </div>
      </div>
    </div>

  
  );
};

export default Dashboard;
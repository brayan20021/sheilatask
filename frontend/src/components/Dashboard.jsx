import React, { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { face } from '../assets';

const Dashboard = ({ user }) => {

  const userData = JSON.parse(user)
  const idUser = userData.id;
  const [lastnote, setLastnote] = useState([])
  const [totalNote, setTotalNote] = useState([])
  const [loading, setLoading] = useState(true)
  const username = JSON.parse(user)

  useEffect(() => {

    setTimeout(() => {
      setLoading(false)
    }, 1000);

  })


  useEffect(() => {

    const dashboardNotes = async () => {

      try {

        const response = await axios.post('http://localhost:4000/dashboard', { idUser })

        setLastnote(response.data[0])
        setTotalNote(response.data[1])

      } catch (error) {
        console.log('Lo sentimos, ha ocurrido un error en la solicitud');
      }
    }
    dashboardNotes()
  }, [idUser])

  const Card = ({ title, text }) => (
    <div className="card">
      <div className="card-content">
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <p className="card-text">{text}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {loading ? <Spinner /> :
        <Suspense fallback={<Spinner />}>
          <section className="row">
            <div className="col-12 col-lg-9">
              <div className="row">
                <div className="col-6 col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body px-3 py-4-5">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="stats-icon red">
                            <i className="iconly-boldBookmark"></i>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <h6 className="text-muted font-semibold">Notas guardadas</h6>
                          <h6 className="font-extrabold mb-0">112</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body px-3 py-4-5">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="stats-icon purple">
                            <i className="iconly-boldShow"></i>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <h6 className="text-muted font-semibold">Total de notas</h6>
                          <h6 className="font-extrabold mb-0">{totalNote.total}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body px-3 py-4-5">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="stats-icon blue">
                            <i className="iconly-boldProfile"></i>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <h6 className="text-muted font-semibold">Asignaturas</h6>
                          <h6 className="font-extrabold mb-0">120</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body px-3 py-4-5">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="stats-icon green">
                            <i className="iconly-boldAdd-User"></i>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <h6 className="text-muted font-semibold">Recordatorios</h6>
                          <h6 className="font-extrabold mb-0">6</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4>Ultimas notas</h4>
                    </div>
                    {lastnote.map((note) => (
                      <div className="col-12">
                        <div className="recent-message d-flex px-4 py-3">
                          <Card title={note.title} text={note.description} />
                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="card">
                <div className="card-body py-4 px-5">
                  <div className="d-flex align-items-center">
                    <div className="avatar avatar-xl">
                      <img src={face} alt="Face 1" />
                    </div>
                    <div className="ms-3 name">
                      <h5 className="font-bold">Welcome</h5>
                      <h6 className="text-muted mb-0">{username.fullname}</h6>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </Suspense>
      }

    </div>
  );
};

export default Dashboard;
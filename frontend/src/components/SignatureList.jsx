import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";


  

const SignatureList = ({user}) => {

    const userData = JSON.parse(user);
    const idUser = userData.id;
    const [signature, setSignature] = useState([]);
    console.log(user)
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
        <div className="row">
            <div className="col-md-12 mx-auto">
                <div className="card text-center">
                    <section className="section">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Javascript Behavior</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-3">
                                                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                    <a className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
                                                </div>
                                            </div>
                                            <div className="col-9">
                                                <div className="tab-content" id="v-pills-tabContent">
                                                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut nulla neque. Ut hendrerit nulla a euismod pretium. Fusce venenatis sagittis ex efficitur suscipit. In tempor mattis fringilla. Sed id tincidunt orci, et volutpat ligula. Aliquam sollicitudin sagittis ex, a rhoncus nisl feugiat quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricies ligula a tempor vulputate. Suspendisse pretium mollis ultrices</p>
                                                    </div>
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
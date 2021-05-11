import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';


function Errorpage() {
  return (
    <>
    <div className="container">
        <div className="row" style={{marginTop: "220px",marginLeft:"320px"}}>
            <div className="text-center">
            <h1>404!</h1>
            <h3>We are Sorry, Page not Found!</h3>
            <NavLink to="/">Back to Home</NavLink>
            </div>
        </div>
    </div>
    </>
  );
}

export default Errorpage;
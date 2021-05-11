import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <>
     <div className=" text-center bg-light">
     
<footer className="page-footer font-small unique-color-dark pt-4">
  <div className="footer-copyright text-center py-3">© 2020 Copyright:
    <NavLink to="/"> TarunRathore</NavLink>
  </div>
</footer>

     </div>
    </>
  );
}

export default Footer;

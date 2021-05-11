import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom'; 
import bg from '../images/bg6.png'

const Home =() =>{

  const [userName, setUserName] = useState('');
  const [show,setShow] = useState(false);

  const userHome = async ()=> {

      try {

          const res = await fetch('/getdata', {
          method : "GET",
          headers: {
            "Content-Type":"application/json"
          },
        });
  
        const data = await res.json();
        setUserName(data.name);
        setShow(true)
  
      }catch(err){
        console.log(err);
      }
    }
  
    useEffect(()=>{
      userHome();
    },[])
  return (
    <>
<div className="main2 ">
<div className="container">
  <div className="row">
    <div className="col-md-6 left">
      <img className="bg-img" src={bg} alt="bg-img"/>
    </div>
    <div className="col-md-6 right">
    <p>WELLCOME</p>
          <h1>{userName}</h1>
          <h2>{show ? 'Happy to see You Back' : 'We are MEARN STACK Developers'}</h2>
          <NavLink to="/about" className="btn-get-started scrollto">Get Started</NavLink>
    </div>
  </div>
</div>
</div>
    </> 
  );
}

export default Home;

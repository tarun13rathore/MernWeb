import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom';
import tarunpic from '../images/tarun.png'
import aboutpic from '../images/bg-1.jpg'

function About() {
 
  const history = useHistory();

  const [userData, setUserData] = useState({});

  const callAboutUs = async() =>{
    try{
      const res = await fetch('/about', {
        method : "GET",
        headers: {
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if(!res.status === 200){
          const error = new Error(res.error);
          throw error;
      }

    }catch(err){
      console.log(err);
      history.push('/login');
    }
  }

  useEffect( () => {
      callAboutUs();
  },[])

  return ( 
    <>
<div className="profile">
      <div className="container pr emp-profile">
     <div className=" shadow">
     <form method="GET">

<div className="row text-light justify-content-end">
  <div className="col-md-4 mt-3 ">
    <img src={userData.name == "tarun" ? tarunpic : aboutpic } style={{width:"150px",height:"200px"}} alt="profile-pic"/>
  </div>

  <div className="col-md-6 mt-4">
  <div className="profile-head">
    <h5>{ userData.name }</h5>
    <h6>MERN Developer</h6>
    <p className="mt-5 mb-5">RANKING : <span>1/10</span></p>

    <ul  class="nav nav-pills">
     <li class="active">
       <a className="text-decoration-none"  href="#about" data-toggle="tab">About</a>
     </li>
    <li>
      <a className="text-decoration-none pl-3" href="#timeline" data-toggle="tab">Timeline </a>
    </li>
   </ul>

  </div>
</div>
</div>

<div className="row mt-5 text-light justify-content-center">
  {/* leftside */}

  

  {/* rightside */}
  <div className="col-md-8 pl-4 about-info">
    
<div class="tab-content clearfix">
  <div class="tab-pane active" id="about">
  <div className="row mt-3">
          <div className="col-md-6">
            <label>user ID</label>
          </div>
          <div className="col-md-6">
            <p>{userData._id}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>Name</label>
          </div>
          <div className="col-md-6">
            <p>{userData.name}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>Email</label>
          </div>
          <div className="col-md-6">
            <p>{userData.email}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>Phone</label>
          </div>
          <div className="col-md-6">
            <p>{userData.phone}</p>
          </div>
        </div>
  </div>
  <div class="tab-pane" id="timeline">
    <h3>I am a Full Stack Web developer with experience in building
websites and web applications. With a broad skill set covering
important facets in the Web Development space. </h3>
  </div>
</div>
  </div>
</div>
</form>
     </div>
    </div>
</div>
    </>
  );
}

export default About;
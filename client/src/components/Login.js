import React,{useContext, useState} from 'react';
import {useHistory} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

import {UserContext} from './All'

function Login() {

  const {state, dispatch} = useContext(UserContext);

  const history =useHistory();

  const [email,setEmail] = useState('');
  const [pass,setPass] = useState('');

  const loginUser = async(e)  => {

    e.preventDefault();

    const res =await fetch("/signin",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email,pass
      })
    });
    
    const data =await res.json();
    if(data.status===400||!data){
      window.alert("Invalid Cridencials");
      console.log("Invalid Cridencials");
    } else{
      dispatch({type:"USER",payload:true})
      window.alert(" Login succesfully");
      console.log(" Login succesfully");
      history.push("/about");
    }

  }

  return (
    <>
    <div className="log">
    <div className="container log-c ">
        <div className="row log-form ">
        <div className=" col-md-6 mx-auto form p-4 shadow">
           <h1 className="text-center">Login Form</h1>
           <form method="POST">

          <div className="form-group ">
            <label for="exampleInputEmail1"><i class="fas fa-envelope-open-text"></i> Email address</label>
            <input type="email" name="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>

          <div className="form-group ">
            <label for="exampleInputPassword1"><i class="fas fa-unlock-alt"></i> Password</label>
            <input type="password" name="pass"
             value={pass} 
             onChange={(e) => setPass(e.target.value)} 
             className="form-control" id="pass" placeholder="Password"/>
          </div>

             <div className="form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
              <label className="form-check-label" for="exampleCheck1">Check me out</label>
             </div>
              <div className="text-center">
              <button type="submit" value="login" onClick={loginUser} className="btn btn-outline-warning btn-lg">LogIn</button>
              </div>
           </form>    
           </div>
        </div>
    </div>
    </div>
    </>
  );
}

export default Login;
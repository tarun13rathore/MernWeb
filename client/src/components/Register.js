import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function Register() {
  const history =useHistory();
  const [user,setUser] = useState({
    name:"",email:"",phone:"",work:"",pass:"",cpass:""
  });

  let name, value;
  const handleInputs =(e)=>{
      console.log(e);
      name = e.target.name;
      value = e.target.value;

      setUser({...user,[name]:value})
  }

  const PostData = async (e) =>{
    e.preventDefault();
    const {name,email,phone,work,pass,cpass} = user ;
    const res =await fetch("/register",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            name,email,phone,work,pass,cpass
          })
    });
    const data =await res.json();
    if(data.status===422||!data){
      window.alert("Invalid Register");
      console.log("Invalid Register");
    } else{
      window.alert(" Register succesfully");
      console.log(" Register succesfully");
      history.push("/login");
    }
  }
  return (
    <>


<div className="reg">
<div className="container text-center">
<div className="row reg-form">
           <div className="container shadow col-md-8 mx-auto form p-4 ">
           <h1 className="text-center">Registeration Form</h1>
           <form className="register-form" id="register-form" method="POST">
            
            {/* name */}
            <div class="col-auto">
            <label class="sr-only" for="inlineFormInputGroup">Name</label>
            <div class="input-group mb-2">
            <div class="input-group-prepend">
            <div class="input-group-text"><i class="fas fa-signature"></i></div>
            </div>
            <input type="text" class="form-control" name="name"  id="inlineFormInputGroup" placeholder="Enter Your Name" autoComplete="off"
              value={user.name} onChange={handleInputs}
            />
            </div>
            </div>
            
            {/* email */}
            <div class="col-auto">
            <label class="sr-only" for="inlineFormInputGroup">Email</label>
            <div class="input-group mb-2">
            <div class="input-group-prepend">
            <div class="input-group-text"><i class="fas fa-envelope-open-text"></i></div>
            </div>
            <input type="email" class="form-control" name="email"  id="inlineFormInputGroup" placeholder="Enter Your Mail " autoComplete="off"
              value={user.email} onChange={handleInputs}
            />
            </div>
            </div>

            {/* phone */}
            <div class="col-auto">
            <label class="sr-only" for="inlineFormInputGroup">Phone</label>
            <div class="input-group mb-2">
            <div class="input-group-prepend">
            <div class="input-group-text"><i class="fas fa-phone"></i></div>
            </div>
            <input type="text" class="form-control"  name="phone" id="inlineFormInputGroup" placeholder="Enter Your Phone Number" autoComplete="off"
              value={user.phone} onChange={handleInputs}
            />
            </div>
            </div>
             
             {/* work */}
            <div class="col-auto">
            <label class="sr-only" for="inlineFormInputGroup">Work</label>
            <div class="input-group mb-2">
            <div class="input-group-prepend">
            <div class="input-group-text"><i class="fas fa-briefcase"></i></div>
            </div>
            <input type="text" class="form-control" name="work"  id="inlineFormInputGroup" placeholder="Enter Your Work" autoComplete="off"
              value={user.work} onChange={handleInputs}
            />
            </div>
            </div>
             
            {/* password */}
            <div class="col-auto">
            <label class="sr-only" for="inlineFormInputGroup">password</label>
            <div class="input-group mb-2">
            <div class="input-group-prepend">
            <div class="input-group-text"><i class="fas fa-unlock-alt"></i></div>
            </div>
            <input type="password" class="form-control" name="pass"  id="inlineFormInputGroup" placeholder="Enter Your Password" autoComplete="off"
              value={user.pass} onChange={handleInputs}
            />
            </div>
            </div>

            {/* C Password */}
            <div class="col-auto">
            <label class="sr-only" for="inlineFormInputGroup">Conform Password</label>
            <div class="input-group mb-2">
            <div class="input-group-prepend">
            <div class="input-group-text"><i class="fas fa-unlock-alt"></i></div>
            </div>
            <input type="password" class="form-control"  name="cpass" id="inlineFormInputGroup" placeholder="Enter Your Conform Password" autoComplete="off"
              value={user.cpass} onChange={handleInputs}
            />
            </div>
            </div> 

              <div className="text-center mt-3">
              <button type="submit" value="register" onClick={PostData} className="btn btn-outline-danger btn-lg">Register</button>
              </div>
           </form>    
           </div>
    </div> 
</div>
</div>

    </>
  );
}

export default Register;

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Contact =() =>{

  const [userData,setUserData] = useState({name:"",email:"",phone:"",message:""});

  const userContact = async () => {

      try {

          const res = await fetch('/getdata', {
          method : "GET",
          headers: {
            "Content-Type":"application/json"
          },
        });
  
        const data = await res.json();
        console.log(data);
        setUserData({...userData, name:data.name, email:data.email, phone:data.phone, message:data.message});
  
        if(!res.status === 200){
            const err = new Error(res.err);
            throw err;
        }
  
      }catch(err){
        console.log(err);
      }
    }
  
    useEffect(()=>{
      userContact();
    },[])

    //we storeing data

    const handleInput =(e) =>{
      const name = e.target.name;
      const value = e.target.value;
      
      setUserData({...userData, [name]:value});
    
    }

    // send the data to backend

    const ContactHandle = async(e) =>{
      e.preventDefault();

      const {name,email,phone,message} = userData;

      const res = await fetch('/contact',{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          name,email,phone,message
        })
      });

      const data = await res.json();

      if(!data){
        console.log("Message not Send")
      }else{
        alert("Message Send");
        setUserData({...userData, message:""});
      }
    }

  return (
    <>

  <div className="cont">
  <div className="container">
         {/* contact info */} 
   <div className="info">
   <div className="row">

<div className="col-md-4 pt-3">
  <div className="card">
    <div className="card-body">
      <h5 className="card-title"><i class="fas fa-map-marked-alt"></i> Address</h5>
      <p className="p_text">Ghaziabad, Uttar Pradesh, India</p>
    </div>
  </div>
</div>

<div className="col-md-4 pt-3">
  <div className="card">
    <div className="card-body">
      <h5 className="card-title"><i class="fas fa-mobile-alt"></i> Phone</h5>
      <p className="p_text">+91 7827260463.</p>
    </div>
  </div>
</div>


<div className="col-md-4 pt-3">
  <div className="card">
    <div className="card-body">
      <h5 className="card-title"><i class="fas fa-envelope-open-text"></i> Email</h5>
      <p className="p_text">tarun13rathore@gmail.com</p>
    </div>
  </div>
</div>
</div>
   </div>

    </div>

    {/* contact page */}
  <div className="contact_us">
    <div className="container">
      <div className="row">
        <div className="col-lg-10 offset-lg-1 shadow p-3 justify-content-md-center mt-5 ">
          <div className="contact_form_title">
            <h3>Get in Touch</h3>
          </div>
          <form id="contact_form" method="POST">

            <input type="text" id="contact_form_name" className="contact_form_input" placeholder="Your name" required="true" 
            value={userData.name} name="name" onChange={handleInput}/>

            <input type="email" id="contact_form_email" className="contact_form_input" placeholder="Your email" required="true" 
            value={userData.email} name="email" onChange={handleInput}/>

            <input type="text" id="contact_form_phone" className="contact_form_input" placeholder="Your Phone number" required="true" 
            value={userData.phone} name="phone" onChange={handleInput}/>

            <textarea type="text" id="contact_form_input" className="contact_form_input" placeholder="Message" cols="70" rows="3" required="true" 
            value={userData.message} name="message" onChange={handleInput} />

            <div className="">
            <button type="submit" onClick={ContactHandle} className="contact_button btn btn-outline-primary btn-lg">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>

    </>
  );
}

export default Contact;
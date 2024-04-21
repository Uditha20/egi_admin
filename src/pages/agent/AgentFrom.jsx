import React, { useEffect } from 'react'
import { useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

function AgentFrom() {
    const [message, setMessage] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPhone, setIsValidPhone] = useState(true);
    
   
    const validateEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (emailRegex.test(email)) {
        setIsValidEmail(true);
      } else {
        setIsValidEmail(false);
      }
    };
  
    const validatePhone = (phoneNo) => {
      const phoneRegex = /^[0-9]{10}$/; // Adjust regex based on your phone number format
      if (phoneRegex.test(phoneNo)) {
        setIsValidPhone(true);
      } else {
        setIsValidPhone(false);
      }
    };
  
    const [data, SetData] = useState({
      name: "",
      username: "",
      phoneNo: "",
      password: ""
    });

    const { id } = useParams();

    const empRegistration = async (e) => {
      e.preventDefault();
  
      const { name, username, phoneNo,password} = data;
  
      if (isValidEmail && isValidPhone) {
        if(id){
          try {
            const response = await axios.patch(`/user/edituser/${id}`, {
              name,
              username,
              phoneNo,
              password
           
            });
          
            if (response.data) {
              setMessage("User details updated successfully");
              SetData({
                name: "",
                username: "",
                phoneNo: "",
                password: ""
              
              });
            }
          } catch (error) {
            setErrMsg("Check your Input fields");
          }
        }
        else{

          try {
            const response = await axios.post("/user/register", {
              name,
              username,
              phoneNo,
              password,
              role:"employee"
             
            });
           
            if (response.data) {
              setMessage("Employee details added successfully");
              SetData({
                name: "",
                username: "",
                phoneNo: "",
                password: ""  
              });
            }
          } catch (error) {
            setErrMsg("UserName already have");
          }
        }
      } else {
        setErrMsg("Valid email or phone number required");
      }
    };

   

  return (
    <div className="main pt-3" style={{ gridArea: "main" }}>

    <div className="form-container">
      <form method="POST" onSubmit={empRegistration}>
        {message && <p className="alert alert-success">{message}</p>}
        {errMsg && <p className="alert alert-danger">{errMsg}</p>}
        <div className="form-group pb-3">
          <label htmlFor="exampleInputEmail1">Employee Name</label>
          <input
            type="text"
            className="form-control pt-2 mt-2"
            id="empname"
            aria-describedby="emailHelp"  
            onChange={(e) => SetData({ ...data, name: e.target.value })}
          />
        </div>
        <div className="form-group pb-3">
          <label htmlFor="exampleInputEmail1">Employee Gmail</label>
          <input
            type="email"
            className="form-control pt-2 mt-2"
            id="empmail1"
            aria-describedby="emailHelp"
            onChange={(e) => SetData({ ...data, username: e.target.value })}
          />
        </div>
        <div className="form-group pb-3">
          <label htmlFor="exampleInputEmail1">Phone No</label>
          <input
            type="text"
            className="form-control pt-2 mt-2"
            id="empphone"
            aria-describedby="emailHelp"
            onChange={(e) => SetData({ ...data, phoneNo: e.target.value })}
          />
        </div>
        <div className="form-group pb-3">
          <label htmlFor="exampleInputEmail1">Password</label>
          <input
            type="text"
            className="form-control pt-2 mt-2"
            id="emppassword"
            aria-describedby="emailHelp"
            onChange={(e) => SetData({ ...data, password: e.target.value })}
            
          />
        </div>
          
        <button type="submit" className="btn btn-primary mt-3">
          Register
        </button>
      </form>
    </div>
  </div>
  )
}

export default AgentFrom
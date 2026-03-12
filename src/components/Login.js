import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


function Login(props) {
    const navigate=useNavigate();
    const[email,setemail]=useState("")
    const[password,setpassword]=useState("")

    const handlesubmit=async(e)=>{
        e.preventDefault();
        props.loading(30);
        const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({email:email, password:password})
        })
        const data=await response.json();
        if (response.status === 200) {
           
            sessionStorage.setItem("isLoggedIn", "true");
            props.setlog(true);
            
            navigate("/fetchnotes")
          } else {
            document.getElementById("showerror").innerText=(data.message)
            

          }
        };
    

            
  return (
    <Container>
      
      <form>
      <h2>Fill the login Details</h2>
        <div>
            <label>Email</label><br></br>
            <textarea
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            ></textarea>
            
        </div>




        <div >
            <label>Password</label><br></br>
            <textarea
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            ></textarea>
        </div>
        <p id="showerror"></p>
        <div className="button-container">
        <button onClick={()=>navigate("/registeruser")}>Register</button>
        <button onClick={handlesubmit}>Login</button>
        </div>
      </form>
      
    </Container>
  )
}


const Container=styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

width: 100vw;
height: 100vh;

.button-container{
  display:flex;
  column-gap: 15px;
}

#showerror{
  width: 225px;
  font-size: 20px;
  margin: 0px;
}

h2{
  font-size: 30px;
  margin-bottom: 15px;
}

form{
  padding-top: 25px;
  padding-bottom: 35px;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap:10px;
  font-size: 25px;
  align-items: center;
}

textarea{
width:225px;
height:35px;
font-size: 20px;
padding-top: 5px;
}

button{
  margin-top: 10px;
  width:100px;
  height:35px;
  border-radius: 5px;
}

`;


export default Login

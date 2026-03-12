import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

function Registeruser() {
    const navigate=useNavigate();
    const[error, seterror]=useState("")
    const[inputemail,setinputemail]=useState("")
    const[inputusername,setinputusername]=useState("")
    const[inputpass, setinputpass]=useState("")

    const handleregister=async(e)=>{
        seterror("")
        e.preventDefault();

       try {
         const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/registeruser`,{
             method:"POST",
             credentials:"include",
             headers:{
                 "content-type":"application/json"
             },
             body:JSON.stringify({email:inputemail, username:inputusername, password:inputpass})
         })
 
         const data=await response.json();
         if(response.status===200){
             alert("User created successfully")
             setinputemail(""); setinputusername(""); setinputpass("");
             navigate("/login")
         }
 
         else{
            seterror(data.message)
             
         }
       } catch (error) {
            console.log(error)
       }
    }




  return (
    <Container>

        <div className='container0'>
            <h2>Create account</h2>
        </div>

        <Container1>
        <form>

            <div>
            <label>Email</label><br></br>
            <input className='inputemail'
            value={inputemail}
            onChange={(e)=>{setinputemail(e.target.value); seterror("")}}
            ></input>
            </div>

            <div>
            <label>Username</label><br></br>
                <input className='inputusername'
                value={inputusername}
                onChange={(e)=>setinputusername(e.target.value)}
                ></input>
            </div>


            <div>
            <label>Password</label><br></br>
            <input className='inputpass'
            type="password"
            value={inputpass}
            onChange={(e)=>{setinputpass(e.target.value); seterror("")}}
            ></input>
            <p>{error}</p>
            </div>

            <div className='actions'>
            <button className='cancelbtn' type="button" onClick={()=>navigate("/setting")}>Cancel</button>
            <button className='registerbtn' type="button" onClick={(e)=>handleregister(e)}>Register</button>
            </div>
        </form>
        </Container1>
      
    </Container>
  )
}

const Container=styled.div`
display: flex;
flex-direction: column;
.container0{


padding-left: 50px;
padding-top: 30px;
}

form{
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    padding: 50px;
    gap: 30px;


}
`;

const Container1=styled.div`
display: flex;
flex-direction: column;

justify-content: center;
align-items: center;
height: 70vh;


label{
    font-size: 20px;
}
.inputemail{
    width:225px;
height:35px;
font-size: 20px;
padding-top: 5px;
}

.inputusername{
    width:225px;
height:35px;
font-size: 20px;
padding-top: 5px;
}

.inputpass{
    width:225px;
height:35px;
font-size: 20px;
padding-top: 5px;
}
.actions{
    display: flex;
    flex-direction: row;
    column-gap: 30px;
}

.registerbtn{
        height: 30px;
        width:120px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
    }


    .cancelbtn{
        height: 30px;
        width:60px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
    }

`;


export default Registeruser

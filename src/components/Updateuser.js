import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
function Updateuser() {
    const[error,seterror]=useState("")
    const[inputemail, setinputemail]=useState("")
    const[inputusername, setinputusername]=useState("")
    const navigate=useNavigate();

    const handleupdateuser= async(e)=>{
        seterror("")
        e.preventDefault();
      try {
         const response= await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/updateuser`,{
              method:"PUT",
              credentials:"include",
              headers:{
                  "content-type":"application/json"
              },
              body:JSON.stringify({email:inputemail, username:inputusername})
          })
  
          const data= await response.json();
          if(response.status===200){
              alert("User details updated successfully")
              navigate("/setting");
          }
          else{
            seterror(data.message);
              alert(data.message)
          }
      } catch (error) {
            console.log(error)
      }
    }
    
  return (
    <Container>
        <div className='container0'>
            <h2>Update username and email</h2>
        </div>

        <Container1>

        <form>

            <div>
            <label>Email:</label><br></br>
            <input className='inputemail'
            value={inputemail}
            onChange={(e)=>{setinputemail(e.target.value); seterror("")}}
            ></input>
            </div>

            <div>
            <label>Username:</label><br></br>
            <input className='inputusername'
            value={inputusername}
            onChange={(e)=>{setinputusername(e.target.value); seterror("")}}
            ></input>
            <p>{error}</p>
            </div>

            
            <div className='actions'>
            <button className='cancelbtn' type='button' onClick={()=>navigate("/setting")}>Cancel</button>
            <button className='updatedetailsbtn' type='button' onClick={(e)=>handleupdateuser(e)}>Update Details</button>
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


.actions{
    display: flex;
    flex-direction: row;
    column-gap: 30px;
}

.updatedetailsbtn{
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



export default Updateuser

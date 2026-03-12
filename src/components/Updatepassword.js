import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import styled from 'styled-components'
function Updatepassword(props) {
    const[error,seterror]=useState("")
    const[oldpass,setoldpass]=useState("");
    const[newpass,setnewpass]=useState("");
    const[confirmpass,setconfirmpass]=useState("");
    const navigate=useNavigate();

    const handleupdatepassword=async(e)=>{
        props.loading(30);
        seterror("")
        e.preventDefault();
        
        if (newpass !== confirmpass) {
            
            return seterror("New passwords do not match!")
        }
       try {
         
 
         const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/updatepassword`,{
             method:"PUT",
             credentials:"include",
             headers:{
             "Content-Type":"application/json",
             },
             body:JSON.stringify({oldpassword:oldpass, newpassword:newpass})
         })
             const data=await response.json();
             if(response.ok){
                 alert("password changed successfully")
                 navigate("/setting")
             }
             else{
                seterror(data.message)
                
             }
       } catch (error) {
            seterror(error)
            console.log(error)
       }

    } 



  return (

    <Container>
            <div className='container0'>
            <h2>Update Password</h2>
            </div>

            <Container1>
            <form onSubmit={handleupdatepassword}>

                <div className="input-group">
                    <label>Current Password:</label><br></br>
                    <input className='inputcurrentpass'
                        type="password" 
                        value={oldpass} 
                        onChange={(e) =>{ setoldpass(e.target.value) ; seterror("")} }
                        required 
                    />
                </div>

                <div className="input-group">
                    <label>New Password:</label><br></br>
                    <input className='inputnewpass'
                        type="password" 
                        value={newpass} 
                        onChange={(e) => {setnewpass(e.target.value); seterror("")}} 
                        required 
                    />
                </div>

                <div className="input-group">
                    <label>Confirm Password:</label><br></br>
                    <input className='inputconfirmpass'
                        type="password" 
                        value={confirmpass} 
                        onChange={(e) =>{ setconfirmpass(e.target.value); seterror("")}} 
                        required 
                    />
                    <p>{error}</p>
                </div>

                <div className="actions">
                    
                <button  className='cancelbtn' type="button" onClick={() => navigate("/setting")}>Cancel</button>
                <button className='savepassbtn' type="submit">Save Password</button>
                   
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
.inputcurrentpass{
    width:225px;
height:35px;
font-size: 20px;
padding-top: 5px;
}

.inputnewpass{
    width:225px;
height:35px;
font-size: 20px;
padding-top: 5px;
}

.inputconfirmpass{
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

.savepassbtn{
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

export default Updatepassword

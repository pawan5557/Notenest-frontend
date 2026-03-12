import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
function Createnote() {
    const [title, settitle]=useState("");
    const [tag, settag]=useState("");
    const [content, setcontent]=useState("");
    const navigate=useNavigate();
    const makenote=async(e)=>{
        e.preventDefault();
        try {
            const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/createnotes`,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify({title:title, content:content, tag:tag})
            })
            const data=await response.json();
            if(response.status===200){
                alert("note saved successfully")
                console.log(data.message)
                navigate("/fetchnotes");
            }
            else{
                alert("some fault occured while saving")
            }
        } catch (error) {
            console.log(error)
        }

    }


  return (
    <Container0>
        <div className='container2'>
        <button onClick={()=>navigate("/fetchnotes")}>Back</button>
        <div className='container2-1'>
        <button className='savebtn' onClick={(e)=>makenote(e)}>Save</button>
        </div>
        </div>


        <div className='container3'>

            
            <input className='inputtitle'
            placeholder='Title'
            value={title}
            onChange={(e)=>settitle(e.target.value)}
            ></input>
        </div>

        <div>
            
            <input className='inputtag'
            placeholder='Tag'
            value={tag}
            onChange={(e)=>settag(e.target.value)}
            ></input>
        </div>

        <div>
            
            <textarea className='inputcontent'
            placeholder='Content'
            value={content}
            onChange={(e)=>setcontent(e.target.value)}
            ></textarea>
        </div>

        
     
    </Container0>
  )
}

const Container0=styled.div`
display: flex;
flex-direction: column;
padding: 30px;



.inputtitle{
    border: none;        /* Removes the default border */
    outline: none;       /* Removes the blue/black box when you click to type */
    background: transparent; /* Ensures no background box is visible */
    width: 100%;
    font-weight: 700;
    font-size: 26px !important;
}



.inputtag{
    
   
    border: none;        /* Removes the default border */
    outline: none;       /* Removes the blue/black box when you click to type */
    background: transparent; /* Ensures no background box is visible */
    width: 100%;
    font-size: 18px !important;
    font-weight: 500 !important;
    margin-top: 5px;
    font-family: inherit;
    
}


.inputcontent{
    margin-top: 20px;
    font-size: 19px;
    border: none;        /* Removes the default border */
    outline: none;       //Removes the blue/black box when you click to type
    background: transparent; /* Ensures no background box is visible */
    width: 100%;
    min-height: calc(100vh - 150px);
}


.container3{
    display: flex;
    flex-direction: column;
    
}


.container2{
    display: flex;
    flex-direction: row;
    max-width: 1380px;
    row-gap: 100px;
    justify-content: space-between;
    margin-bottom: 35px;
    button{
        height: 30px;
        width:60px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
    }
}

.container2-1{
    display: flex;
    flex-direction:row;
    gap: 20px;
.savebtn{
        height: 30px;
        width:110px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
    }
    
}
`;
export default Createnote

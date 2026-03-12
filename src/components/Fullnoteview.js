import React from 'react'
import { useState } from 'react'
import { useNavigate,  useParams } from 'react-router-dom'
import { useEffect } from 'react';
import styled from 'styled-components';


function Fullnoteview(props) {
    const {id}=useParams();
    const [fullviewnote, setfullviewnote]=useState(null);
   
    const navigate=useNavigate();
    





    useEffect(()=>{
        const fetchfullviewnote= async()=>{ 
            try {
               const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/fetchnotes`,{
                   method:"GET",
                   credentials:"include"
               })
       
               const data= await response.json();
       
               const isspecificnotefound= data.notes.find((eachnote)=>{
                   
                   if(eachnote._id===id){
                       console.log("note found");
                       return true;
                   }
                  
                   else{
                       console.log("note not found");
                       return false;
                   }
               })
               setfullviewnote(isspecificnotefound);
       
       
            } catch (error) {
               console.log(error)
            } 
           }
       
           fetchfullviewnote();


    }, [id]);

    







    const handledelete =async()=>{
        try {
          console.log("Button Clicked! Function is running...");
            const wannadelete=window.confirm("do you wanna delete the note");
            if(wannadelete){
    
                const response=await fetch(`http://localhost:5000/users/deletenotes/${id}`,{
                    method:"DELETE",
                    credentials:"include"
                })
        
                
                if(response.ok){
                    
                    alert("note deleted");
                    navigate("/fetchnotes");
                }
                else{
                    alert("failed to delete the note");
                }
    
            }
    
            else{
                
            }
        } catch (error) {
            console.log(error)
        }
       
    
    }






   




    if (fullviewnote === null) {
        return <h2>Loading your note...</h2>;
    }
    return (
    <Container>
      
            <div className='container0'>
                <button onClick={()=>{navigate(-1)}}>Back</button>
                <div className='container0_1'>
                <button onClick={()=>handledelete()}>Delete</button>
                <button onClick={()=>navigate(`/updatenote/${id}`)}>Edit</button>
                
                </div>
            </div>

          
            <div className='container1'>
            <h3>{fullviewnote.title}</h3>
            <h5>{fullviewnote.tag}</h5>
            <p>{fullviewnote.content}</p>
            </div>
            
            
        
    </Container>
  )

}

const Container=styled.div`
display: flex;
flex-direction: column;
padding: 30px;
row-gap: 30px;
position: relative;

.container0{
    display: flex;
    flex-direction: row;
    
    max-width: 1380px;
   
    justify-content: space-between;

    button{
        height: 30px;
        width:60px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
    }
    
}

.container0_1{
    display: flex;
    flex-direction: row;
    /* position: absolute;
    top:30px;
    left:1380px; */


    gap: 20px;
}

.container1{
    display: flex;
    flex-direction: column;

}

h3{
    font-size: 26px;
}
h5{
    font-size: 18px;
    margin-top: 5px;
}

p{
    font-size: 19px;
    margin-top: 20px;
    white-space: pre-wrap;
}
`;

export default Fullnoteview

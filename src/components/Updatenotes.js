import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

function Updatenotes(props) {
    const [isediting, setisediting]=useState(true)
    
    const [editdata, seteditdata]=useState({title:"", tag:"", content:"" })
    const navigate=useNavigate();
    const { id } = useParams();




    useEffect(() => {
      const fetchOriginalNote = async () => {
        props.loading(30);
          try {
              const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/fetchnotes`, {
                  method: "GET",
                  credentials: "include"
              });
              const data = await response.json();
              
              // Find the specific note using the ID from the URL
              const yolo=  data?.notes?.find(n => n._id === id);
               if (yolo) {
                seteditdata({
                    title: yolo.title,
                    tag: yolo.tag,
                    content: yolo.content
                })}
             
          } catch (error) {
              console.log("Error fetching original note:", error);
          }
      };
  
      fetchOriginalNote();
  }, [id]); // Only run once when the component loads (or if id changes)










    const handleupdate=async(e)=>{
        e.preventDefault();
       try {
         const response= await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/updatenotes/${id}`,{
             method:"PUT",
             headers:{
                 "Content-Type":"application/json"
             },
             credentials:"include",
             body:JSON.stringify({title: editdata.title, tag: editdata.tag, content:editdata.content}),
 
 
         })
 
         const data=await response.json();
             if(response.status===200){
                 alert("note saved successfully")
                 console.log(data.message)
                 
              // Update the "Vault" with the "Scratchpad"
             setisediting(false);
             }
             else{
                 alert("some fault occured while saving")
             }
       } catch (error) {
            console.log(error)
       }
    }

    if (!editdata.title && !isediting) {
      return <h2>Loading note data...</h2>;
  }







  const handledelete =async()=>{
    try {
      console.log("Button Clicked! Function is running...");
        const wannadelete=window.confirm("do you wanna delete the note");
        if(wannadelete){

            const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/deletenotes/${id}`,{
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













  return (
    <div>
       
                
       
        
    

                {(isediting)?(
                    
                  <Container0>

                    <div className='container2'>
                    <button onClick={()=>setisediting(false)}>Cancel</button>
                    <div className='container2-1'>
                    <button onClick={()=>handledelete()}>Delete</button>
                    <button className='savechangesbtn' onClick={(e)=>handleupdate(e)}>Save Changes</button><br></br>
                    </div>
                    </div>
  

                  <div className='container3'>
                  <input className='inputtitle'
                  value={editdata.title}
                  placeholder="Title"
                  onChange={(e)=>seteditdata({...editdata, title:e.target.value})}></input>
  
                  <input className='inputtag'
                  value={editdata.tag}
                  placeholder="Tag"
                  onChange={(e)=>seteditdata({...editdata, tag: e.target.value})}
                  ></input>
  
                  <textarea className='inputcontent'
                  value={editdata.content}
                  placeholder="Content"
                  onChange={(e)=>seteditdata({...editdata, content:e.target.value})}
                  ></textarea><br></br>
                    </div>
                    
                  
                  </Container0>
  
                ):(
                  <Container>
                    <div className='container0'>
                    <button onClick={()=>{navigate("/fetchnotes")}}>Back</button>
                    <div className='container0_1'>
                    
                    <button onClick={()=>handledelete()}>Delete</button>
                    <button onClick={()=>setisediting(true)}>Edit</button>
                    {/* <button onClick={() => { console.log("LIVE WIRE!"); handledelete(); }}>Delete</button> */}
                    {/* <button onClick={()=>{handledelete()}}>Delete</button> */}
                    </div>
                    </div>
                    <div className='container1'>
                    <h3>{editdata.title}</h3>
                    <h5>{editdata.tag}</h5>
                    <p>{editdata.content}</p>
                    </div>
                    </Container>
                )}
                
    </div>
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
.savechangesbtn{
        height: 30px;
        width:110px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
    }
    
}











`;

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

export default Updatenotes

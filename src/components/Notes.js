import React, { useState, useEffect } from 'react' // Added useEffect import
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Notes(props) {
    const [notes, setnotes] = useState([]);
    const navigate=useNavigate();
    // Rectified: Wrap your call in useEffect
    useEffect(() => {
        fetchnotes();
    }, [props.log]);

    const fetchnotes = async () => {
        try {
            // Rectified: Assigned the fetch to the 'response' variable
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/fetchnotes`, {
                method: "GET",
                credentials: "include"
            });
            
            const data = await response.json();

            if (response.status === 200) {
                setnotes(data.notes);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log("Fetch error:", error);
        }
    };



    return (
        <Container>
            
            <h2>Your Notes-</h2>
            <button className="createnotebtn"onClick={()=>navigate("/createnote")}>Create note</button>
            {(notes.length===0) ?(<h3>Create a note, currently you have no notes created!</h3>):(
                <div className='container0'>
                  {notes.map((banana) => {
              
                    return (
                        
                        <div className='container1' key={banana._id}>
                        <div className='container2' >
                            <h3>{banana.title}</h3>
                            <p>{banana.content}</p>
                            <button onClick={()=>{navigate(`/note/${banana._id}`)}}>Read More</button>
                        </div>
                        </div>
                        
                    );
                })}
           </div> ) }
          
        </Container>
    );
}


const Container=styled.div`
padding-left: 25px;
padding-top: 20px;
padding-bottom: 20px;
padding-right: 20px;
display: flex;
flex-direction: column;
position: relative;
row-gap: 50px;


.container0{
    display: flex;
    flex-direction: row;
    row-gap: 30px;
    column-gap: 25px;
    flex-wrap: wrap;
    
}
.createnotebtn {
    position: absolute; /* 2. Take it out of the normal flow */
    top: 25px;          /* 3. Distance from top */
    right: 40px;        /* 4. Distance from right */
    width: 100px;
    height: 35px;
    cursor: pointer;
    border-radius: 8px;
  }
.container1{
    display: flex;
    
    border: 1px solid black;
    border-radius: 10px;
    transition: 0.3s;
    width: 350px;
    height: 252px;
    column-gap: 10px;
    
    
   
}

.container2{
    display: flex;
    /* flex-direction: row; */
    flex-direction: column;
    flex-wrap: wrap;
    text-align: left;
    align-items: flex-start;
    /* justify-content: left; */
    overflow: hidden;
    padding-left: 10px;
    row-gap: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    
    h3{
        margin: 0px;
        overflow: hidden;
        width: 100%;
        text-overflow: ellipsis;
    }

    p {
        margin: 0px;
        /* ADD THESE 5 LINES FOR TRUNCATION */
        display: -webkit-box !important;
        -webkit-line-clamp: 7;    /* The number of lines you want to show */
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: pre-wrap;
        
        /* Optional: adjust line height and width for a cleaner look */
        line-height: 1.5;
        min-height: 50px;
        max-width: 100%;
        /* word-break: break-word; */
        text-align: left; /* Usually looks better for long paras */
    }

    button{
    margin-top: auto; /* Pushes button to the bottom of the box */
    cursor: pointer;
    background: none;
    border: 1px solid blue;
    height: 25px;
    width:75px;
    margin-left: -4px;
    margin-bottom: 1px;
    border-radius: 8px;
    }
}
`;

export default Notes;
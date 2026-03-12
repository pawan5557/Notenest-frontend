import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Navbar(props) {

  const isHomePage = window.location.pathname === "/";
  const navigate=useNavigate();
  const handlelogout=async()=>{
     try {
       const response= await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/logout`,{
           method:"POST",
           headers:{
               "content-type":"application/json"
           },
           credentials:"include",
       })
       const data = await response.json();

       if(response.ok ){
        sessionStorage.removeItem("isLoggedIn")
        alert("user logged out")
        props.setlog(false)
        navigate("/")
        
        
        
           
           
       }
       else{
         // Read the actual error message
    alert("Backend Error: " + data.message);
        
       }
     } catch (error) {
      console.log(error)
     }
  }




    if(props.log===false){
      return(
        <div>
      <Navbarcontainer>
      <Link to="">NoteNest</Link>
      <Link to="/login">Login</Link>
      </Navbarcontainer>
      {/* This logic says: ONLY show the video if we are on the Home page */}
      {isHomePage && (
          <Videocontainer>
            <video autoPlay loop muted playsInline className="bgvideo">
              <source src="/Notenest.mp4" type="video/mp4" />
            </video>
          </Videocontainer>
        )}


</div>
      )
    }

    else{
      return(
       <div>




      <Navbarcontainer>
      <Link to="">NoteNest</Link>
      <button onClick={()=>handlelogout()}>Logout</button>
      {/* <Link to="/" onClick={()=>handlelogout()}>Logout</Link> */}
      
      <Link to="/setting">Settings</Link>
      </Navbarcontainer>

      


      
      </div> 
      
      )
    }
    
  
}

const Videocontainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  background-color: black;

  /* 1. Turn on Flexbox here */
  display: flex;
  justify-content: center; /* This handles the horizontal centering automatically! */

  .bgvideo {
    position: absolute;
    bottom: -90px;
    left: 0;
    width: 100%;  
    height: auto; 
  }

  /* 📱 MOBILE PORTRAIT */
  @media (orientation: portrait) {
    .bgvideo {
      /* 2. Let Flexbox take control instead of 'absolute' */
      display: flex;
      justify-content: center;
      align-items: center;
      height: 500px;
      width: 500px;
      
      /* Reset desktop tweaks */
      bottom: 150px; 
      left: -70px;
    }
  }

  @media (orientation: landscape) and (max-width: 900px) {
    .bgvideo {
      /* 2. Let Flexbox take control instead of 'absolute' */
      display: flex;
      justify-content: center;
      align-items: center;
      height: 500px;
      width: 500px;
      
      /* Reset desktop tweaks */
      bottom: -70px; 
      left: 150px;
    }
  }



`;







const Navbarcontainer=styled.div`

  display: flex;
  gap: 20px;
  background-color: black;
  height:30px;
  align-items: center;
  
/* STICKY LOGIC START */
position: fixed;   /* Keeps it in one place relative to the screen */
  top: 0;            /* Sticks it to the very top */
  left: 0;           /* Ensures it starts from the left edge */
  width: 100%;       /* Makes it span the full width of the screen */
  z-index: 1000;     /* Ensures it stays on top of other content */
  /* STICKY LOGIC END */

a{
color: aliceblue;
text-decoration: none;
margin-left: 20px;
}

button{
  background-color: transparent;
  
  border: none;
  color: white;
  cursor: pointer;
  outline: none;
  text-shadow: none;
  box-shadow: none;
}
`;

export default Navbar

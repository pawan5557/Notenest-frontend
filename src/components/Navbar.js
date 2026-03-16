import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Navbar(props) {

  const isHomePage = window.location.pathname === "/";
  const navigate=useNavigate();

  const handlelogout=async()=>{
     try {

       // logout API was used for cookie-based authentication
       // const response= await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/logout`,{
       //     method:"POST",
       //     headers:{
       //         "content-type":"application/json"
       //     },
       //     credentials:"include",
       // })
       // const data = await response.json();

       // if(response.ok ){

        // remove stored login information
        sessionStorage.removeItem("isLoggedIn")
        sessionStorage.removeItem("token")

        alert("user logged out")
        props.setlog(false)
        navigate("/")

       // }
       // else{
       //   alert("Backend Error: " + data.message);
       // }

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

  display: flex;
  justify-content: center;

  .bgvideo {
    position: absolute;
    bottom: -90px;
    left: 0;
    width: 100%;  
    height: auto; 
  }

  @media (orientation: portrait) {
    .bgvideo {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 500px;
      width: 500px;
      bottom: 150px; 
      left: -70px;
    }
  }

  @media (orientation: landscape) and (max-width: 900px) {
    .bgvideo {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 500px;
      width: 500px;
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
  
position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;

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
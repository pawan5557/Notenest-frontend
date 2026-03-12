import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

function Settings(props) {
  props.loading(30);
    const navigate=useNavigate();
  return (
    <div>
      <Container0>
      <button onClick={()=>navigate("/fetchnotes")}>Back</button>
      </Container0>
    <Container>

      <button className='updatepassbtn' onClick={()=>navigate("/updatepassword")}>Change Password</button>
      <button className='updateuserbtn' onClick={()=>navigate("/updateuser")}>Change username and email</button>
      <button className='registeruserbtn' onClick={()=>navigate("/registeruser")}>Create account</button>
      <button className='deleteuserbtn' onClick={()=>navigate("/deleteuser")}>Delete account</button>

    </Container>
    </div>
  )
}

const Container0=styled.div`
padding-top: 30px;
padding-left: 30px;
button{
  height: 30px;
        width:60px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
}
`;


const Container=styled.div`
display: flex;
flex-direction: column;
justify-content: center; //x-axis
align-items: center;
margin: 0px;
padding: 0px;

height: 80dvh;

  
  /* This kills the scroll ONLY for this component */
  overflow: hidden; 
  
  /* Ensure padding/border don't grow the box */
  box-sizing: border-box; 
  
  gap: 20px;

  button{
    margin: 0px;
    height: 50px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 20px;
  }

  .updatepassbtn{
    width:200px;
    

  }
  .updateuserbtn{
    width:200px
  }
  .registeruserbtn{
    width:200px;
  }
  .deleteuserbtn{
    width:200px;
  }

`;

export default Settings
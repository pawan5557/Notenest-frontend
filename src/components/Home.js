import React from 'react'
import styled from 'styled-components';

function Home() {
  return (
    
      <div>
      

<Videocontainer>
<video key="bg-video" autoPlay loop muted={true} playsInline className="bgvideo">
  <source src="/Notenest.mp4" type="video/mp4" />
</video>
</Videocontainer>
</div>
    
  )
}


const Videocontainer=styled.div`

  width: 100%;
  height: 100vh; /* Entire screen height */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .bgvideo{
    
    position: absolute;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -1; /* Pushes video behind the text */
    object-fit: cover; /* Crucial: ensures video fills screen without stretching */
  }
`;






export default Home

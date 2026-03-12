import React, { useEffect } from 'react' // 1. Added useEffect to imports
import { useNavigate } from 'react-router-dom'

function Deleteuser({setlog}) { // Added props to catch setlog
    const navigate = useNavigate();

    // 2. Wrap your logic in useEffect so it runs once on mount
    useEffect(() => {
        const handledeleteuser = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/deleteuser`, {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "content-type": "application/json"
                    }
                })
                
                const data = await response.json();
                
                if (response.status === 200) {
                    alert("Account deleted")
                    setlog(false) // Update Navbar state
                    navigate("/login")
                } else {
                    alert(data.message)
                    
                }
            } catch (error) {
                console.log(error)
            }
        }

        handledeleteuser(); // 3. Call the function inside the effect
    }, [navigate, setlog]); // 4. Empty dependency array ensures it only runs ONCE

    return (
        <div>
            <h1>Deleting your account, please wait...</h1>
        </div>
    )
}

export default Deleteuser
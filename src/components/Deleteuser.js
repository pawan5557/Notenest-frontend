import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Deleteuser({setlog}) {
    const navigate = useNavigate();

    useEffect(() => {
        const handledeleteuser = async () => {
            try {

                // get stored token
                const token = sessionStorage.getItem("token");

                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/deleteuser`, {
                    method: "DELETE",

                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    // cookie authentication not needed anymore
                    // credentials: "include",
                })
                
                const data = await response.json();
                
                if (response.status === 200) {
                    alert("Account deleted")

                    // remove stored login state
                    sessionStorage.removeItem("token")
                    sessionStorage.removeItem("isLoggedIn")

                    setlog(false)
                    navigate("/login")

                } else {
                    alert(data.message)
                }

            } catch (error) {
                console.log(error)
            }
        }

        handledeleteuser();

    }, [navigate, setlog]);

    return (
        <div>
            <h1>Deleting your account, please wait...</h1>
        </div>
    )
}

export default Deleteuser
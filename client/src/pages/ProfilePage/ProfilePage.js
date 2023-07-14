import { useNavigate, Navigate } from "react-router-dom";
// import {useParams} from "react-router-dom";
import React, {useState, useEffect} from 'react';  
import axios from "axios";

import useToken from "src/hooks/useToken";
// import useUserFetcher from "src/hooks/useUserFetcher";

import Profile from "src/components/Profile/Profile";

// import "./ProfilePage.css";


function ProfilePage( {apiURL} ) {
    // const { _id } = useParams();
    const [Loading, setIsLoading] = useState(false);
    const { token, setToken} = useToken();
    const [user, setUser] = useState([]);
    const navigate = useNavigate();


    // useEffect(() => {
    //     const loadUser = async () => {
    //         await axios.get("http://localhost:8080/api/v1/users/63d29f6cb06aae132e00ee3c")
    //         .then(res => {
    //             console.log(res);
    //             console.log(res.data);
    //             setUser(res.data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //     }
    //     loadUser();
    // }, []);

    useEffect( () => { 
        const loadUser = async () => { 
            try { 
                const apiResponse = await axios.get(apiURL + '/users/63d29f6cb06aae132e00ee3c') 
                // await console.log(apiResponse.data); 
                await console.log(apiResponse.data);                         
                setUser((dataUser) => [apiResponse.data]); 
            } 
            catch (error) { 
                console.log(`Error: ${error}`); 
            } 
            finally { 
                setIsLoading(false); 
            } 
        }; 
        // set isload to true 
        setIsLoading(true); 
        loadUser(); 
    }, []);

    const logOut = (event) => {
       localStorage.removeItem("accessToken");
       navigate("/");
    }

    // If there isn't a token set dont let the user see the page
    if (!token) {
        // Redirect to the root route
        return <Navigate replace to ="/" />
    } else {
        return (
            <>
            <div>
                {user.map( (user) => 
                <Profile
                    name = {user.name.first}
                    email = {user.email}
                    phone = {user.phone}
                    picture = {user.picture.large}
                    streetNum = {user.location.street.number}
                    streetName = {user.location.street.name}
                    city = {user.location.city}
                    state = {user.location.state}
                    dob = {user.dob.date}
                />
                )}
            </div>
            </>
        )
    }
}

export default ProfilePage;
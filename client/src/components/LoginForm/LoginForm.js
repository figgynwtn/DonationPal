import { useState, useContext } from "react";
import { APIURLContext } from "src/contexts/APIURLContext";
import axios from "axios";
import useToken from "src/hooks/useToken";
import { useNavigate, Navigate } from "react-router-dom";

import "./LoginForm.css";

export default function LoginForm () {
    const [inputs, setInputs] = useState({});
    const apiURL = useContext(APIURLContext);
    const {token, setToken} = useToken();
    const navigate = useNavigate();


    if (token) {
        return <Navigate replace to = "/Profile" />
    }

    // Function that posts form data to the api
    async function loginUser(credentials) {
        try {
            let res = await axios.post(apiURL + "/users/login", credentials);
            console.log(res.data);
            return res.data; 

        } catch (err){
            console.log(err);
            return null;
        }
    }

    // // Function that sets accessToken in LocalStorage
    // function setToken(userToken) {
    //     localStorage.setItem('accessToken', JSON.stringify(userToken));
    // }


    // Handler Function for form field changes
    const handleChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setInputs(values => ({...values, [fieldName]: fieldValue}));
    }


    // Handler Function
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Create an object that contains the email and password
        let loginCredentials = {};
        loginCredentials.email = inputs.email;
        loginCredentials.password = inputs.password;
        console.log(loginCredentials);
        const loginResponse = await loginUser(loginCredentials);
        console.log(`Login Response: ${loginResponse.email}`);
        if (loginResponse == null) {
            alert("That username and password in invalid");     
        } else {
            // alert(`Your access token is ${loginResponse.accessToken}`);
            setToken(loginResponse.accessToken);
            navigate(`/Profile`);
        }
    }


    return (
        <form method = "post" onSubmit = {handleSubmit} id = "login-form">
            <label>Email:
                <br></br> 
                <input 
                type = "text"
                value = {inputs.email || ""}
                name = "email"
                onChange={handleChange}
                />
            </label>
            <label>Password: 
                <br></br>
                <input 
                type = "password"
                value = {inputs.password || ""}
                name = "password"
                onChange = {handleChange}
                />
            </label>
            <input type = "submit" value="Log In"></input>
        </form>
    )
}
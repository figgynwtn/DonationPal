import "./ProfilePage.css";

import { useNavigate, Navigate } from "react-router-dom";

function Profile({name, picture, email, phone, streetNum, streetName, city, state, dob}) {
    const navigate = useNavigate();


    const logOut = (event) => {
        localStorage.removeItem("accessToken");
        navigate("/");
     }
    return(
        <>
        <div className="profile">
            <h1>My Profile</h1>
            
            <div className="profileCard">
                <h3>Hello, {name}</h3>
                <img id = "profile" src = {picture} alt="profile pic"/>
                <h3>Email: {email}</h3>
                <h3>Phone: {phone}</h3>
                <h3>Address: {streetNum} {streetName}., {city}, {state}</h3>
                <h3>DOB: {JSON.stringify(dob)}</h3>
                <h3 id ="yourDonations">Your Donations</h3>
                <div className="userDonations">
                    <div className="yourDonationCard">
                        <p>"Help a single mother pay for her daughter's medical expenses."</p>
                        <p>Amount: 150</p>
                        <p>Date: 2/13/2023</p>
                    </div>
                    <div className="yourDonationCard">
                        <p>"Support a student's dream of studying abroad."</p>
                        <p>Amount: 550</p>
                        <p>Date: 1/03/2023</p>
                    </div>
                    <div className="yourDonationCard">
                        <p>"Assist a small business owner affected by COVID-19."</p>
                        <p>Amount: 300</p>
                        <p>Date: 1/29/2023</p>
                    </div>
                </div>
            </div>
            <button className = "logout" onClick={logOut}>Log Out</button>
        </div>
        </>
    )
}

export default Profile;
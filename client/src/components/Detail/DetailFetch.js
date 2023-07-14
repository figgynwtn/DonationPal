import React, {useState, useEffect} from 'react';  
import {useParams} from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { APIURLContext } from 'src/contexts/APIURLContext';

import "./DetailFetch.css";
import "src/hooks/useDonationFetch";
import useDonationFetch from 'src/hooks/useDonationFetch';
import Donation from "./Donation";


function DetailFetch() {

    // Get the API URL from the context
    const APIURL = useContext(APIURLContext);

    const { _id } = useParams();
    const [details, setDetails] = useState([]);
    const [donation] = useDonationFetch(`http://localhost:8080/api/v1/donations/campaigns/${_id}`);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/campaigns/${_id}`)
            .then(res => {
                console.log(res);
                setDetails(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <>
        <div className='details'>

            <h1 key = {details._id}>{details.name}</h1>
            <h2>{details.description}</h2>
            <h3>Goal: {details.goal}</h3>
            <h4>Start: {details.start_date}</h4>
            <h4>End: {details.end_date}</h4>
            <form action = {APIURL + "/donations/create_checkout"} method = "POST" id = "checkout">
                <input type = "hidden" name = "campaign_id" value = {details._id}></input>
                <input type = "hidden" name = "campaign_name" value = {details.name}></input>
                <input type = "hidden" name = "donation_amount" value = '3000'></input>
                <button type = "submit" className = "donateButton">
                    Donate $30 
                </button>
            </form>
        </div>
        {/* <div>
            <form action = {APIURL + "/donations/create_checkout"} method = "POST">
                <input type = "hidden" name = "campaign_id" value = {details._id}></input>
                <input type = "hidden" name = "campaign_name" value = {details.name}></input>
                <input type = "hidden" name = "donation_amount" value = '3000'></input>
                <button type = "submit">
                    Donate $30 
                </button>
            </form>
        </div> */}
        <div className='donations'>
            <h1 className='donation'>Donations</h1>
            <div className='divider2'></div>
            {donation.map((c) => (
                <Donation 
                    key={c._id}
                    message={c.message}
                    amount={c.amount}
                    date={c.date}
                />
            ))} 
        </div>
        </>
    )
}

export default DetailFetch;
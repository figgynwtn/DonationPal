import {useState, useEffect} from 'react';  
import axios from "axios";

function useDonationFetch(donationSource) {
    const [donations, setDonations] = useState([]);

    useEffect( () => {
            axios.get(donationSource)
                .then(res => {
                    console.log(res);
                    setDonations(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
    }, []);

    return [donations];
}


export default useDonationFetch;

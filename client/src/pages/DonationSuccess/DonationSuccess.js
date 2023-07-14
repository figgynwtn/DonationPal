import { useEffect, useState, useContext} from 'react';
import { useSearchParams } from 'react-router-dom';
import { APIURLContext } from 'src/contexts/APIURLContext';
import useGetOneCampaign from 'src/hooks/useGetOneCampaign';

import './/DonationSuccess.css';

function DonationSuccess() {
    // Set Up State 
    const [campaign, setCampaign] = useState({});

    // Get the APIURL from context
    const apiURL = useContext(APIURLContext);

    // Get the campaign ID from querystring
    const [searchParams, setSearchParams] = useSearchParams();
    const campaignID = searchParams.get('campaign_id');
    const donationAmount = searchParams.get("donation_amount");

    // Use the custom hook to get the data about a campaign
    const [loading, error, campaigndata] = useGetOneCampaign(`${apiURL}/campaigns/${campaignID}`);

    // Use the effect hook to load campaign data into state
    useEffect(() => {
        setCampaign(campaigndata);
    }, [campaigndata]);

    // Return the component data embedded 
    return (
        <div className='success'>
            <h1 className='green'>Donation Success!</h1> 
            <h3>You donated ${donationAmount} to the Campaign "<strong>{campaign.name}"</strong></h3>
        </div>
    )
}

export default DonationSuccess;
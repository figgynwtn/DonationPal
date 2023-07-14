import { useState, useEffect } from 'react';
import axios from 'axios';
import Campaign from 'src/components/Campaign/Campaign';
import './Campaigns.css';

function Campaigns( {apiURL} ) {
    
const [isLoading, setIsLoading] = useState(false);
const [dataCampaigns, setCampaigns] = useState([]);

useEffect( () => {
    //console.log(`My API URL in Campaigns page is ${apiURL}`);
    const loadCampaigns = async () => {
        try {
            // const apiResponse = await axios.get(apiURL + '/campaign/')
            const apiResponse = await axios.get(apiURL + '/campaigns/');
            // await console.log(apiResponse.data);
            await console.log(apiResponse.data);                        
            setCampaigns((dataCampaigns) => [...apiResponse.data]);

        }
        catch (err) {
            console.log(err);
        }
        finally {
            setIsLoading(false);
        }
    };

    // set isload to true
    setIsLoading(true);
    loadCampaigns();
}, []);

return  (
    <div>
        <div>
            {isLoading ? 
                (<span className='loading'>
                    <div className="lds-roller">
                    </div>
                </span>)
                : (
                <>
                    <div>
                        <h1 id = "heading"> Our Campaigns</h1>
                    </div>
                    <div className = "Campaigns-wrapper">
                        {dataCampaigns.map((c) => (
                            <Campaign 
                                key={c._id}
                                id={c._id}
                                name={c.name}
                                goal={c.goal}
                                desc={c.description}
                                start_date={c.start_date}
                                end_date={c.end_date}
                            />
                            ))} 
                    </div>  
                </>
            )}
        </div>
    </div>
)

}

export default Campaigns;
import Campaigns from 'src/pages/Campaigns/Campaigns';
import Header from 'src/components/Header/Header';


function Home( {name, goal, description, start_date, end_date, _id, apiURL}){
    return(
        <div>
            <Header></Header>
            <Campaigns apiURL={apiURL}></Campaigns>
        </div>
    )
}

export default Home;
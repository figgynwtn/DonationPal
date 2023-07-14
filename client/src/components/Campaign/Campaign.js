import 'src/components/Campaign/Campaign.css';

function Campaign( {id, name, goal}){
    return(
        <>
            <div className = "Campaign-card">
                <h3 className="name">{name}</h3>   
                <div className = "bottom">
                     <h4 className="goal">Goal: {goal}</h4>
                     <button className='campButton'><a href={`/Details/${id}`}>More</a></button>
                </div>
            </div>
        </>
    )
}

export default Campaign;
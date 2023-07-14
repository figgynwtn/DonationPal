import 'src/components/Detail/Donation.css';

function Donation( {id, message, amount, date}){
    return(
        <>
            <div className='donationWrapper'>
                <h3>"{message}"</h3>
                <div className = "bottom">
                     <h4 className='amount'>Amount: ${amount}</h4>
                </div>
            </div>
        </>
    )
}

export default Donation;
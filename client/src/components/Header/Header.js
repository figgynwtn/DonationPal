import 'src/components/Header/Header.css';
// import {Link as RouterLink} from 'react-router-dom';


function Header() {
    return(
        <div className='Header-wrapper'>
            <h2>DonationPal</h2>
            {/* <nav>
                <RouterLink to='/' className='Header-Link'>
                    Home
                </RouterLink>
                <RouterLink to='/campaigns' className='Header-Link'>
                    Campaigns
                </RouterLink>
            </nav> */}
            <nav>
                <h4><a href= {`/Home`}>Home</a></h4>
                <h4><a href= {`/Campaigns`}>Campaigns</a></h4>
                <h4 className = "red"><a href= {"/LoginPage"}>Join</a></h4>
            </nav>
        </div>
    )
}

export default Header;
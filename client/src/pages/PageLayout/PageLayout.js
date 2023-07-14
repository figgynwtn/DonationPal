import { Outlet, Link } from "react-router-dom";
import './PageLayout.css';


export default function PageLayout() {
    return (
        <>
        <div className = "layout">
            <nav>
                <ul>
                    <li><Link to = "/">Login</Link></li>
                    <li><Link to = "/Profile">Profile</Link></li>
                </ul>
            </nav>
        </div>
        <Outlet />
        </>
    )
}
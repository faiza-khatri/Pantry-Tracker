import { Link } from "react-router-dom"; //to ensure that the new webpage loads are being handled by react and not sendig new reqs to the server each time.


const NavBar = () => {
    return ( 
        <nav className="navbar">
            <h1>Zee's Bakery</h1>
            <div className="links">
                <Link to="/">View Inventory</Link> 
                {/* have special functionality to block reqs to the server, handles by itself */}
                <Link to="/create">Add Items</Link>
            </div>
        </nav>
     );
}
 
export default NavBar;
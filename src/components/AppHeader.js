import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Appheader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuVisible, setMenuVisible] = useState(true);
    const [adminUser, setAdminUser] = useState(false);

    useEffect(() => {
        if (location.pathname === '/register' || location.pathname === '/login') {
            setMenuVisible(false);
        } else {
            let userId = localStorage.getItem('userId') !== null ? localStorage.getItem('userId') : '';
            if(userId === ''){
                navigate('/login');
            }
            setMenuVisible(true);
            let userRole = localStorage.getItem('userRole') !== null ? localStorage.getItem('userRole') : '';
            if(userRole === 'admin'){
                setAdminUser(true);
            }else{
                setAdminUser(false);
            }
        }
    }, [location])

    return (
        <div>
            {
                menuVisible && <div className="App-header">
                    <Link to="/">Home</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/customer">Customer</Link>
                    {adminUser && <Link to="/user">User</Link>}
                    <Link to="/login" style={{ float: 'right' }}>Logout</Link>
                </div>
            }
        </div>
    );
}

export default Appheader;
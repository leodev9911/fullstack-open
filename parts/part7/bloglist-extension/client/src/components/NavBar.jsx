import { Link } from 'react-router-dom';

const NavBar = ({ user, handleLogout }) => {
    return (
        <nav style={{ display: 'flex', alignItems: 'center', backgroundColor: '#D3D3D3' }}>
            <ul style={{ display: 'flex', gap: '20px', padding: '0', margin: '10px 20px' }}>
                <Link to="/">blogs</Link>
                <Link to="/users">users</Link>
            </ul>
            <div>
                <span style={{ fontWeight: 'bold', marginRight: '10px' }}>{user?.name} logged in</span>
                <button onClick={handleLogout}>logout</button>
            </div>
        </nav>
    );
};

export default NavBar;

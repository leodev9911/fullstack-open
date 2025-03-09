import { NavLink } from 'react-router'

const links = [
    { name: 'Authors', href: '/' },
    { name: 'Books', href: '/books' },
    { name: 'Add Books', href: '/add-books' },
]

export const NavBar = () => {
    return (
        <nav
            style={{
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <div>
                <h1>Library</h1>
            </div>
            <ul 
            style={{ 
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                listStyle: 'none',
            }}
            >
                {
                    links.map((link) => (
                        <li key={link.name}>
                            <NavLink
                                to={link.href}
                                style={({ isActive }) => ({
                                    color: isActive ? 'blue' : 'black',
                                    textDecoration: isActive ? 'underline' : 'none',
                                })}
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
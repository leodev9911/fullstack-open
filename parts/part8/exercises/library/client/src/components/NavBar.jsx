import { NavLink } from 'react-router'
import { useApolloClient } from '@apollo/client'

const links = [
    { name: 'Authors', href: '/' },
    { name: 'Books', href: '/books' },
    { name: 'Add Books', href: '/add-books' },
]

export const NavBar = ({ token, handleSetToken }) => {
    const client = useApolloClient()

    const logout = () => {
        handleSetToken(null)
        localStorage.clear()
        client.resetStore()
    }

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
                    links.map((link) => {
                        if (link.href === '/add-books' && !token) return

                        return (
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
                        )
                    })
                }
                {token
                    ? <>
                        <li>
                            <NavLink
                                to='/recommendations'
                                style={({ isActive }) => ({
                                    color: isActive ? 'blue' : 'black',
                                    textDecoration: isActive ? 'underline' : 'none',
                                })}
                            >
                                Recommendations
                            </NavLink>
                        </li>
                        <li>
                            <button
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </li>
                    </>
                    : <>
                        <li>
                            <NavLink
                                to='/login'
                                style={({ isActive }) => ({
                                    color: isActive ? 'blue' : 'black',
                                    textDecoration: isActive ? 'underline' : 'none',
                                })}
                            >
                                Login
                            </NavLink>
                        </li>
                    </>
                }
            </ul>
        </nav>
    )
}
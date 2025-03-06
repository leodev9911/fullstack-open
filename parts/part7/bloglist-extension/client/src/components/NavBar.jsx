import { useState } from 'react';
import { LogoIcon } from './icons/LogoIcon';
import {
    AppBar,
    Container,
    Toolbar,
    Box,
    Typography,
    Button,
    Menu,
    MenuItem,
    Avatar
} from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

const pages = [
    { title: 'Blogs', href: '/' },
    { title: 'Users', href: '/users' },
]

const NavBar = ({ user, handleLogout }) => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const location = useLocation();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser('');
    }

    const handleUserLogout = () => {
        handleLogout();
        handleCloseUserMenu();
    }

    return (
        <AppBar position="static" >
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{
                        paddingY: '12px'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0' }}>
                        <LogoIcon width="24" height="24" />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                color: 'white'
                            }}
                        >
                            FO Blog List
                        </Typography>
                    </Box>
                    <Box
                        component="ul"
                        style={{
                            display: 'flex',
                            marginLeft: '16px',
                            padding: '0',
                            listStyle: 'none',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        {pages.map((page) => (
                            <li key={page.title}>
                                <Button
                                    sx={{
                                        my: 2,
                                        backgroundColor: location.pathname === page.href
                                            ? 'rgb(73 60 126 / 60%)'
                                            : 'transparent',
                                        '&:hover': {
                                            backgroundColor: 'rgb(73 60 126 / 60%)'
                                        },
                                        margin: '0'
                                    }}
                                >
                                    <NavLink
                                        to={page.href}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'white'
                                        }}
                                    >
                                        {page.title}
                                    </NavLink>
                                </Button>
                            </li>
                        ))}
                    </Box>
                    <Button
                        sx={{
                            margin: '0 0 0 auto',
                            '&:hover': {
                                backgroundColor: 'rgb(73 60 126 / 60%)'
                            }
                        }}
                        onClick={handleOpenUserMenu}
                    >
                        <Typography
                            variant='h6'
                            noWrap
                            component="a"
                            sx={{
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                color: 'white',
                                marginRight: '10px'
                            }}
                        >
                            {user?.name}
                        </Typography>
                        <Avatar
                            alt={`${user?.name}'s avatar`}
                        />
                    </Button>
                    <Menu
                        id="menu-user"
                        anchorEl={anchorElUser}
                        keepMounted
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleUserLogout}>
                            <Typography
                                variant='button'
                                noWrap
                                component="a"
                                sx={{
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    color: 'black',
                                    marginRight: '10px'
                                }}
                            >
                                Logout
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;

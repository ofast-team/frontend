import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
 

import { Link } from 'react-router-dom';


interface LoggedUserProps {
	name: string
}

function LoggedInUser({name}: LoggedUserProps) {
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	return (
		<Box sx={{ flexGrow: 0 }}>
			<Tooltip title="Open settings">
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					<Avatar alt={name} src="/static/images/avatar/2.jpg" />
				</IconButton>
			</Tooltip>
			<Menu
				sx={{ mt: '45px' }}
				id="menu-appbar"
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
			>
				{settings.map((setting) => (
					<MenuItem key={setting} onClick={handleCloseUserMenu}>
						<Typography textAlign="center">{setting}</Typography>
					</MenuItem>
				))}
			</Menu>
		</Box>
	)
}

function LogoTitle() {
	return (
		<Typography
			variant="h6"
			noWrap
			sx={{
				mr: 2,
				display: { xs: 'flex', md: 'none' },
				flexGrow: 1,
				fontFamily: [
					'Raleway',
					'sans-serif',
				].join(','),
				fontWeight: 700,
				letterSpacing: '.4rem',
				color: 'inherit',
				textDecoration: 'none',
			}}
		>
			<Link to="/">O(fast)</Link>
		</Typography>
	)
}

interface pagesProps {
	pages: string[]
}

function NavItems({pages}: pagesProps) {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	return (
		<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
			{pages.map((page) => (
				<Button
					key={page}
					onClick={handleCloseNavMenu}
					sx={{ my: 2, color: '#dafffb', display: 'block' }}
				>
					<Link style={ {fontWeight: 700, letterSpacing: .8, textDecoration: "none", color: "#dafffb"} } to={`/${page}`}>{page}</Link>
				</Button>
			))}
		</Box>
	)
}

function responsiveMenu({pages}: pagesProps) {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	return (
		<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
			<IconButton
				size="large"
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleOpenNavMenu}
				color="inherit"
			>
				<MenuIcon />
			</IconButton>
			<Menu
				id="menu-appbar"
				anchorEl={anchorElNav}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				open={Boolean(anchorElNav)}
				onClose={handleCloseNavMenu}
				sx={{
					display: { xs: 'block', md: 'none' },
				}}
			>
				{pages.map((page) => (
					<MenuItem key={page} onClick={handleCloseNavMenu}>
						<Typography textAlign="center">
							<Link style={ {textTransform: "capitalize", textDecoration: "none", color: "black"} } to={`/${page}`}>{page}</Link>
						</Typography>
					</MenuItem>
				))}
			</Menu>
		</Box>
	)
}

const before_pages = ['home', 'about', 'learn', 'solve'];
const after_pages = ['home', 'about', 'learn', 'solve', 'submit'];
const settings = ['Profile', 'Groups', 'Logout'];

function NavBar() {

  return (
		<React.Fragment>
			<AppBar position="fixed">
				<Container maxWidth="xl">
					<Toolbar disableGutters >
						<LogoTitle />					
						<NavItems pages={before_pages}/>
						<LoggedInUser name="Avatar" />
					</Toolbar>
				</Container>
			</AppBar>
			<Toolbar />
		</React.Fragment>
  );
}
export default NavBar;

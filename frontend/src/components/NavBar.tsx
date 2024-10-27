import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from '@mui/icons-material/Settings';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { logout } from "../slices/authSlice";

interface Pages {
    name: string;
    link: string;
}

let pages: Pages[] = []

export default function NavBar() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
    
    if (basicUserInfo){
        if (Date.now() >= (basicUserInfo.timestamp + (60*60*1000))){
            localStorage.clear()
            navigate("/")
        }
    }

    if (basicUserInfo?.roles[0] === "MEMBER"){
        pages = [
            { name: "Events", link: "/members" }, 
            {name: "My Events", link: "/my-events"}
        ];}

    if (basicUserInfo?.roles[0] === "ADMIN"){
        pages = [
        { name: "Events", link: "/members" },
        { name: "User Admin", link: "/user-admin" },
        { name: "Event Admin", link: "/admin" },
        ];}


    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        try {
        dispatch(logout()).then((res) => {
            navigate("/");
        });
        } catch (err) {
        console.error(err);
        }
    };

    return (
        <AppBar position="static">
        <Container maxWidth={false}>
            <Toolbar disableGutters>
            <SportsKabaddiIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Bebas Neue, sans-serif",
                fontWeight: 800,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
                textTransform: "uppercase",
                }}
            >
                North West Wrestling
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                    vertical: "bottom",
                    horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: "block", md: "none" },
                }}
                >
                {pages.map((page) => (
                    <MenuItem
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={page.link}
                    >
                    <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            <SportsKabaddiIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "Bebas Neue, sans-serif",
                fontWeight: 800,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
                textTransform: "uppercase",
                }}
            >
                NW Wrestling
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                    component={Link}
                    to={page.link}
                >
                    {page.name}
                </Button>
                ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <SettingsIcon sx={{color:'white'}}/>
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                <MenuItem key={basicUserInfo?.id} onClick={() => {navigate(`/user/${basicUserInfo?.id}`);}}>
                <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
    );
}

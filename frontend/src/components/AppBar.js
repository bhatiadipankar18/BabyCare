import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import SelectChild2 from "../components/SelectChild2"

import Select, { SelectChangeEvent } from '@mui/material/Select';

import {useState} from "react";

export const AppBar = ({ pages }) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const navigate = useNavigate();
    const { user,setUser } = useAuth();
    const [selectedChild, setSelectedChild] = useState(null);

    console.log("useStatingQ@")
    const [childId, setChildId] = useState(0);
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };


    const logout = () => {
        setUser(null);
        navigate("/", { replace: true });
    };
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (path) => {
        setAnchorElNav(null);
        if (path) {
            navigate(path);
        }
    };

    return (
        <MuiAppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                    >
                        React Router Auth
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
                                horizontal: "left"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left"
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" }
                            }}
                        >
                            {pages?.map((page) => (
                                <MenuItem
                                    key={page.label}
                                    onClick={() => handleCloseNavMenu(page.path)}
                                >
                                    <Typography textAlign="center">{page.label}</Typography>
                                </MenuItem>
                            ))}
                            {!!user && (
                                <MenuItem key={"logout"} onClick={logout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                    >
                        React Router Auth
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages?.map((page) => (
                            <Button
                                key={page.label}
                                onClick={() => handleCloseNavMenu(page.path)}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page.label}
                            </Button>
                        ))}
                        {!!user && (
                            <Button
                                key={"logout"}
                                onClick={logout}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {"logout"}
                            </Button>
                        )}



                    </Box>
                    <Box>
                        {!!user && (
                            // <Select
                            //     sx={{ backgroundColor:'white' }}
                            //     labelId="demo-simple-select-label"
                            //     id="demo-simple-select"
                            //     value={age}
                            //         onChange={handleChange}
                            // >
                            //     <MenuItem value={10}>Ten</MenuItem>
                            //     <MenuItem value={20}>Twenty</MenuItem>
                            //     <MenuItem value={30}>Thirty</MenuItem>
                            // </Select>
                            <SelectChild2



                            >

                            </SelectChild2>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </MuiAppBar>
    );
};

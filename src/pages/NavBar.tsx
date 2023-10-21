import { Coronavirus } from "@mui/icons-material";
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography, Container } from "@mui/material";
import React from "react";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Link } from "react-router-dom";

// import Home from "./HomePage";

export default function NavBar() {

    return (
        <AppBar position="fixed">
            <Container>
                <Toolbar>
                    <div>
                        <Link to="/home" style={{margin: 20, textDecoration: "none", color: "#ffffff"}}>Home</Link>
                        <Link to="/about" style={{margin: 20, textDecoration: "none", color: "#ffffff"}}>About</Link>
                        <Link to="/learn" style={{margin: 20, textDecoration: "none", color: "#ffffff"}}>Learn</Link>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

import React from 'react'
import logo from "../styles/camera.png";
import { AppBar, Button, Grid, makeStyles, Toolbar, Typography } from "@material-ui/core";
import GoogleAuth from './GoogleAuth';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    logo: {
        width: "60px",
        height: "60px",
    },
    root: {
        backgroundColor: "#79A3B1",
    },
    loginButton: {
        color: "#002366",
        marginRight: theme.spacing(2)
    },
    logoContainer: {
        display: "flex",
        alignItems: "center",
    },
    siteName: {
        marginLeft: theme.spacing(2),
        color: "white",
        fontWeight: "600"
    },
    link: {
        textDecoration: "none",
        color: "white"
    }

}))

export default function Header() {

    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.root} >
            <Toolbar>
                <Grid container alignItems="center" >
                    <Grid item className={classes.logoContainer}>
                        <img src={logo} alt="Logo" className={classes.logo} />
                        <Button disabled>
                            <Typography className={classes.siteName}>
                                Video Streamer
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item>
                        <Link to="/" style={{ textDecoration: "none", marginRight: "10px" }}>
                            <Button variant="outlined">
                                All Streams
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item >
                        <GoogleAuth />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

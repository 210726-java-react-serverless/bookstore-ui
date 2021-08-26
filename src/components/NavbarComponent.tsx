import {Link} from 'react-router-dom';

import {AppBar, List, ListItem, ListItemText, makeStyles, Toolbar, Typography} from "@material-ui/core";

import {logout} from "../remote/auth-service";
import {Principal} from "../dtos/principal";

interface INavbarProps {
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void
}

const useStyles = makeStyles({
    link: {
        textDecoration: "none",
        color: "white"
    }
})

function NavbarComponent(props: INavbarProps) {

    const classes = useStyles();

    function doLogout() {
        logout(props.setCurrentUser);
    }

    return (
        <>
            <AppBar color="primary" position="static">
                <Toolbar>
                    <Typography variant="h5" color="inherit">
                        <List component="nav">
                            <ListItem component="div">
                                <Typography color="inherit" variant="h5">Bookstore UI</Typography>
                                {
                                    props.currentUser
                                        ?
                                        <>
                                            <ListItemText inset>
                                                <Typography color="inherit" variant="h6">
                                                    <Link to="/dashboard" className={classes.link}>Dashboard</Link>
                                                </Typography>
                                            </ListItemText>
                                            <ListItemText inset>
                                                <Typography color="inherit" variant="h6" onClick={doLogout}>Logout</Typography>
                                            </ListItemText>
                                        </>
                                        :
                                        <>
                                            <ListItemText inset>
                                                <Typography color="inherit" variant="h6">
                                                    <Link to="/login" className={classes.link}>Login</Link>
                                                </Typography>
                                            </ListItemText>
                                            <ListItemText inset>
                                                <Typography color="inherit" variant="h6">
                                                    <Link to="/register" className={classes.link}>Register</Link>
                                                </Typography>
                                            </ListItemText>
                                        </>
                                }
                            </ListItem>
                        </List>
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavbarComponent;

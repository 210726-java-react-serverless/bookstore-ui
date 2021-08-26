import {useState} from "react";
import {Redirect} from "react-router-dom";

import {Button, FormControl, Input, InputLabel, makeStyles, Typography} from "@material-ui/core";

import {Principal} from "../dtos/principal";
import ErrorMessageComponent from "./ErrorMessageComponent";
import {authenticate} from "../remote/auth-service";


interface ILoginProps {
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void
}

const useStyles = makeStyles({
    loginContainer: {
        justifyContent: "center",
        marginLeft: "25rem",
        marginTop: "10rem",
        padding: 20,
        width: "25%"
    }
});

function LoginComponent(props: ILoginProps) {

    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    let updateUsername = (e: any) => {
        setUsername(e.currentTarget.value);
    }

    let updatePassword = (e: any) => {
        setPassword(e.currentTarget.value);
    }

    let login = async () => {

        if (!username || !password) {
            setErrorMessage('You need to provide both a username and a password');
            return;
        }

        try {
            let principal = await authenticate({username, password});
            props.setCurrentUser(principal);
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    return (

        props.currentUser ? <Redirect to="/dashboard"/> :

        <div id="login-component" className={classes.loginContainer}>

            <Typography align="center" variant="h4">Log In To Your Bookstore Account!</Typography>

            <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                    onChange={updateUsername}
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                />
            </FormControl>

            <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                    onChange={updatePassword}
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                />
            </FormControl>

            <br/><br/>

            <Button
                id="login-button"
                onClick={login}
                variant="contained"
                color="primary"
                size="medium">Login</Button>

            <br/><br/>

            { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></> }
        </div>

    );

}

export default LoginComponent;

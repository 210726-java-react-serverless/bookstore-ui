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

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    let login = async () => {

        if (!formData.username || !formData.password) {
            setErrorMessage('You need to provide both a username and a password');
            return;
        }

        try {
            let principal = await authenticate({username: formData.username, password: formData.password});
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
                    onChange={handleChange}
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                />
            </FormControl>

            <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                    onChange={handleChange}
                    id="password"
                    name="password"
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

import {Principal} from "../dtos/principal";
import {Redirect} from "react-router-dom";
import {Button, FormControl, Input, InputLabel, makeStyles, MenuItem, Select, Typography} from "@material-ui/core";
import ErrorMessageComponent from "./ErrorMessageComponent";
import {useState} from "react";

interface IDashboardProps {
    currentUser: Principal | undefined
}

const useStyles = makeStyles({
    dashboardContainer: {
        justifyContent: "center",
        marginLeft: "30rem",
        marginTop: "5rem",
        padding: 20,
        width: "25%"
    }
});

function DashboardComponent(props: IDashboardProps) {

    const classes = useStyles();

    const [formTextData, setFormTextData] = useState({
        isbn: '',
        title: '',
        publisher: '',
        author: ''
    });

    const [genres, setGenres] = useState([] as string[]);
    const [selectedFile, setSelectedFile] = useState(null as unknown as File);

    const [errorMessage, setErrorMessage] = useState('');

    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormTextData({...formTextData, [name]: value});
    }

    const addGenre = (e: any) => {
        const {target: { value }} = e;
        setGenres(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    let addBook = () => {
        console.log(formTextData);
        console.log(genres);
        console.log(selectedFile);
    }

    return (
        !props.currentUser ?  <Redirect to="/login"/> :
        <>
        <h1>Welcome, {props.currentUser.username}!</h1>
        <div id="register-component" className={classes.dashboardContainer}>

            <Typography align="center" variant="h4">Add a Book</Typography>

            <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="isbn">ISBN</InputLabel>
                <Input
                    onChange={handleChange}
                    id="isbn"
                    name="isbn"
                    type="text"
                    placeholder="Enter the book's ISBN"
                />
            </FormControl>

            <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="title">Title</InputLabel>
                <Input
                    onChange={handleChange}
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter the title of the book"
                />
            </FormControl>

            <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="publisher">Publisher</InputLabel>
                <Input
                    onChange={handleChange}
                    id="publisher"
                    name="publisher"
                    type="text"
                    placeholder="Enter the book's publisher"
                />
            </FormControl>


            <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="author">Author</InputLabel>
                <Input
                    onChange={handleChange}
                    id="author"
                    name="author"
                    type="text"
                    placeholder="Enter your username"
                />
            </FormControl>

            <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="genres">genres</InputLabel>
                <Select
                    id="genres"
                    name="genres"
                    multiple={true}
                    value={genres}
                    label="Genres"
                    onChange={addGenre}
                >
                    <MenuItem value="Fiction">Fiction</MenuItem>
                    <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
                    <MenuItem value="Technical">Technical</MenuItem>
                    <MenuItem value="Fantasy">Fantasy</MenuItem>
                    <MenuItem value="Horror">Horror</MenuItem>
                </Select>
            </FormControl>

            <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="bookImage">Cover Image</InputLabel>
                <Input
                    id="bookImage"
                    name="bookImage"
                    type="file"
                    placeholder="Provide an image for the book"
                    onChange={(e) => {
                        // @ts-ignore
                        let file = (e.target as HTMLInputElement).files[0];
                        setSelectedFile(file);
                    }}
                />
            </FormControl>

            <br/><br/>

            <Button
                id="add-book"
                onClick={addBook}
                variant="contained"
                color="primary"
                size="medium">Add Book</Button>

            <br/><br/>

            { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></> }

        </div>
        </>

    );

}

export default DashboardComponent;

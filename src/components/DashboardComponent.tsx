import {Principal} from "../dtos/principal";
import {Redirect} from "react-router-dom";

interface IDashboardProps {
    currentUser: Principal | undefined
}

function DashboardComponent(props: IDashboardProps) {

    return (
        !props.currentUser ?  <Redirect to="/login"/> :

        <h1>Welcome, {props.currentUser.username}!</h1>

    );

}

export default DashboardComponent;

import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LoginButton/LogoutButton";
import {useAuth0} from "@auth0/auth0-react";
import Profile from "../InputPage/Profile";

function Description() {

    const { user } = useAuth0();

    return <>
        <h1>Dichotomous</h1>
        <p>Turn a textual dichotomous key into an interactive one</p>
        <Profile></Profile>
        <div>
            {user ? <LogoutButton></LogoutButton> : <LoginButton></LoginButton>}
        </div>
    </>

}

export default Description
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "react-bootstrap";

const LoginButton = () => {
    // useAuth0 hook gives app access to Auth0 functions and objects
    // in this case, loginWithRedirect
    const { loginWithRedirect } = useAuth0();

    return (
        <Button onClick={() => loginWithRedirect()}>Log In</Button>
    );
};

export default LoginButton;
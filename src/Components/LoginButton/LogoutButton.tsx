import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";

const LogoutButton = () => {
    const { logout, user } = useAuth0();

    return (
        <Button onClick={() => logout({ logoutParams: { returnTo: "http://localhost:3000/" } })}>
            {user ? `Log out, ${user.name}` : 'Log Out'}
        </Button>
    );
};

export default LogoutButton;
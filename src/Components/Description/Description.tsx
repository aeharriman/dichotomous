import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LoginButton/LogoutButton";
import {useAuth0} from "@auth0/auth0-react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IconProfile from "./IconProfile";

function Description() {
    const { user } = useAuth0();

    return (
        <Row className="align-items-start">
            <Col md={8}>
                <h1>Dichotomous</h1>
                <p>Turn a textual dichotomous key into an interactive one</p>
            </Col>
            <Col md={4} className="d-flex justify-content-end">
                <div>
                    {user ? <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <IconProfile />
                            <LogoutButton />
                        </div>
                        : <LoginButton></LoginButton>}
                </div>
            </Col>
        </Row>
    );
}


export default Description
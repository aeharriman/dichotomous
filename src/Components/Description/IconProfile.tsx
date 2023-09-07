import * as React from "react";
import {useState} from "react";
import { Modal, Button } from "react-bootstrap";
import Profile from "./Profile";

function IconProfile() {

    const [isProfileVisible, setIsProfileVisible] = useState(false);

    const handleIconClick = () => {
        setIsProfileVisible(true);
    };

    const handleClose = () => {
        setIsProfileVisible(false);
    };


    return (
        <div>
            <div role="button" onClick={handleIconClick} style={{ background: "none", border: "none", padding: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="8" r="4" fill="currentColor"/>
                    <path d="M2 20C2 15.58 7.03 14 12 14C16.97 14 22 15.58 22 20" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
            </div>

            <Modal show={isProfileVisible} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Profile />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default IconProfile;
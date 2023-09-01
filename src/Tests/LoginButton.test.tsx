import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
// Pulling in useAuth0 to mock
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Components/LoginButton/LoginButton";

// Creating a mock for the auth0 module
jest.mock("@auth0/auth0-react");

// describe sets up a test suite for this component
describe("LoginButton", () => {

    // it starts a test, which is formatted as a lambda function
    it("should call loginWithRedirect when clicked", () => {

        // Creating a mock function with jest
        const loginWithRedirect = jest.fn();
        // Replaces useAuth0 with a mocked function returning our mocked loginWithRedirect
        (useAuth0 as jest.Mock).mockReturnValueOnce( { loginWithRedirect } );

        // Renders into virtual DOM
        render(<LoginButton />);
        // Find and click the button being tested
        const button = screen.getByText("Log In");
        fireEvent.click(button);

        expect(loginWithRedirect).toHaveBeenCalled();
    })

    it("should not call loginWithRedirect when not clicked", () => {
        const loginWithRedirect = jest.fn();
        (useAuth0 as jest.Mock).mockReturnValueOnce( { loginWithRedirect } );

        render(<LoginButton />);

        expect(loginWithRedirect).not.toHaveBeenCalled();
    })
})
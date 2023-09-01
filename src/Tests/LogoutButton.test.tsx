import LoginButton from "../Components/LoginButton/LogoutButton";
import {useAuth0} from "@auth0/auth0-react";
import LogoutButton from "../Components/LoginButton/LogoutButton";
import {fireEvent, render, screen} from "@testing-library/react";


jest.mock("@auth0/auth0-react");

describe("LogoutButton", () => {

    it("should call logout with return url when clicked", () => {
        const logout = jest.fn();
        (useAuth0 as jest.Mock).mockReturnValueOnce( { logout });

        render(<LogoutButton />);
        const button = screen.getByText("Logout");
        fireEvent.click(button);

        expect(logout).toHaveBeenCalledWith({logoutParams: {returnTo: "http://localhost:3000/"}});
    })

    it("should not call logout when not clicked", () => {
        const logout = jest.fn();
        (useAuth0 as jest.Mock).mockReturnValueOnce( { logout });

        render(<LogoutButton />);

        expect(logout).not.toHaveBeenCalled();
    })

})
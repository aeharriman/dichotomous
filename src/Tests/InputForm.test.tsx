import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import InputForm from "../Components/InputForm/InputForm";
import { KeyObject } from "../Utils/Interfaces";
import axios from "axios";
import userEvent from "@testing-library/user-event";

jest.mock("@auth0/auth0-react", () => ({
    useAuth0: () => ({
        getAccessTokenSilently: jest.fn().mockResolvedValue("some token"),
    }),
}));

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('<InputForm />', () => {
    const mockDichotomousKey: KeyObject = {};
    const setDichotomousKey = jest.fn();

    beforeEach(() => {
        mockAxios.get.mockResolvedValue({ data: [] });
    });

    it('Should render all relevant components without error', async () => {
        render(<InputForm dichotomousKey={mockDichotomousKey} setDichotomousKey={setDichotomousKey} />);

        await waitFor(() => {
            expect(mockAxios.get).toHaveBeenCalled();
        });

        expect(screen.getByRole('tablist')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });


    it('Should allow text input in the textarea', async () => {
        render(<InputForm dichotomousKey={mockDichotomousKey} setDichotomousKey={setDichotomousKey}/>);

        let element = screen.getByText(/1.a. found in water/) as HTMLTextAreaElement;

        await userEvent.type(element, 'test input');

        await waitFor(() => {
            expect(element.value).toContain('test input');
        });
    });



});

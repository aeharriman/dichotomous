import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
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

const defaultKeyText: string = `1.a. found in water ................................. 2

2.a. grows in salt water ................................. seaweed
        
2.b. does not grow in salt water .............................. water-lily
        
1.b. found on land ................................ 3
        
3.a. real plant ....................... 4
        
4.a. grows more than 50 m tall .................. fir tree
        
4.b. grows less than 50 m tall ............................ 5
        
5.a. produces yellow flowers ............................... dandelion
        
5.b. does not produce yellow flowers ..........................apple tree
        
3.b. not a real plant ............................... astroturf`;

const expectedKey: KeyObject  = {
    '1': {
        'a': { text: 'found in water', goTo: 2 },
        'b': { text: 'found on land', goTo: 3 }
    },
    '2': {
        'a': { text: 'grows in salt water', goTo: 'seaweed' },
        'b': { text: 'does not grow in salt water', goTo: 'water-lily' }
    },
    '3': {
        'a': { text: 'real plant', goTo: 4 },
        'b': { text: 'not a real plant', goTo: 'astroturf' }
    },
    '4': {
        'a': { text: 'grows more than 50 m tall', goTo: 'fir tree' },
        'b': { text: 'grows less than 50 m tall', goTo: 5 }
    },
    '5': {
        'a': { text: 'produces yellow flowers', goTo: 'dandelion' },
        'b': { text: 'does not produce yellow flowers', goTo: 'apple tree' }
    }
};

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

    it('should call setDichotomousKey with a non-empty form', async () => {
        render(<InputForm dichotomousKey={mockDichotomousKey} setDichotomousKey={setDichotomousKey} />);

        // Unnecessary but added to make test less fragile in case default tab text changes in app.
        let element = screen.getByPlaceholderText(/1.a. found in water/) as HTMLTextAreaElement;
        fireEvent.change(element, { target: { value: defaultKeyText } });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await userEvent.click(submitButton);

        expect(setDichotomousKey).toHaveBeenCalled();
    });

    it('should not change anything and log in console when submit is clicked with form empty', async () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation();
        render(<InputForm dichotomousKey={mockDichotomousKey} setDichotomousKey={setDichotomousKey} />);

        let element = screen.getByText(/1.a. found in water/) as HTMLTextAreaElement;
        fireEvent.change(element, { target: { value: '' } });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await userEvent.click(submitButton);

        expect(logSpy).toHaveBeenCalledWith('Form cannot be submitted when empty');
        expect(element.value).toBe('');
        expect(element).toBeInTheDocument();
    });

    it('should set the dichotomousKey state correctly upon submission', async () => {
        render(<InputForm dichotomousKey={mockDichotomousKey} setDichotomousKey={setDichotomousKey} />);

        // Unnecessary but added to make test less fragile in case default tab text changes in app.
        let element = screen.getByPlaceholderText(/1.a. found in water/) as HTMLTextAreaElement;
        fireEvent.change(element, { target: { value: defaultKeyText } });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await userEvent.click(submitButton);

        expect(setDichotomousKey).toHaveBeenCalledWith(expectedKey);
    });

    it('Should parse correctly when dots are ellipsis characters', async () => {
        const smallKey: string = `1.a. one .... 2
1.b. two … twodone
2.a. three …… threedone
2.b. four .... fourdone`;

        const correctParsed: KeyObject = {
            '1': { a: { text: 'one', goTo: 2 }, b: { text: 'two', goTo: 'twodone' } },
            '2': {
                a: { text: 'three', goTo: 'threedone' },
                b: { text: 'four', goTo: 'fourdone' }
            }
        }

        render(<InputForm dichotomousKey={mockDichotomousKey} setDichotomousKey={setDichotomousKey} />);

        let element = screen.getByPlaceholderText(/1.a. found in water/) as HTMLTextAreaElement;
        fireEvent.change(element, { target: { value: smallKey } });


        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await userEvent.click(submitButton);

        expect(setDichotomousKey).toHaveBeenCalledWith(correctParsed);
    });

    it('should parse correctly when missing dot after numbers followed by a letter', async () => {
        const smallKey: string = `1.a. one .... 2
1.b two .... twodone
2.a three .... threedone
2.b. four .... fourdone`;

        const correctParsed: KeyObject = {
            '1': { a: { text: 'one', goTo: 2 }, b: { text: 'two', goTo: 'twodone' } },
            '2': {
                a: { text: 'three', goTo: 'threedone' },
                b: { text: 'four', goTo: 'fourdone' }
            }
        }

        render(<InputForm dichotomousKey={mockDichotomousKey} setDichotomousKey={setDichotomousKey} />);

        let element = screen.getByPlaceholderText(/1.a. found in water/) as HTMLTextAreaElement;
        fireEvent.change(element, { target: { value: smallKey } });


        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await userEvent.click(submitButton);

        expect(setDichotomousKey).toHaveBeenCalledWith(correctParsed);
    });

    it('Shall parse correctly when missing spaces around separator dots', async () => {
        const smallKey: string = `1.a. one .... 2
1.b two....twodone
2.a three…threedone
2.b. four .... fourdone`;

        const correctParsed: KeyObject = {
            '1': { a: { text: 'one', goTo: 2 }, b: { text: 'two', goTo: 'twodone' } },
            '2': {
                a: { text: 'three', goTo: 'threedone' },
                b: { text: 'four', goTo: 'fourdone' }
            }
        }

        render(<InputForm dichotomousKey={mockDichotomousKey} setDichotomousKey={setDichotomousKey} />);

        let element = screen.getByPlaceholderText(/1.a. found in water/) as HTMLTextAreaElement;
        fireEvent.change(element, { target: { value: smallKey } });


        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await userEvent.click(submitButton);

        expect(setDichotomousKey).toHaveBeenCalledWith(correctParsed);
    });



});

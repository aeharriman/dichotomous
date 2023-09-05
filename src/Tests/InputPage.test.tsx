import React from 'react';
import { screen, render } from '@testing-library/react';
import InputPage from "../Components/InputPage/InputPage";
import {Auth0ContextInterface, useAuth0} from "@auth0/auth0-react";

// Mocking the useAuth0 hook from Auth0 to control its behavior in tests, since the rendering in tests renders the real component
jest.mock('@auth0/auth0-react');
// specify the type for the mocked useAuth0
const mockedUseAuth0 = useAuth0 as jest.MockedFunction<typeof useAuth0>;

describe('InputPage Component', () => {

    beforeEach(() => {
        // This is mocking an Auth0ContextInterface, which is what the useAuth0 hook returns
        mockedUseAuth0.mockReturnValue({
            isAuthenticated: true,
            user: {
                name: 'Test User',
                email: 'test.user@email.com',
            },
            getAccessTokenSilently: jest.fn().mockResolvedValue('access_token'),
            getAccessTokenWithPopup: jest.fn(),
            getIdTokenClaims: jest.fn(),
            loginWithRedirect: jest.fn(),
            loginWithPopup: jest.fn(),
            logout: jest.fn(),
            isLoading: false,
            error: undefined,
        } as unknown as Auth0ContextInterface);
    });

    it('should render InputForm when dichotomousKey is empty', () => {
        const dichotomousKey = {};
        const setDichotomousKey = jest.fn();

        render(
            <InputPage
                dichotomousKey={dichotomousKey}
                setDichotomousKey={setDichotomousKey}
            />
        );

        const submitButton = screen.getByRole('button', { name: /Submit/i });
        expect(submitButton).toBeInTheDocument();
        expect(screen.getByText('Turn a textual dichotomous key into an interactive one')).toBeInTheDocument();
    });

    it('should render ButtonTree when dichotomousKey is not empty', () => {
        const dichotomousKey = { key1: 'value1' };
        const setDichotomousKey = jest.fn();

        render(
            <InputPage
                dichotomousKey={dichotomousKey}
                setDichotomousKey={setDichotomousKey}
            />
        );

        expect(screen.getByText('Turn a textual dichotomous key into an interactive one')).toBeInTheDocument();
        expect(screen.queryByText('Enter Key')).toBeNull();
    });
});

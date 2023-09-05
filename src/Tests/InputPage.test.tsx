import React from 'react';
import { screen, render } from '@testing-library/react';
import InputPage from "../Components/InputPage/InputPage";

describe('InputPage Component', () => {
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

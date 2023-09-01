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

        // This causes:
        // ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){import axios from './lib/axios.js';
        //                                                                                       ^^^^^^
        //
        //     SyntaxError: Cannot use import statement outside a module
        //
        //        8 | import { KeyObject, NamedStringKey } from '../../Utils/Interfaces';
        //        9 | import {useAuth0} from "@auth0/auth0-react";
        //     > 10 | import axios from "axios";

        const submitButton = screen.getByRole('button', { name: /Submit/i });
        expect(submitButton).toBeInTheDocument();
        expect(screen.getByText('Turn a textual dichotomous key into an interactive one')).toBeInTheDocument();
    });

    it('should render ButtonTree when dichotomousKey is not empty', () => {
        const dichotomousKey = { key1: 'value1' };
        const setDichotomousKey = jest.fn();

        // render(
        //     <InputPage
        //         dichotomousKey={dichotomousKey}
        //         setDichotomousKey={setDichotomousKey}
        //     />
        // );

        expect(screen.getByText('Turn a textual dichotomous key into an interactive one')).toBeInTheDocument();
        expect(screen.queryByText('Enter Key')).toBeNull();
    });
});

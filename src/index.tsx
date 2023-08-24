import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.css';
import './custom.scss'
import './index.css';
import {Auth0Provider} from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN || "defaultDomain";
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || "defaultClientId";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    // stores the authentication state of your users and the state of the SDK
    // — whether Auth0 is ready to use or not.
    // It also exposes helper methods to log in and log out your users,
    // which you can access using the useAuth0() hook.
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
            // The URL to where you'd like to redirect your users after they authenticate with Auth0.
            redirect_uri: "http://localhost:3000/"
        }}
    >
        <App />
    </Auth0Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
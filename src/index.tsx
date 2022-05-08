import React from 'react';
import ReactDOM from 'react-dom/client';
import initFirebase from 'services/firebase/config';
import App from './App';
import './index.css';

// initialize firebase
initFirebase();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

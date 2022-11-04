import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter,createBrowserRouter } from 'react-router-dom';

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Root />,
//         errorElement: <ErrorPage />,
//     },
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);


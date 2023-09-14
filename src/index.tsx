import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./app/App";
import {BrowserRouter} from "react-router-dom";
import {StoreProvider} from "src/app/providers/storeProvider/ui/StoreProvider";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <StoreProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StoreProvider>
    </React.StrictMode>
);


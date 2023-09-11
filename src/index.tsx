import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./app/App";
import {Provider} from "react-redux";
import {setupStore} from "src/app/providers/storeProvider/config/store";
import {BrowserRouter} from "react-router-dom";

const store = setupStore();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);


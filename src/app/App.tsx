import React from 'react';
import cls from "./app.module.scss";
import "./styles/index.scss";
import {Search} from "src/features/search/ui/Search";
import {AppRoutes} from "src/app/routes/AppRoutes";


function App() {
return (
    <div className={cls.app}>
        <Search/>
        <AppRoutes/>
    </div>
);
}
export default App;

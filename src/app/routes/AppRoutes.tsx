import {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import {Loading} from "src/shared/ui/loading/Loading";
import {BookPage} from "src/pages/BookPage/BookPage";
import {MainPage} from "src/pages/mainPage/MainPage";

export const AppRoutes = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <Routes>
                <Route path={'/books/:bookId'} element={<BookPage/>}/>
                <Route path={'/books'} element={<MainPage/>}/>
            </Routes>
        </Suspense>
    );
};
import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import ApiPage from "../pages/API/ApiPage";
import OpenApiPage from "../pages/API/OpenApiPage";

const root = createBrowserRouter([
    // main
    { path: '/', element: <MainPage /> },

    // API
    { path: '/api', element: <ApiPage /> },
    { path: '/openApi', element: <OpenApiPage /> },
]);
export default root;
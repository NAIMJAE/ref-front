import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import ApiPage from "../pages/API/ApiPage";
import OpenApiPage from "../pages/API/OpenApiPage";
import Tictactoe from "../pages/game/Tictactoe";

const root = createBrowserRouter([
    // main
    { path: '/', element: <MainPage /> },

    // API
    { path: '/api', element: <ApiPage /> },
    { path: '/openApi', element: <OpenApiPage /> },

    // Game
    { path: '/tictactoe', element: <Tictactoe /> },
]);
export default root;
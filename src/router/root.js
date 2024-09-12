import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import ApiPage from "../pages/API/ApiPage";
import OpenApiPage from "../pages/API/OpenApiPage";
import Tictactoe from "../pages/game/Tictactoe";
import Schedule from "../pages/main/Schedule";
import EncryptionPage from "../pages/Encryption/EncryptionPage";
import ChatBotApiPage from "../pages/API/ChatBotApiPage";
import SearchEngine from "../pages/searchEngine/SearchEngine";
import DataStorage from "../pages/dataStorage/DataStorage";

const root = createBrowserRouter([
    // main
    { path: '/', element: <MainPage /> },
    { path: '/schedule', element: <Schedule /> },

    // API
    { path: '/api', element: <ApiPage /> },
    { path: '/openApi', element: <OpenApiPage /> },
    { path: '/chatbot', element: <ChatBotApiPage /> },

    // Game
    { path: '/tictactoe', element: <Tictactoe /> },

    // Encryption
    { path: '/encryption', element: <EncryptionPage /> },

    // SearchEngine
    { path: '/searchEngine', element: <SearchEngine /> },

    // DataStorage
    { path: '/dataStorage', element: <DataStorage /> },
]);
export default root;
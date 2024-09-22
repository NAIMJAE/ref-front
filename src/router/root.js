import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import OpenApiPage from "../pages/API/OpenApiPage";
import Tictactoe from "../pages/game/Tictactoe";
import EncryptionPage from "../pages/Encryption/EncryptionPage";
import ChatBotApiPage from "../pages/API/ChatBotApiPage";
import SearchEngine from "../pages/searchEngine/SearchEngine";
import DataStorage from "../pages/dataStorage/DataStorage";

const root = createBrowserRouter([
    // main
    { path: '/', element: <MainPage /> },

    // API
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
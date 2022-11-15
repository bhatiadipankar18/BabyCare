import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "./hooks/useAuth";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);



root.render(
    // <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                    <App />
            </AuthProvider>
        </BrowserRouter>
    // </StrictMode>
);

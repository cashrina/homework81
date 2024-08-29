import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from "../theme.ts";
import {store} from "../app/store.ts";
import App from "./App.tsx";
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>,
);


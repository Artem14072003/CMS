import React from 'react'
import ReactDOM from 'react-dom/client'
import "./assets/scss/index.scss"
import {Provider} from "react-redux";
import {store} from "./store/store"
import Home from "./components/home/Home.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <Home/>
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>,
)

import {configureStore} from "@reduxjs/toolkit";
import {reducer} from "./final-price/finalPrice.slice.ts";

export const store = configureStore({
    reducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
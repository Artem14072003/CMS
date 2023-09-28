import {createSlice} from "@reduxjs/toolkit";

const initialState: number[] = []

export const FinalPriceSlice = createSlice({
    name: "Result price",
    initialState,
    reducers: {
        setResultPrice: (state, {payload: resipe}) => {
            state.push(resipe)
        }
    }
})

export const {
    actions,
    reducer
} = FinalPriceSlice
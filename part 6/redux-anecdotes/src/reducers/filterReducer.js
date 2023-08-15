import { createSlice } from "@reduxjs/toolkit";

const initialState = ""

const filterSlice = createSlice({
    name: 'filter',
    initialState, 
    reducers: {
        filterChanger(state, action) {
            console.log(action.payload);
            const filter = action.payload
            return filter
        }
    }
})

export const { filterChanger } = filterSlice.actions
export default filterSlice.reducer





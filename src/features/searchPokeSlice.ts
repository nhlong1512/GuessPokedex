import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

interface SearchState {
    searchPoke: string | null | undefined;
}
// Define the initial state using that type
const initialState: SearchState = {
    searchPoke: ""
}

export const searchPokeSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchPoke: (state,action: PayloadAction<string>) =>{
            state.searchPoke = action.payload;
        },
    }
})
export const { searchPoke } = searchPokeSlice.actions
export const selectSearch = (state: RootState) => state.search.searchPoke
export default searchPokeSlice.reducer
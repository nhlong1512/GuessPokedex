import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import {User} from "../model/model"

// Define a type for the slice state
interface UserState {
    currentUser: User | null;
}
// Define the initial state using that type
const initialState: UserState = {
    currentUser: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn: (state,action: PayloadAction<User>) =>{
            state.currentUser = action.payload;
        },
        signOut: (state) => {
            state.currentUser = null;
        }
    }
})
export const { signIn, signOut } = userSlice.actions
export const selectUser = (state: RootState) => state.user.currentUser
export default userSlice.reducer
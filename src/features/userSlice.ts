import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import { User } from '../model/model';

interface State {
    user?: User
  }
  

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
        setUser: (state,action: PayloadAction<User | null>) =>{
            state.currentUser = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        signOut: (state) => {
            state.currentUser = null;
        }
    }
})
export const { setUser, signOut } = userSlice.actions
export const selectUser = (state: RootState) => state.user.currentUser
export default userSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

import produce from "immer"
const initialState = {
    usersList: []
}

export const usersList = createSlice({
    name: 'usersList',
    initialState,
    reducers: {
        createUsersList: (state, action) => {

            const nextState = produce(state.adminData, draftState => {
                draftState = [...action.payload]
                return draftState;
            })
            state.usersList = nextState
        },
    },
})

// Action creators are generated for each case reducer function
export const { createUsersList } = usersList.actions

export default usersList.reducer
import { createSlice } from '@reduxjs/toolkit'

import produce from "immer"
const initialState = {
    leadList: []
}

export const leadList = createSlice({
    name: 'leadList',
    initialState,
    reducers: {
        createLeadList: (state, action) => {

            const nextState = produce(state.leadList, draftState => {
                draftState = [...action.payload]
                return draftState;
            })
            state.leadList = nextState
        },
    },
})

// Action creators are generated for each case reducer function
export const { createLeadList } = leadList.actions

export default leadList.reducer
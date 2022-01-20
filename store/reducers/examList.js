import { createSlice } from '@reduxjs/toolkit'

import produce from "immer"
const initialState = {
    examsList: []
}

export const examsList = createSlice({
    name: 'examsList',
    initialState,
    reducers: {
        createExamsList: (state, action) => {

            const nextState = produce(state.adminData, draftState => {
                draftState = [...action.payload]
                return draftState;
            })
            state.examsList = nextState
        },
    },
})

// Action creators are generated for each case reducer function
export const { createExamsList } = examsList.actions

export default examsList.reducer
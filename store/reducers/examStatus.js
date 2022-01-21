import { createSlice } from '@reduxjs/toolkit'

import produce from "immer"
const initialState = {
    examStatus: []
}

export const examStatus = createSlice({
    name: 'examStatus',
    initialState,
    reducers: {
        createExamsStatus: (state, action) => {

            const nextState = produce(state.examStatus, draftState => {
                draftState = [...action.payload]
                return draftState;
            })
            state.examStatus = nextState
        },
    },
})

// Action creators are generated for each case reducer function
export const { createExamsStatus } = examStatus.actions

export default examStatus.reducer
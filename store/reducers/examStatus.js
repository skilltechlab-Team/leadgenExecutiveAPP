import { createSlice } from '@reduxjs/toolkit'

import produce from "immer"
const initialState = {
    examStatus: [
        {
            id: 0,
            _version: 0,
            status: '',
            proposedDate: '',
            proposedTime: ''
        }
    ]
}

export const examStatus = createSlice({
    name: 'examStatus',
    initialState,
    reducers: {
        createExamsStatus: (state, action) => {

            const nextState = produce(state.examStatus, draftState => {
                // console.log(`action.payload =>\t`, ...action.payload);
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
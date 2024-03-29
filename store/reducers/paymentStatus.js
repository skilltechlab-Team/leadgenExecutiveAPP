import { createSlice } from '@reduxjs/toolkit'

import produce from "immer"
const initialState = {
    paymentStatus: [
        {
            id: 0,
            _version: 0,
            status: '',
            confirmation_number: ''
        }
    ]
}

export const paymentStatus = createSlice({
    name: 'paymentStatus',
    initialState,
    reducers: {
        createPaymentStatus: (state, action) => {

            const nextState = produce(state.paymentStatus, draftState => {
                draftState = [...action.payload]
                return draftState;
            })
            state.paymentStatus = nextState
        },
    },
})

// Action creators are generated for each case reducer function
export const { createPaymentStatus } = paymentStatus.actions

export default paymentStatus.reducer
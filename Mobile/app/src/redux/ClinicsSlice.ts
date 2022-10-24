import { createSlice } from '@reduxjs/toolkit';
import { clinicsSliceSliceProps } from './types';

const initialState = {
    data: ''
} as clinicsSliceSliceProps;

const clinicsSlice = createSlice({
    name: 'clinics',
    initialState,
    reducers: {
        setClinics(state, action) {
            state.data = action.payload;
        },
    }
});

export const { setClinics } = clinicsSlice.actions;
export default clinicsSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import { accessTokenSliceProps } from './types';

const initialState = {
    token: ''
} as accessTokenSliceProps;

const accessTokenSlice = createSlice({
    name: 'access_token',
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
    }
});

export const { setToken } = accessTokenSlice.actions;
export default accessTokenSlice.reducer;
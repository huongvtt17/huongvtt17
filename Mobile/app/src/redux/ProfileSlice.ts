import { createSlice } from '@reduxjs/toolkit';
import { profileSliceProps } from './types';

const initialState = {
    data: ''
} as profileSliceProps;

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile(state, action) {
            state.data = action.payload;
        },
    }
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
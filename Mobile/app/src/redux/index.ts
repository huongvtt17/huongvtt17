import { combineReducers } from 'redux';
import AccessTokenSlice from './AccessTokenSlice';
import ProfileSlice from './ProfileSlice';
import ClinicsSlice from './ClinicsSlice';

const rootReducer = combineReducers({
    accessTokenSlice: AccessTokenSlice,
    profileSlice: ProfileSlice,
    clinicsSlice: ClinicsSlice
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

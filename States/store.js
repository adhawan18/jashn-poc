// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loginReducer from './loginStates';
import agoraReducer from './agoraStates';
import mainGameReducer from './mainGameStates';

const rootReducer = combineReducers({
    loginReducer,
    agoraReducer,
    mainGameReducer
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;

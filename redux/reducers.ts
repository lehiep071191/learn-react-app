import { combineReducers } from "@reduxjs/toolkit";
import tokenSlice from './slices/token.slice';


const rootReducer = combineReducers({
    token: tokenSlice
})

export {rootReducer}
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import tokenSlice from "./slices/token.slice";

export const store = configureStore({
  reducer: {
    token: tokenSlice,
  },
});
// export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

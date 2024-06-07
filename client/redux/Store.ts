// store.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer'; // Adjust the path as necessary

const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers here if you have them
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

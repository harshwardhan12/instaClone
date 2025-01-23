import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice';

// Create the store with reducers
export const store = configureStore({
    reducer: {
        counter: weatherReducer,
    },
});

// Define RootState and AppDispatch types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

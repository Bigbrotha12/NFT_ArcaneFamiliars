import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Familiar, IMXBalance, UserData } from '../app/Definitions';

const initialState: UserData = {
    address: '',
    balance: {
        available: "0",
        preparing: "0",
        withdrawable: "0"
    },
    assets: []
}

export const userData = createSlice({
    name: "session",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.address = action.payload
        },
        logout: (state) => {
            state.address = ""
        },
        refreshBalance: (state, action: PayloadAction<IMXBalance>) => {
            state.balance = action.payload;
        },
        refreshAssets: (state, action: PayloadAction<Array<Familiar>>) => {
            state.assets = action.payload;
        }
    }
});

export const { login, logout, refreshBalance, refreshAssets } = userData.actions;
export default userData.reducer;

export const appStore = configureStore({
    reducer: {
        session: userData.reducer
    }
});

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch

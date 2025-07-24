import { AuthSlice } from "@/entities/auth";
import { UserSlice } from "@/entities/user";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
export const store = configureStore({
    reducer:{
        users: UserSlice.reducer,
        auth: AuthSlice.reducer,
    }
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;

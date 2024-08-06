import { configureStore } from "@reduxjs/toolkit"
import  adminReducer from "./features/Admin/AdminSlice"

export const Store = configureStore(
    {
        reducer:{
            Admin: adminReducer
        }
    }
)
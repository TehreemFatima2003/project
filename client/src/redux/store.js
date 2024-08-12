import { configureStore } from "@reduxjs/toolkit"
import  adminReducer from "./features/Admin/AdminSlice"
import userReducer from "./features/User/userSlice"

export const Store = configureStore(
    {
        reducer:{
            Admin: adminReducer , 
            User: userReducer
        }
    }
)
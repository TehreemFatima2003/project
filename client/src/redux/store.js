import { configureStore } from "@reduxjs/toolkit"
import  adminReducer from "./features/Admin/AdminSlice"
import userReducer from "./features/User/userSlice"
import propertyReducer from "./features/Property/propertySlice.js";

export const Store = configureStore(
    {
        reducer:{
            Admin: adminReducer , 
            User: userReducer,
            Property: propertyReducer
        }
    }
)
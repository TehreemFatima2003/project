import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginAdmin} from "../../../Apis.js"
import Cookies from "js-cookie"

export const login = createAsyncThunk('Admin/login',
    async(data , {rejectWithValue})=> {
        try {
            const res = await loginAdmin(data);
            console.log("returned data is:" , res.data)
            return res.data; // token and adminId
        } catch (error) {
            console.log("error returned:" , error.response)
            return rejectWithValue(error.response.data)
        }
    }
)

// export const logout = createAsyncThunk('Admin/logout', () => {
//     Cookies.remove('adminToken'); // Remove the cookie
//     return;
// });


const initialState = {
    error:null,
    //token:''
};

const adminReducer = createSlice({
    name: "Admin",
    initialState,
    extraReducers: (builder)=> {
        builder

        // .addCase(login.pending , (state) =>{
        //     state.status = "loading";
        // })

        .addCase(login.fulfilled , (state, action)=>{
            console.log("login admin completed! with token:" , action.payload.token);
            Cookies.set('adminToken' ,action.payload.token)
            state.token = action.payload.token;
            state.error = null;   // reset the error state on success
        })

        .addCase(login.rejected , (state , action)=>{
            //state.error = action.error.message;
            state.error = action.payload.error;
        })
    }   
});

export default adminReducer.reducer;
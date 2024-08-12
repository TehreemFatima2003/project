import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginUser , signupUser} from "../../../Apis.js"
import Cookies from "js-cookie"



export const signup = createAsyncThunk('User/register',
    async(data , {rejectWithValue})=> {
        try {
            const res = await signupUser(data);
            console.log("returned data is:" , res.data)
            return res.data; // {token and userId }
        } catch (error) {
            console.log("error returned:" , error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)


export const login = createAsyncThunk('User/login',
    async(data , {rejectWithValue})=> {
        try {
            const res = await loginUser(data);
            console.log("returned data is:" , res.data)
            return res.data; // (token , userId , name )
        } catch (error) {
            console.log("error returned:" , error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)


const initialState = {
    error:null,
    loggedIn:false
};

const userReducer = createSlice({
    name: "User",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder)=> {
        builder

        // .addCase(login.pending , (state) =>{
        //     state.status = "loading";
        // })

        .addCase(signup.fulfilled , (state, action) => {
            console.log("Register new user completed! with token:" , action.payload);
            Cookies.set('userToken' ,action.payload.token)
            state.loggedIn = true;
            state.error = null;   // reset the error state on success
        })

        .addCase(signup.rejected , (state , action)=>{
            state.error = action.payload;
            state.loggedIn = false;
        })


        .addCase(login.fulfilled , (state, action)=>{
            console.log("login user completed! with token:" , action.payload.token);
            Cookies.set('userToken' ,action.payload.token)
            state.token = action.payload.token;
            state.loggedIn = true;
            state.error = null;   // reset the error state on success
        })

        .addCase(login.rejected , (state , action)=>{
            state.error = action.payload;
            console.log("returned with error:" , state.error)
            state.loggedIn = false;
        })

        // .addCase(showPending.pending, (state) => {
        //     state.status = "loading";
        // })

    }   
});

export const {clearError} = userReducer.actions;
export default userReducer.reducer;
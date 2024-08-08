import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginAdmin , reject, approve,showPendingProperties} from "../../../Apis.js"
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

export const showPending = createAsyncThunk('Admin/pending',
    async(_, {rejectWithValue}) => {
        try {
            const res = await showPendingProperties();
            console.log("pending properties are:" , res);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data)   
        }
    }
)

export const approveProperty = createAsyncThunk('Admin/approve' , 
    async(id , {rejectWithValue})=> {
        try {
            const res = await approve(id);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data)   
        }
    }
)

export const rejectProperty = createAsyncThunk('Admin/reject' , 
    async(id , {rejectWithValue})=> {
        try {
            const res = await reject(id);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data)   
        }
    }
)

const initialState = {
    error:null,
    properties:[]
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

        // .addCase(showPending.pending, (state) => {
        //     state.status = "loading";
        // })

        .addCase(showPending.fulfilled, (state, action) => {
            state.properties = action.payload;
            console.log("properties set as:" , state.properties);
        })

        .addCase(showPending.rejected, (state, action) => {
            state.error = action.payload.error;
        })

        .addCase(approveProperty.fulfilled, (state, action) => {
            //state.properties = action.payload;
            console.log("properties approved as:" , action.payload);
        })

        .addCase(approveProperty.rejected, (state, action) => {
            state.error = action.payload.error;
        })

        .addCase(rejectProperty.fulfilled, (state, action) => {
            //state.properties = action.payload;
            console.log("properties rejected as:" , action.payload);
        })

        .addCase(rejectProperty.rejected, (state, action) => {
            state.error = action.payload.error;
        })
    }   
});

export default adminReducer.reducer;
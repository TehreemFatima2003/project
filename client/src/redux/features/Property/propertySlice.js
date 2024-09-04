import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { fetchSearched, getSavedPropertiesFromWishlist, removePropertyFromWishlist, savePropertyInWishlist } from '../../../Apis';
import { createProperty, createPropertyAsDraft, deleteProperty, getPropertyByStatus, markPropertyAsDone,getDrafts } from "../../../api";

export const getSavedProperties = createAsyncThunk(
    'property/getSavedProperties',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await getSavedPropertiesFromWishlist(userId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
    }
    }
);
  
export const saveProperty = createAsyncThunk(
    'property/saveProperty',
    async (data, { rejectWithValue }) => {
        try {
        const response = await savePropertyInWishlist(data);
        return response.data;
        } catch (error) {
        return rejectWithValue(error.response.data);
    }
    }
);
  

export const removeProperty = createAsyncThunk(
    'property/removeProperty',
    async (queryString, { rejectWithValue }) => {
        try {
        const response = await removePropertyFromWishlist(queryString);
        return response.data;
        } catch (error) {
        return rejectWithValue(error.response.data);
    }
    }
);


export const fetchSearchResults = createAsyncThunk(
    'search/fetchSearchResults',
    async (searchParams , {rejectWithValue}) => {
        try {
            const response = await fetchSearched(searchParams);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
        
    }
);


export const getPropertyByStatuss= createAsyncThunk(
    '/property/bystatus',
    async (queryString, {rejectWithValue})=> {
        try {
            const response= await getPropertyByStatus(queryString);
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response.data);

    }
}
);

export const closeProperty= createAsyncThunk(
    '/property/close',
    async(property_id, {rejectWithValue}) =>
    {
        try
        {
            const response=await markPropertyAsDone(property_id);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const deletedProperty= createAsyncThunk(
    'property/delete',
    async(property_id, {rejectWithValue})=>
    {
        try{
            const response=await deleteProperty(property_id);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }

)

export const createPropertyPost= createAsyncThunk(
    '/property/createpost',
    async(formDataForBackend, {rejectWithValue})=>
    {
        try
        {
            const response=await createProperty(formDataForBackend);
            return response.data
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const createPropertyDraft= createAsyncThunk(
    '/property/createdraft',
    async(formDataForBackend, {rejectWithValue})=>
    {
        try
        {
            const response=await createPropertyAsDraft(formDataForBackend);
            return response.data
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const getDraftProperty=createAsyncThunk(
    'propert/getdraft',
    async(ownerId, {rejectWithValue})=>
    {
        try 
        {
            const response= await getDrafts(ownerId);
            return response.data
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)


const initialState = {
    error:null,
    savedProperties: [],
    message:'',
    results: [],
    propertyByStatus:[],
    loading: false,
    loadMore: false,

};

const propertyReducer = createSlice({
    name: 'Property',
    initialState,
    reducers: {
        clearMessage: (state)=> {
            state.message = '';
        },

        clearResults: (state) => {
            state.results = [];
        }
    },
    extraReducers: (builder)=> {
        builder 

        .addCase(getSavedProperties.fulfilled, (state, action) => {
            state.savedProperties = action.payload;
        })

        .addCase(getSavedProperties.rejected, (state, action) => {
            state.error = action.payload;
        })

        .addCase(saveProperty.fulfilled, (state, action) => {
            state.message = "Property saved in your wishlist successfully";
        })

        .addCase(saveProperty.rejected, (state, action) => {
            state.error = action.payload;
        })

        .addCase(removeProperty.fulfilled, (state, action) => {
            state.message = "Property removed from wishlist successfully";
        })

        .addCase(removeProperty.rejected, (state, action) => {
            state.error = action.payload;
        })

        .addCase(fetchSearchResults.pending, (state) => {
            state.loading = true;
            state.error = null;
            console.log("pending search results...")
        })

        .addCase(fetchSearchResults.fulfilled, (state, action) => {
            state.results = [...state.results, ...action.payload];
            console.log("results returned from search is:" , state.results)
            state.loading = false;
            state.loadMore = action.payload.length >= 10;
        })

        .addCase(fetchSearchResults.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            console.log("error returned in rejected:" , state.error)
        })

        .addCase(getPropertyByStatuss.pending, (state)=>
        {
            state.loading=true;
            state.error=null;
            console.log("Loading.....")

        })

        .addCase(getPropertyByStatuss.fulfilled, (state, action) =>
        {
            state.loading=false;
            state.propertyByStatus=action.payload;
            console.log("st as:", state.propertyByStatus)
            state.error=null;
        })

        .addCase(getPropertyByStatuss.rejected, (state, action)=>
        {
            state.loading=false;
            state.error=action.payload
            console.log("error in thunk")
        })

        .addCase(deletedProperty.pending,(state)=>
        {
            state.loading=true;
            state.error=null;
        })

        .addCase(deletedProperty.fulfilled, (state)=>
        {
            state.loading=false;
            state.error=null;
        })

        .addCase(deletedProperty.rejected, (state,action)=>
        {
            state.loading=false;
            state.error=action.payload
        })

        .addCase(closeProperty.pending, (state)=>
        {
            state.loading=true;
            state.error=null
        })
        .addCase(closeProperty.fulfilled, (state)=>
        {
            state.loading=false;
        })
        .addCase(closeProperty.rejected, (state, action)=>
        {
            state.loading=false;
            state.error=action.payload
        })
        .addCase(createPropertyPost.pending, (state)=>
        {
            state.loading=true;
        })

        .addCase(createPropertyPost.fulfilled, (state)=>
        {
            state.loading=false;
            console.log("post created")
        })

        .addCase(createPropertyPost.rejected, (state, action)=>
        {
            state.loading=false;
            state.error=action.payload
            console.log("didnt create post ")
        })

        .addCase(createPropertyDraft.pending, (state)=>
        {
            state.loading=true;
        })

        .addCase(createPropertyDraft.fulfilled, (state)=>
        {
            state.loading=false;
            console.log("draft created")
        })

        .addCase(createPropertyDraft.rejected, (state, action)=>
        {
            state.loading=false;
            state.error=action.payload
            console.log("didnt create post ")
        })

        .addCase(getDraftProperty.pending, (state)=>
            {
                state.loading=true;
                state.error=null;
                console.log("Loading Drafts.....")
    
            })
    
            .addCase(getDraftProperty.fulfilled, (state, action) =>
            {
                state.loading=false;
                state.propertyByStatus=action.payload;
                console.log("drafts are:", state.propertyByStatus)
                state.error=null;
            })
    
            .addCase(getDraftProperty.rejected, (state, action)=>
            {
                state.loading=false;
                state.error=action.payload
                console.log("error in thunk for draft")
            })
    }
});

export const {clearMessage , clearResults} = propertyReducer.actions;
export default propertyReducer.reducer;
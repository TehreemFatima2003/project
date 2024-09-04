import Axios from "axios";

export const API = Axios.create({
    baseURL:"http://localhost:5000"
})

// creating  apis for Admin
export const loginAdmin = (data) => API.post('admin/login' , data);
export const showPendingProperties = ()=> API.get('admin/view_pending');
export const approve = (id)=> API.patch(`admin/approve_pending/${id}`);
export const reject = (id)=> API.patch(`admin/reject_pending/${id}`);

// creating apis for user
export const loginUser = (data) => API.post('users/login' , data);
export const signupUser = (data) => API.post('users/signup' , data);


export const fetchAll = () => API.get('/property');
export const fetchfeatured = (query)=> API.get(`/property?${query}`);
export const fetchByLocation = (query)=> API.get(`/property?${query}`);
export const fetchSearched = (query)=> API.get('/property/search', {params: query,});

export const getSavedPropertiesFromWishlist= (userId) => API.get(`/users/savedproperty/${userId}`);
export const removePropertyFromWishlist = (queryString) => API.delete(`/users/savedproperty?${queryString}`);
export const savePropertyInWishlist= (data) =>API.post('/users/savedproperty', data);
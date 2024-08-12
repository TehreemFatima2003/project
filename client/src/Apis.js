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
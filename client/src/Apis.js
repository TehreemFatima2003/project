import Axios from "axios";

export const API = Axios.create({
    baseURL:"http://localhost:3000"
})

// creating  apis for different functions 
export const loginAdmin = (data) => API.post('admin/login' , data);
export const showPendingProperties = ()=> API.get('admin/view_pending');
export const approve = (id)=> API.patch(`admin/approve_pending/${id}`);
export const reject = (id)=> API.patch(`admin/reject_pending/${id}`);
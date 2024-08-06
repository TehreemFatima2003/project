import Axios from "axios";

export const API = Axios.create({
    baseURL:"http://localhost:3000"
})

// creating  apis for different functions 
export const loginAdmin = (data) => API.post(`admin/login` , data);
// export const show_Users = ()=> API.get(`users`);
// export const delete_User = (id)=> API.delete(`users/${id}`);
// export const searchUser = (id)=> API.get(`users/${id}`);
// export const update_User = (id , data)=> API.patch(`users/${id}`,data);
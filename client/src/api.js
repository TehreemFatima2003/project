import axios from 'axios'

const API=axios.create(
    {
        baseURL:"http://localhost:5000"
    }
)

export const getPropertyById = (property_id) => API.get(`/property/${property_id}`);



export const getPropertyByStatus= (queryString) => API.get(`/property/owner?${queryString}`);

export const markPropertyAsDone= (property_id) => API.patch(`/property/markproperty/${property_id}`);

export const savePropertyInWishlist= (data) =>API.post('/users/savedproperty', data);

export const removePropertyFromWishlist = (queryString) => API.delete(`/users/savedproperty?${queryString}`);

export const getSavedPropertiesFromWishlist= (userId) => API.get(`/users/savedproperty/${userId}`);

export const createProperty = (formDataForBackend) => {
  console.log(formDataForBackend);
  
    return API.post('/property/add' , formDataForBackend, {
      headers: {
        'Content-Type': 'multipart/form-data',
    },
    });
  };
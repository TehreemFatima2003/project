import axios from 'axios'

const API=axios.create(
    {
        baseURL:"http://localhost:5000"
    }
)

export const removePropertyFromWishlist = (queryString) => API.delete(`/users/savedproperty?${queryString}`);


export const savePropertyInWishlist= (data) =>API.post('/users/savedproperty', data);
export const getSavedPropertiesFromWishlist= (userId) => API.get(`/users/savedproperty/${userId}`);

export const getPropertyById = (property_id) => API.get(`/property/${property_id}`);



export const getPropertyByStatus= (queryString) => API.get(`/property/owner?${queryString}`);

export const markPropertyAsDone= (property_id) => API.patch(`/property/markproperty/${property_id}`);

export const getDrafts= (ownerId) => API.get(`/property/drafts/${ownerId}`); 



export const submitDraft= (property_id) => API.patch(`/property//postdraft/${property_id}`)

export const deleteProperty= (property_id) =>API.delete(`/property/delete/${property_id}`)

export const createPropertyAsDraft= (formDataForBackend) => {
  console.log(formDataForBackend);
  
    return API.post('/property/adddraft' , formDataForBackend, {
      headers: {
        'Content-Type': 'multipart/form-data',
    },
    });
  };




export const createProperty = (formDataForBackend) => {
  console.log(formDataForBackend);
  
    return API.post('/property/add' , formDataForBackend, {
      headers: {
        'Content-Type': 'multipart/form-data',
    },
    });
  };


export const updateProperty= (property) => API.patch('/property/update', property)







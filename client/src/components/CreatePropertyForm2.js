import React, { useState } from 'react';

import { createPropertyPost, createPropertyDraft } from '../redux/features/Property/propertySlice';
import { useDispatch, useSelector } from 'react-redux';


const CreatePropertyForm2 = () => {
  const dispatch = useDispatch();
  const {loading, error}= useSelector((state) => state.Property)
  const [property, setProperty] = useState({
    name: '',
     //ownerId: '66b067c4c39c01e7262c2847', // Example owner ID
    ownerId:'66ade13ff5858085c1b9bf4c', //hamna
    address: '',
    city: '',
    area: '',
    purpose: 'rent', // default value
    price: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    garage: false,
    portions: '',
    type: 'house', // default value
    photo: '', // Array for file upload
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setProperty((prevProperty) => ({
        ...prevProperty,
        [name]: checked,
      }));
    } else {
      setProperty((prevProperty) => ({
        ...prevProperty,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    // const files = Array.from(e.target.files);
    setProperty((prevProperty) => ({
      ...prevProperty,
      photo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("property state: ", property);
    console.log("photo: ", property.photo);
  
    try {
      const formDataForBackend = new FormData();
      
      // Append each image individually using the 'photo' field name
      // property.photo.forEach((image) => {
      //   formDataForBackend.append("photo", image); // Use 'photo' as the field name
      // });
  
      // Append other property details
      formDataForBackend.append("name", property.name);
      formDataForBackend.append("ownerId", property.ownerId);
      formDataForBackend.append("address", property.address);
      formDataForBackend.append("city", property.city);
      formDataForBackend.append("area", property.area);
      formDataForBackend.append("purpose", property.purpose);
      formDataForBackend.append("price", property.price);
      formDataForBackend.append("description", property.description);
      formDataForBackend.append("bedrooms", property.bedrooms);
      formDataForBackend.append("bathrooms", property.bathrooms);
      formDataForBackend.append("garage", property.garage);
      formDataForBackend.append("portions", property.portions);
      formDataForBackend.append("type", property.type);
      formDataForBackend.append("file", property.photo)
      
      dispatch(createPropertyPost(formDataForBackend))
      // const response = await createProperty(formDataForBackend);
  
      // console.log(response);
  
      // if (response.status === 400) {
      //   alert("Error occurred while creating the property. Please try again.");
      // } else {
      //   alert("Property created successfully!");
      //   setProperty({});
      // }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };


  const handleDraft = async (e) => {
    e.preventDefault();
    console.log("property state: ", property);
    console.log("photo: ", property.photo);
  
    try {
      const formDataForBackend = new FormData();
      
      // Append each image individually using the 'photo' field name
      // property.photo.forEach((image) => {
      //   formDataForBackend.append("photo", image); // Use 'photo' as the field name
      // });
  
      // Append other property details
      formDataForBackend.append("name", property.name);
      formDataForBackend.append("ownerId", property.ownerId);
      formDataForBackend.append("address", property.address);
      formDataForBackend.append("city", property.city);
      formDataForBackend.append("area", property.area);
      formDataForBackend.append("purpose", property.purpose);
      formDataForBackend.append("price", property.price);
      formDataForBackend.append("description", property.description);
      formDataForBackend.append("bedrooms", property.bedrooms);
      formDataForBackend.append("bathrooms", property.bathrooms);
      formDataForBackend.append("garage", property.garage);
      formDataForBackend.append("portions", property.portions);
      formDataForBackend.append("type", property.type);
      formDataForBackend.append("file", property.photo)
      
      dispatch(createPropertyDraft(formDataForBackend))
      // const response = await createPropertyAsDraft(formDataForBackend);
  
      // console.log(response);
  
      // if (response.status === 400) {
      //   alert("Error occurred while saving draft of  the property. Please try again.");
      // } else {
      //   setProperty({});
      //   alert("Draft created successfully!");
      // }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  if(loading)
    return(
      <div>
        Saving property.......
      </div>
    )
    
    if(error)
      return(
        <div>
          oops! Something Went Wrong
        </div>
      )
  

  return (
    <form onSubmit={handleSubmit}  encType="multipart/form-data" className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Add Property Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700 text-sm">Name</label>
          <input
            type="text"
            name="name"
            value={property.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700 text-sm">Address</label>
          <input
            type="text"
            name="address"
            value={property.address}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700 text-sm">City</label>
          <input
            type="text"
            name="city"
            value={property.city}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700 text-sm">Area</label>
          <input
            type="text"
            name="area"
            value={property.area}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700 text-sm">Purpose</label>
          <select
           type= "text"
            name="purpose"
            value={property.purpose}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700 text-sm">Price</label>
          <input
            type="number"
            name="price"
            value={property.price}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-2 col-span-2">
          <label className="font-semibold text-gray-700">Description (300 words max)</label>
          <textarea
            name="description"
            value={property.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength="300"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700 text-sm">Bedrooms</label>
          <input
            type="number"
            name="bedrooms"
            value={property.bedrooms}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700 text-sm">Bathrooms</label>
          <input
            type="number"
            name="bathrooms"
            value={property.bathrooms}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="garage"
            checked={property.garage}
            onChange={handleChange}
            className="w-5 h-5 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label className="font-semibold text-gray-700 text-sm">Garage Available</label>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700 text-sm">Portions</label>
          <input
            type="number"
            name="portions"
            value={property.portions}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700 text-sm">Type</label>
          <select
            name="type"
            value={property.type}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="house">House</option>
            <option value="flat">Flat</option>
          </select>
        </div>

        <div className="flex flex-col space-y-2 col-span-2">
          <label className="font-semibold text-gray-700">Images</label>
          <input
            type="file"
            name="images"
            onChange={handleImageChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
            multiple
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-1/2 mx-3 mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>

      <button
        type="button"
        className="w-1/2 mt-6 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={handleDraft}
      >
        Save As Draft
      </button>
    </form>
  );
};

export default CreatePropertyForm2;

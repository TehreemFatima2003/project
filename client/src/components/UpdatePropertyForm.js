
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateProperty } from '../api';

const UpdatePropertyForm = () => {

    const location=useLocation();
    const navigate=useNavigate()
    const { property }=location.state;
    console.log("property original: ",property)
    console.log("image of object received: ", property.images)
    
    
    const [newProperty, setNewProperty] = useState({
        _id:property._id,
        name: property.name,
        ownerId: property.ownerId, 
        address: property.address,
        city: property.city,
        area: property.area,
        purpose: property.purpose, 
        price: property.price,
        description:property.description,
        bedrooms: property.bedroom,
        bathrooms: property.bathroom,
        garage: property.garage,
        portions: property.numberOfPortions,
        type: property.type, 
        images:  property.images, 
      });

      console.log("property received: ", newProperty)

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
          setNewProperty((prevProperty) => ({
            ...prevProperty,
            [name]: checked,
          }));
        } else {
          setNewProperty((prevProperty) => ({
            ...prevProperty,
            [name]: value,
          }));
        }
      };
      
      const handleImageChange = (e) => {
        // const files = Array.from(e.target.files);
        setNewProperty((prevProperty) => ({
          ...prevProperty,
          photo: e.target.files[0],
        }));
      };


      const handleButton= async(newProperty, buttonName,e ) =>
      {
         try{
            
            var data;
            if(buttonName==="submit")
            {

                console.log("property state: ", property)
                data={
                    property: newProperty,
                    submit:true
                }
                
            }
            else
            {
                console.log("property state: ", property)
                data={
                    property: newProperty,
                    submit:false
                }
                
            }
            const response = await updateProperty(data);
            if(response.status==200)
                {alert("successfulyy updated")
                    navigate('/seller/draftproperty')
                }
            else
            alert("error occured")
            console.log("response: ", response.data)
         }
         catch (error)
         {
            console.log("error: ", error)
         }
      }


    return (
        <form   encType="multipart/form-data" className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-6">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Update Property Draft</h2>
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-gray-700 text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={newProperty.name}
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
                value={newProperty.address}
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
                value={newProperty.city}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-gray-700 text-sm">Area</label>
              <input
                type="text"
                name="area"
                value={newProperty.area}
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
                value={newProperty.purpose}
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
                value={newProperty.price}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
    
            <div className="flex flex-col space-y-2 col-span-2">
              <label className="font-semibold text-gray-700">Description (300 words max)</label>
              <textarea
                name="description"
                value={newProperty.description}
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
                value={newProperty.bedrooms}
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
                value={newProperty.bathrooms}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
    
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="garage"
                checked={newProperty.garage}
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
                value={newProperty.portions}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-gray-700 text-sm">Type</label>
              <select
                name="type"
                value={newProperty.type}
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
                //accept="image/*"
                multiple
              />
                <div>
                {newProperty.images.map((image, index) => (
                    <img
                    key={index}
                    src={image}
                    
                    width="100"
                    />
                ))}
                </div>
            </div>
          </div>
          <div className="w-1/2 mx-auto flex flex-col">
            <button
              type="button"
              className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mt-6"
              onClick={() => handleButton(newProperty, "submit")}
            >
              Submit
            </button>

            <button
              type="button"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mt-4"
              onClick={() => handleButton(newProperty, "save")}
            >
              Save
            </button>
          </div>


        </form>
      );
}

export default UpdatePropertyForm

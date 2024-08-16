import React, { useState } from 'react';
import { createProperty } from '../api';

const CreatePropertyForm = () => {
  const [property, setProperty] = useState({
    name: '',
    ownerId:'60d5f60f4f1b2c001c8d9f8e',
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
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      console.log(`${name} checkbox changed:`, checked);  // Add this line to debug
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
    const files = Array.from(e.target.files);
    setProperty({
      ...property,
      images: files,
    });
  };

  const handleSubmit = async (e) => {
    try
    {
        e.preventDefault();
    console.log("value before submitting: ",property)
    const response=await createProperty(property);
    console.log("response from server: ", response.data)
    console.log('Property Details:', property);
    }

    catch(error)
    {
        console.log("error: ", error)
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-6">
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
            required
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
            name="purpose"
            value={property.purpose}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="rent">Rent</option>
            <option value="buy">Buy</option>
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
        type="submit"
        className="w-1/2 mt-6 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Save As Draft
      </button>
    </form>
  );
};

export default CreatePropertyForm;

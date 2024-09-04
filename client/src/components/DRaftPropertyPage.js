import React, { useEffect, useState } from 'react';
import { getDrafts, submitDraft } from '../api';
import {useNavigate} from 'react-router-dom'
import { useSelector , useDispatch} from 'react-redux';
import {getDraftProperty}  from '../redux/features/Property/propertySlice';



const DraftPropertyPage = () => {
  const dispatch=useDispatch();
  const navigate= useNavigate();
  const ownerId = '66ade13ff5858085c1b9bf4c';
  const {propertyByStatus, error, loading}=useSelector((state) => state.Property);
  const fetchDraft = async () => {
    try {
  
      dispatch(getDraftProperty(ownerId));
    } catch (error) {
      console.log("Error fetching drafts: ", error);
    }
  };
  const handleSubmit= async(property_id)=>
  {
    try
    {
      const response=await submitDraft(property_id);
      console.log("response: ", response.data.status)
      if(response.status==200)
        fetchDraft();

    }
    catch(error)
    {
      console.log("error: ",error)
    }
  }
  
  const handleUpdate=(property)=>
  {
    navigate('/seller/editdraft', { state : {property}});
  }

  useEffect(() => {
    fetchDraft();
  }, []);

  if(loading)
    return(
      <div className="loader-container">
            <div className="loader">
                <span className="loader-text">Loading...</span>
            </div>
        </div> )


  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Your Drafts</h2>
      {propertyByStatus.length === 0 ? (
        <p>No drafts available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propertyByStatus.map((property) => (
            <div
              key={property._id}
              className="bg-white p-4 rounded-lg shadow-lg border border-gray-300"
            >
              <div className="mb-4">
                {property.images.length > 0 ? (
                  <img
                    src={property.images[0]} // Display the first image
                    alt="Property"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                ) : (
                  <div className="bg-gray-300 w-full h-40 rounded-lg flex items-center justify-center text-gray-500">
                    No Image Available
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
              <p className="text-gray-700 mb-4">Price: ${property.price}</p>
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => handleUpdate(property)}
                >
                  Edit
                </button>
                <button
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                  onClick={() => handleSubmit(property._id)}
                >
                  Submit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DraftPropertyPage;

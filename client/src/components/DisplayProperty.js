import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { closeProperty, deletedProperty, getPropertyByStatuss } from '../redux/features/Property/propertySlice';
import { useDispatch, useSelector } from 'react-redux';

const DisplayProperty = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status'); // Get the `status` from query parameters

  const dispatch = useDispatch();
  const {propertyByStatus, error, loading}=useSelector((state) => state.Property);

  const markAsDone = async (property_id) => {
    try {
      dispatch(closeProperty(property_id))
      fetchProperty()
      
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const fetchProperty=() =>
  {
    const ownerId = '66ade13ff5858085c1b9bf4c';
      const data = {
        ownerId: ownerId,
        status: status,
      };
      const queryString = new URLSearchParams(data).toString();
      dispatch( getPropertyByStatuss(queryString));
  }

  

  useEffect(() => {
    fetchProperty();
    
  }, [status ]); // Re-fetch properties when `status` changes


  const handleDelete= (property_id) => {
    try
    {
      dispatch(deletedProperty(property_id))
      fetchProperty()

    }
    catch (error) {
      console.log("error : ", error);
    }
  }

  if(loading)
    return(
      <div className="loader-container">
            <div className="loader">
                <span className="loader-text">Loading...</span>
            </div>
        </div>
  )

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h3>Properties under {status}</h3>
      {propertyByStatus.length === 0 ? (
        <div className="flex flex-col space-y-4 text-center font-bold text-lg text-black-700">
          No property under {status} status
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {propertyByStatus.map((property) => (
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-300"
              key={property._id}>
              {/* Image Section */}
              <div className="mb-4">
                {property.images.length > 0 ? (
                  <img
                    src={property.images[0]} // Assuming images[0] is the main image
                    alt="Property"
                    className="w-full h-40 rounded-lg"
                  />
                ) : (
                  <div className="bg-gray-300 w-full h-40 rounded-lg flex items-center justify-center text-gray-500">
                    No Image Available
                  </div>
                )}
              </div>

              {/* Details Section */}
              <h2 className="text-xl font-bold">{property.name}</h2>
              <p className="text-gray-600">Status: {property.status}</p>
              <p className="text-gray-600">Area: {property.area} sq ft</p>
              <p className="text-gray-600">Price: ${property.price}</p>

              {status === "approved" && (
                <div className="flex justify-center mt-4 md:mt-0">
                  <button
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded"
                    onClick={() => markAsDone(property._id)}>
                    Mark As Done
                  </button>
                </div>
              )}
              <button className='bg-red-700 w-20 h-12 rounded-md text-white mt-2 py-2 px-2 rounded-lg  text-lg'
              onClick={() => handleDelete(property._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayProperty;

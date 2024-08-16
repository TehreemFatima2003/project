import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPropertyByStatus, markPropertyAsDone } from '../api';

const DisplayProperty = () => {
  const [propertyRecord, setPropertyRecord] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status'); // Get the `status` from query parameters

  const getProperty = async () => {
    try {
      const ownerId = '66b067c4c39c01e7262c2847';
      const data = {
        ownerId: ownerId,
        status: status,
      };

      const queryString = new URLSearchParams(data).toString();
      console.log(queryString);

      const response = await getPropertyByStatus(queryString);
      setPropertyRecord(response.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    getProperty();
  }, [status]); // Re-fetch properties when `status` changes

  const markAsDone=async (property_id) =>
  {
    try
    {
        const response=await markPropertyAsDone(property_id);
        if(response.status==404)
            alert("issue occured try again later")

    }
    catch(error)
    {
        console.log("error : ", error)
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      {propertyRecord.length === 0 ? (
        <div className="flex flex-col space-y-4 text-center font-bold text-lg text-white text-xlg font-bold">
        No property under {status} status
      </div>
      
      ) : (
        propertyRecord.map((property) => (
          <div
            key={property._id}
            className="flex bg-lightgrey p-4 rounded-lg shadow-md mx-3 my-4">
            {/* Image Section */}
            <div className="w-1/4">
              {property.images.length > 0 ? (
                <img
                  src={property.images[0]} // Assuming images[0] is the main image
                  alt="Property"
                  className="w-full h-auto rounded-lg"
                />
              ) : (
                <div className="bg-gray-300 w-full h-48 rounded-lg flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="w-3/4 pl-6 flex flex-col justify-center">
              <h2 className="text-xl font-bold">{property.address}</h2>
              <p className="text-gray-600">Status: {property.status}</p>
              <p className="text-gray-600">Area: {property.area} sq ft</p>
              <p className="text-gray-600">Price: ${property.price}</p>
            </div>

            {status === "approved" && propertyRecord.length && !property.markAsDone> 0 && (
                <div className="flex justify-center mt-4">
                <button className="bg-green-500 text-white  font-bold py-2 px-4 rounded" 
                onClick={() => markAsDone(property._id)}>
                   Mark As Done
                </button>
                </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default DisplayProperty;

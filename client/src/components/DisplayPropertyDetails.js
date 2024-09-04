import React, { useEffect, useState } from 'react';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { getPropertyById, getSavedPropertiesFromWishlist, removePropertyFromWishlist, savePropertyInWishlist } from '../api';

import { useLocation, useNavigate } from 'react-router-dom';

const DisplayPropertyDetails = () => {
  const navigate=useNavigate();
  const location= useLocation();
  const { property} =location.state

  const [isSaved, setSaved] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const userId = '66ade13ff5858085c1b9bf4c';

   const getUserSavedProperties= async () =>
   {
    try
    {
      const response = await getSavedPropertiesFromWishlist(userId);
      const userWishList=response.data;
      console.log("response ", userWishList)

      if(userWishList.includes(property._id)  )
        setSaved(true);
      
      
    }
    catch(error)
    {
      console.error("error: ", error)
    }
   }

  

  useEffect(() => {
    getUserSavedProperties();
   
  }, [userId, property.id]);

  const handleSave = async () => {
    setSaved((prevState) => !prevState);
    if(isSaved)
    {
        try{
          console.log("property removed from saved");
          console.log("property id: ", property._id)
          const queryString = `userId=${userId}&property_id=${property._id}`;
          console.log("query string : ", queryString);
          const response= await removePropertyFromWishlist( queryString );
          console.log("response: ", response.data)
        }
        catch (error)
        {
          console.log("error: ", error)
        }
    }
      
    else
    {
        try
        { 
          
          const data={
            userId:userId,
            propertyId:property._id
          }
          console.log("propert  saved");
          const response= await (savePropertyInWishlist(data));
          console.log("response : ",response.data)
        }
        catch(error)
        {
          console.log("error: ", error)
        }
    }
   
     

  };

  const handleChat =async (ownerId)=>
  {
    try{
      

     }
     catch(error)
    {
     
    }
     
  }

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-left">{property.name}</h1>

      <div className="flex gap-4 mb-3">
        {property.images.length === 0 ? (
          <div className="bg-gray-300 w-full h-64 rounded-lg shadow-md text-gray-500">
            No Image Available
          </div>
        ) : property.images.length === 1 ? (
          <div className="flex-1 relative w-1">
            <img 
              src={property.images[0]} 
              alt="Property image" 
              className="w-full h-64 object-cover rounded-lg shadow-md" 
            />
          </div>
        ) : (
          <div className="flex-1 relative w-1">
            {/* Carousel Section */}
            <img 
              src={property.images[currentImageIndex]} 
              alt={`Property image ${currentImageIndex + 1}`} 
              className="w-full h-64 object-cover rounded-lg shadow-md" 
            />
            <button 
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              onClick={handlePrevClick}
            >
              &lt;
            </button>
            <button 
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              onClick={handleNextClick}
            >
              &gt;
            </button>

            {/* Display dots for each image */}
            <div className="flex justify-center mt-4">
              {property.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 mx-1 rounded-full ${currentImageIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                ></div>
              ))}
            </div>
          </div>
        )}

        {/* Buttons Section */}
        <div className="flex-1 flex flex-col justify-center space-y-4 place-content-center">
          <button className="bg-blue-500 text-white py-2 px-8 rounded hover:bg-blue-600 w-1/2" onClick={handleSave}>
            {isSaved ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />}
            <span className="ml-2">{isSaved ? 'Saved' : 'Save Property'}</span>
          </button>
          <button className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 w-1/2"
          onClick={()=>handleChat(property.ownerId)}
          >Chat with seller</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-3">
        <h2 className="text-2xl font-semibold mb-2 text-left my-2">Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 my-2">
            <tbody>
              <tr className="bg-white">
                <td className="px-6 py-4 border-b border-gray-200 text-md font-semibold">Address</td>
                <td className="px-6 py-4 border-b border-gray-200 text-md">{property.address}, {property.area}, {property.city}</td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 border-b border-gray-200 text-md font-semibold">Area</td>
                <td className="px-6 py-4 border-b border-gray-200 text-md">{property.area}</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 border-b border-gray-200 text-md font-semibold">Price</td>
                <td className="px-6 py-4 border-b border-gray-200 text-md">${property.price}</td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 border-b border-gray-200 text-md font-semibold">Bedrooms</td>
                <td className="px-6 py-4 border-b border-gray-200 text-md">{property.bedroom}</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 border-b border-gray-200 text-md font-semibold">Bathrooms</td>
                <td className="px-6 py-4 border-b border-gray-200 text-md">{property.bathroom}</td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 border-b border-gray-200 text-md font-semibold">Garage</td>
                <td className="px-6 py-4 border-b border-gray-200 text-md">{property.garage ? 'Yes' : 'No'}</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 border-b border-gray-200 text-md font-semibold">Purpose</td>
                <td className="px-6 py-4 border-b border-gray-200 text-md">{property.purpose}</td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-6 py-4 border-b border-gray-200 text-md font-semibold">Size</td>
                <td className="px-6 py-4 border-b border-gray-200 text-md">{property.size}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-left">Description</h2>
          <p>{property.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayPropertyDetails;

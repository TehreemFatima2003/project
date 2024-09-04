import React, { useEffect, useState } from 'react';
import { getPropertyById, getSavedPropertiesFromWishlist, removePropertyFromWishlist } from '../api';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './Footer';

const ViewSavedProperty = () => {
    const userId = '66baf0c6648f30dd2d1d56dc';
    const navigate = useNavigate();
    const [savedProperties, setSavedProperties] = useState([]);

    const fetchSavedProperties = async () => {
        try {
            const response = await getSavedPropertiesFromWishlist(userId);
            const savedPropertyIds = response.data;
            console.log("res from server: ", savedPropertyIds);

            const propertyDetailsPromises = savedPropertyIds.map(async (propertyId) => {
                const propertyResponse = await getPropertyById(propertyId);
                console.log("res ", propertyResponse)

                if (propertyResponse.status === 250) {
                    console.log("Property not found for ID:", propertyId);
                    const queryString = `userId=${userId}&property_id=${propertyId}`;
                    console.log("query string: ", queryString);
                    const response = await removePropertyFromWishlist(queryString);
                    console.log("response for removing", response);
                    return null;
                }
                return propertyResponse.data;
            });

            const properties = (await Promise.all(propertyDetailsPromises)).filter(property => property !== null && property !== undefined);
            console.log("details :", properties)
            setSavedProperties(properties);

            console.log("Saved properties: ", properties);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const handleDelete = async (propertyId) => {
        try {
            const queryString = `userId=${userId}&property_id=${propertyId}`;
            console.log("Query string: ", queryString);
    
            const response = await removePropertyFromWishlist(queryString);
            
            if (response.status === 200) {
                fetchSavedProperties();
            } else {
                console.log("Unexpected status code: ", response.status);
            }
        } catch (error) {
            console.log("Error occurred while removing property from wishlist: ", error);
        }
    };
    
    const handleDetailPage = (property) => {
        navigate('/displayproperty', { state: { property } });
    }

    useEffect(() => {
        fetchSavedProperties();
    }, []);

    return (
        <div className='bg-gray-100'>
            <Navbar />
            <div className="pt-24">
                <h2 className="text-xl font-semibold mb-4 text-darkblue font-extrabold">Your Saved Property</h2>
                {savedProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10">
                        {savedProperties.map((property) => (
                            <div key={property._id} className="relative bg-white p-4 rounded-lg shadow-lg border border-gray-300 overflow-hidden">
                                {property.status === "closed" && (
                                    <div className="absolute inset-0 bg-black bg-opacity-40 z-10 rounded-lg flex flex-col items-center justify-center space-y-2">
                                        <span className="text-2xl font-bold text-white">Deal Closed</span>
                                        <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                        onClick={() => handleDelete(property._id)}>
                                            Remove
                                        </button>
                                </div>
                                
                                )}
                                <div className={`${property.status === "closed" ? "blur-sm" : ""} relative z-0`}>
                                    {property.images.length === 0 ? (
                                        <div className="bg-gray-300 w-full h-40 rounded-lg flex items-center justify-center text-gray-500">
                                            No Image Available
                                        </div>
                                    ) : (
                                        <div className="relative w-full">
                                            <img
                                                src={property.images[0]}
                                                alt="Property"
                                                className="w-full h-40 object-cover rounded-lg"
                                            />
                                        </div>
                                    )}
                                    <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
                                    <p className="text-gray-700">Type: {property.type}</p>
                                    <p className="text-gray-700">Purpose: {property.purpose}</p>
                                    <p className="text-gray-700">Price: {property.price}</p>
                                    <button
                                        className="mt-2 px-4 py-2 bg-green-600 text-bold rounded hover:bg-red-700"
                                        onClick={() => handleDetailPage(property)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No properties saved yet.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default ViewSavedProperty;

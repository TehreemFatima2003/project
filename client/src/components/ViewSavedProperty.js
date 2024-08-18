import React, { useEffect, useState } from 'react';
import { getPropertyById, getSavedPropertiesFromWishlist } from '../api';
import { useNavigate } from 'react-router-dom';

const ViewSavedProperty = () => {
    const userId = '66ade13ff5858085c1b9bf4c';
    const navigate = useNavigate();
    const [savedProperties, setSavedProperties] = useState([]);

    const fetchSavedProperties = async () => {
        try {
            const response = await getSavedPropertiesFromWishlist(userId);
            const savedPropertyIds = response.data;
            console.log("res from server: ", savedPropertyIds);

            const propertyDetailsPromises = savedPropertyIds.map(async (propertyId) => {
                const propertyResponse = await getPropertyById(propertyId);
                return propertyResponse.data;
            });

            const properties = await Promise.all(propertyDetailsPromises);
            setSavedProperties(properties);

            console.log("Saved properties: ", properties);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const handleDetailPage = (property) => {
        navigate('/displayproperty', { state: { property } });
    }

    useEffect(() => {
        fetchSavedProperties();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Your Saved Properties</h2>
            {savedProperties.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                    {savedProperties.map((property) => (
                        <div key={property._id} className="relative p-4 border border-gray-300 rounded-lg shadow-sm">
                            {property.markAsDone && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
                                    <span className="text-2xl font-bold text-red-600">Deal Closed </span>
                                </div>
                            )}
                            <div className="border-black rounded-md">
                                {property.images.length === 0 ? (
                                    <div className="bg-gray-300 w-full h-64 rounded-lg shadow-md flex items-center justify-center text-gray-500">
                                        No Image Available
                                    </div>
                                ) : (
                                    <div className="relative w-full">
                                        <img
                                            src={property.images[0]}
                                            alt="Property"
                                            className="w-full h-64 object-cover rounded-lg shadow-md"
                                        />
                                    </div>
                                )}
                                <h3 className="text-lg font-bold mt-2">{property.name}</h3>
                                <p className="text-gray-700">{property.description}</p>
                                <p className="text-gray-700">{property.type}</p>
                                <p className="text-gray-700">{property.purpose}</p>
                                <p className="text-gray-700">{property.price}</p>
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
    );
}

export default ViewSavedProperty;

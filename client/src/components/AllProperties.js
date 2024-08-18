import React from 'react';
import Navbar from './navbar'; 
import Footer from './Footer'; 
import locationIcon from '../assets/locationIcon.png'; 
import image1 from "../assets/bg1.jpg"
import image2 from "../assets/bg2.jpg"


const properties = [

    {
    id: 1,
    name: 'Beautiful Family House',
    location: 'New York',
    price: '$300,000',
    images: [image1],
    purpose: 'For Sale',
  },
  {
    id: 2,
    name: 'Modern Apartment',
    location: 'Los Angeles',
    price: '$2,500/month',
    images: [image2],
    purpose: 'For Rent',
  },
  {
    id: 3,
    name: 'Beautiful Family House',
    location: 'New York',
    price: '$300,000',
    images: [],
    purpose: 'For Sale',
  },
  {
    id: 4,
    name: 'Modern Apartment',
    location: 'Los Angeles',
    price: '$2,500/month',
    images: [image2 , image1],
    purpose: 'For Rent',
  },
  { 
    id: 4,
    name: 'Modern Apartment',
    location: 'Los Angeles',
    price: '$2,500/month',
    images: [image2 , image1],
    purpose: 'For Rent',
  }
];

const AllPropertiesPage = () => {
    return (
        <div className="bg-lightgrey min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 p-5 md:p-10 mt-16">
            <h1 className="text-3xl font-bold text-darkblue mb-8 mt-7">All Properties</h1>
            {properties.length === 0 ? (
            <p className="text-center text-lg text-gray-700">No properties to display</p>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {properties.map((property) => (
                <div key={property.id} className="border border-darkblue shadow-lg rounded-md overflow-hidden">
                    <div className="relative group">
                    {property.images.length > 0 ? (
                        <img
                        src={property.images[0]}
                        alt={`Property ${property.name}`}
                        className="w-full h-48 object-cover"
                        />
                    ) : (
                        <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-500">
                        No images available
                        </div>
                    )}
                    <span
                        className={`absolute top-2 left-2 bg-orange text-white text-xs px-2 py-1 rounded ${
                        property.purpose === 'For Sale' ? 'bg-orange' : 'bg-green-500'
                        }`}
                    >
                        {property.purpose}
                    </span>
                    </div>
                    <div className="p-4">
                    <h3 className="text-lg font-semibold text-darkblue">{property.name}</h3>
                    <p className="text-gray-600">{property.price}</p>
                    <p className="text-gray-600 flex items-center">
                        <img src={locationIcon} alt="Location" className="w-4 h-5 mr-1" />
                        {property.location}
                    </p>
                    <button
                        className="mt-4 bg-darkblue text-white border border-darkblue py-2 px-4 rounded hover:bg-white hover:text-darkblue"
                        onClick={() => alert(`Showing details for ${property.name}`)}
                    >
                        Show Details
                    </button>
                    </div>
                </div>
                ))}
            </div>
            )}
        </main>
        <Footer />
        </div>
    );
};

export default AllPropertiesPage;

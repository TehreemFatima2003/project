import React from 'react';
import { useNavigate } from 'react-router-dom';

import {useSelector} from 'react-redux'

import houseIcon from '../assets/house-real-estate-icon.png'; 

import backgroundImage from '../assets/bg6.jpg';
import bg1 from "../assets/bg1.jpg";
import bg2 from "../assets/bg2.jpg";
import bg3 from "../assets/bg4.jpg";
import locationIcon from "../assets/locationIcon.png";
import city1 from "../assets/bg1.jpg";
import city2 from "../assets/bg2.jpg";
import city3 from "../assets/admnBg1.jpg";
import city4 from "../assets/admnBg2.jpg";
import city5 from "../assets/bg5.jpg";
import time from "../assets/time.png"
import money from "../assets/money.png"
import trust from "../assets/trust.png"
import favorite from "../assets/favorite.png"

import agent1 from "../assets/agent1.jpg"
import agent2 from "../assets/agent2.jpg"
import agent3 from "../assets/agent3.jpg"
import agent4 from "../assets/agent4.jpg"
import phoneIcon from "../assets/telephone.png"
import Navbar from './navbar';
import Footer from './Footer';





const HomePage = () => {

    const navigate = useNavigate();


    const properties = [
        { id: 1, name: 'Beautiful Family House', price: '$500,000', location: 'New York', purpose: 'For Sale', image: bg1 },
        { id: 2, name: 'Modern Apartment', price: '$1,200 / month', location: 'Los Angeles', purpose: 'For Rent', image: bg2 },
        { id: 3, name: 'Luxury Villa', price: '$2,000,000', location: 'Miami', purpose: 'For Sale', image: bg3 },
        { id: 4, name: 'Beautiful Family House', price: '$500,000', location: 'New York', purpose: 'For Sale', image: bg1 },
        { id: 5, name: 'Modern Apartment', price: '$1,200 / month', location: 'Los Angeles', purpose: 'For Rent', image: bg2 },
        { id: 6, name: 'Luxury Villa', price: '$2,000,000', location: 'Miami', purpose: 'For Sale', image: bg3 },
    ];

    const locations = [

        { id: 1, name: 'Rawalpindi', image: city1 },
        { id: 2, name: 'Karachi', image: city2 },
        { id: 3, name: 'Lahore', image: city3 },
        { id: 4, name: 'Islamabad', image: city4 },
        { id: 5, name: 'Quetta', image: city5 },
=======
        { id: 1, name: 'City 1', image: city1 },
        { id: 2, name: 'City 2', image: city2 },
        { id: 3, name: 'Lahore', image: city3 },
        { id: 4, name: 'Islamabad', image: city4 },
        { id: 5, name: 'LA', image: city5 },

    ];

    const features = [
        { id: 1, icon: trust, title: 'Trusted by Thousands', text: 'We have helped thousands of people find their dream homes.' },
        { id: 2, icon: favorite, title: 'Wide Range of Properties', text: 'We offer a diverse selection of properties to choose from.' },
        { id: 3, icon: money, title: 'Financing Made Easy', text: 'We provide various financing options to suit your needs.' },
        { id: 4, icon: time, title: '24/7 Support', text: 'Our team is available around the clock to assist you.' },
    ];


    const agents = [
        { id: 1, name: 'Jenny White', title: 'Sunshine', phone: '9635872558', image: agent3 },
        { id: 2, name: 'John White', title: 'Sunshine', phone: '9635872558', image: agent2 },
        { id: 3, name: 'Merry Rose', title: 'Sunshine', phone: '9635872558', image: agent1 },
        { id: 4, name: 'Alex Roy', title: 'Sunshine', phone: '9635872558', image: agent4 },
    ];
    
    return (
        <div className="relative bg-lightgrey">
            <div className="bg-cover bg-center h-80" style={{ backgroundImage: `url(${backgroundImage})` }}></div>

            <Navbar />

            <div className="absolute flex flex-col justify-center items-center text-center text-white top-36 inset-x-px">
                <h1 className="text-4xl font-extrabold mb-4">Find Your Dream House</h1>
                <p className="text-2xl font-medium">From as low as $10 per day with a range of facilities.</p>
            </div>

            {/* Other sections of your homepage */}
                        {/* Search Bar */}
                        <div className="bg-white p-5 rounded-md shadow-md mt-12 mx-auto max-w-4xl relative z-20 flex items-center space-x-4">

    return (
        <div className="relative bg-lightgrey">
            <div
                className="bg-cover bg-center h-80"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div>

            <nav className="bg-white rounded-md shadow-md absolute top-5 left-10 right-10 z-10">
                <div className="container px-5 py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <img src={houseIcon} alt="Home Icon" className="w-10 h-15" />
                        <h1 className="text-2xl font-serif text-darkblue">PrimeProperties</h1>
                    </div>
                    
                    <div className="flex-1 flex justify-end mr-10">
                        <ul className="flex space-x-7 text-lg">
                            <li><a href="#" className="hover:border-b-2 hover:pb-3 hover:border-orange">Home</a></li>
                            <li><a href="#" className="hover:border-b-2 hover:pb-3 hover:border-orange">View All Properties</a></li>
                            <li><a href="#" className="hover:border-b-2 hover:pb-3 hover:border-orange">Become a Seller</a></li>
                            <li><a href="#" className="hover:border-b-2 hover:pb-3 hover:border-orange">About</a></li>
                        </ul>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            className="bg-orange font-light text-white py-2 px-4 rounded border border-orange hover:bg-white hover:text-black hover:font-light font-bold"
                            onClick={() => navigate('/user')}
                        >
                            Login
                        </button>
                        <button
                            className="bg-orange font-light text-white border border-orange hover:bg-white hover:text-black hover:font-light font-bold py-2 px-4 rounded"
                            onClick={() => navigate('/user/register')}
                        >
                            Signup
                        </button>
                    </div>
                </div>
            </nav>

            <div className="absolute flex flex-col justify-center items-center text-center text-white top-32 inset-x-px">
                <h1 className="text-4xl font-extrabold mb-4">Find Your Dream House</h1>
                <p className="text-2xl font-medium">From as low as $10 per day with a range of facilities.</p>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-5 rounded-md shadow-md mt-12 mx-auto max-w-4xl relative z-20 flex items-center space-x-4">

                <input
                    className="border border-medgrey rounded-md shadow-md p-3 flex-1"
                    type="text"
                    placeholder="Enter keyword e.g luxury"
                />
                <select className="border border-medgrey rounded-md shadow-md p-3 flex-1">
                    <option>Location</option>
                    <option>Rawalpindi</option>
                    <option>Karachi</option>
                    <option>Islamabad</option>
                    <option>Lahore</option>
                </select>
                <select className="border border-medgrey rounded-md shadow-md p-3 flex-1">
                    <option>Type</option>
                    <option>Sale</option>
                    <option>Rent</option>
                </select>
                <select className="border border-medgrey rounded-md shadow-md p-3 flex-1 ">
                    <option>Price-range</option>
                    <option>less than $1000</option>
                    <option>$1000-50000</option>
                    <option>$50000-1000000</option>
                    <option>more than $1000000</option>
                </select>
                <button className="bg-orange font-light text-white py-2 px-4 rounded border border-orange hover:bg-white hover:text-orange hover:font-light font-bold">
                    Search
                </button>
            </div>


            {/* <p className="text-2xl font-semibold my-20 text-center">Our Featured Properties</p> */}

            <div className="text-center mb-12 my-20">
                    <p className="text-orange text-lg mb-3">Our Properties</p>
                    <h2 className="text-3xl font-bold hover:border-b">Our Featured Properties</h2>
                </div>

            <div className="overflow-x-auto max-w-5xl mx-auto">
                <div className="flex flex-nowrap space-x-4">
                    {properties.map((property) => (
                        <div key={property.id} className="flex-none w-1/3 px-2">
                            <div className="border border-medgrey shadow-lg rounded-md overflow-hidden">
                                <div className="relative group">
                                    <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
                                    <span className="absolute top-2 left-2 bg-orange text-white text-xs px-2 py-1 rounded">
                                        {property.purpose}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{property.name}</h3>
                                    <p className="text-gray-600">{property.price}</p>
                                    <p className="text-gray-600 flex items-center">
                                        <img src={locationIcon} alt="Location" className="w-4 h-5 mr-1" />
                                        {property.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="text-center mb-12 my-20">
                    <p className="text-orange text-lg mb-3">Locations</p>
                    <h2 className="text-3xl font-bold hover:border-b">Find Property By Location</h2>
                </div>

            <div className="mx-auto max-w-5xl">
                <div className="flex mb-4">
                    <div className="relative w-5/12 mr-5 group">
                        <img src={city1} alt="City 1" className="w-full h-80 object-cover rounded-md" />
                        <div className="absolute bottom-0 inset-x-0 bg-red-600 bg-opacity-50 flex items-center justify-center text-white text-xl font-bold h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Rawalpindi
                        </div>
                    </div>
                    <div className="relative w-8/12 group">
                        <img src={city2} alt="City 2" className="w-full h-80 object-cover rounded-md" />
                        <div className="absolute bottom-0 inset-x-0 bg-red-600 bg-opacity-50 flex items-center justify-center text-white text-xl font-bold h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Karachi
                        </div>
                    </div>
                </div>
                <div className="flex space-x-5">
                    {locations.slice(2).map((location) => (
                        <div key={location.id} className="relative flex-1 group">
                            <img src={location.image} alt={location.name} className="w-full h-80 object-cover rounded-md" />
                            <div className="absolute bottom-0 inset-x-0 bg-red-600 bg-opacity-50 flex items-center justify-center text-white text-xl font-bold h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {location.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-darkblue text-white py-10 mt-20">
                <div className="text-center mb-12">
                    <p className="text-orange text-lg mb-3">Our Features</p>
                    <h2 className="text-3xl font-bold hover:border-b">Why Choose Us?</h2>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <div key={feature.id} className="bg-white text-center p-6 rounded-lg shadow-md">
                            <img src={feature.icon} alt={feature.title} className="w-15 h-14 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-darkblue">{feature.title}</h3>
                            <p className="text-gray-600 mt-2">{feature.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            
            <div className="text-center mb-12 mt-32">
    <p className="text-orange text-lg mb-3">Expertise is Here</p>
    <h2 className="text-3xl font-bold">Our Exclusive Agents</h2>
</div>

    <div className="grid grid-cols-2 gap-12 max-w-5xl mx-auto">
        {agents.map((agent) => (
            <div key={agent.id} className="rounded-md p-8 flex items-center space-x-8">
                <img src={agent.image} alt={agent.name} className="w-32 h-32 rounded-full shadow-custom" />
                <div>
                    <h3 className="font-bold text-lg">{agent.name}</h3>
                    <p className="text-medgrey mb-3">{agent.title}</p>
                    <div className="flex items-center border border-orange rounded p-2 space-x-2">
                        <img src={phoneIcon} alt="Phone" className="w-5 h-6" />
                        <p>{agent.phone}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>

            <Footer />

        </div>
    );
};


export default HomePage;



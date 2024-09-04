import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import houseIcon from '../assets/house-real-estate-icon.png';
import Cookies from "js-cookie";


const SellerNavbar = () => {
    const navigate = useNavigate();
    const { loggedIn } = useSelector((state) => state.User);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        Cookies.remove('userToken');
        navigate('/user');
    };

    return (
        <nav className="bg-white rounded-md shadow-md absolute top-6 left-10 right-10 z-10">
            <div className="container px-5 py-3 flex flex-wrap items-center">
                <div className="flex items-center space-x-2 flex-shrink-0">
                    <img src={houseIcon} alt="Home Icon" className="w-10 h-15" />
                    <h1 className="text-2xl font-serif text-darkblue">PrimeProperties</h1>
                </div>

                <button 
                    className="text-darkblue md:hidden ml-auto" 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>

                <div className={`md:flex md:items-center md:space-x-7 lg:ml-auto flex-col md:flex-row w-full md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
                <ul className="flex flex-col md:flex-row md:space-x-4 text-lg md:ml-2">
                <li>
                <Link to="/user/home" className="hover:border-b-2 hover:pb-3 hover:border-orange">
                    Home
                </Link>
                </li>
                <li>
                <Link to="/user/properties" className="hover:border-b-2 hover:pb-3 hover:border-orange">
                    View All Properties
                </Link>
                </li>
                <li>
                <Link to="/user" className="hover:border-b-2 hover:pb-3 hover:border-orange">
                    Become a Seller
                </Link>
                </li>
                <li>
                <a href="#about-us" className="hover:border-b-2 hover:pb-3 hover:border-orange">
                    About
                </a>
        </li>
            </ul>



                    <div className="flex flex-col md:flex-row space-y-2 md:space-x-4 md:space-y-0 mt-4 md:mt-0">
                        {loggedIn ? (
                            <button
                                className="bg-orange font-light text-white py-2 px-4 rounded border border-orange hover:bg-white hover:text-black hover:font-light font-bold"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default SellerNavbar;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/bg4.jpg';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="flex flex-col justify-center items-center h-full text-center text-white bg-gradient-to-t from-black via-transparent to-transparent p-8">
                <div className="mb-10 ">
                    <h1 className="text-4xl font-extrabold mb-7">Welcome to PrimeProperties</h1>
                    <p className="text-2xl font-medium text-white">Choose your role and get started</p>
                </div>
                <div>
                    <button
                        className="bg-[#FF5A3C] hover:bg-[#0a2231] text-base text-white px-4 py-2 m-2 rounded shadow-lg transition duration-300"
                        onClick={() => navigate('/user/home')}>
                        User
                    </button>
                    <button
                        className="bg-[#0B2C3D] hover:bg-[#e84d3c] text-base text-white px-4 py-2 m-2 rounded shadow-lg transition duration-300"
                        onClick={() => navigate('/admin')}
                    >
                        Admin
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Landing;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/bg4.jpg'; 
import { useDispatch, useSelector } from 'react-redux';
import { clearError, login } from '../redux/features/User/userSlice';
import Cookies from 'js-cookie';


const LoginUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error } = useSelector((state) => state.User);

    const handleLogin = async(event) => {
        event.preventDefault();
        console.log('Login clicked with:', { email, password });
        Cookies.remove('userToken');

        try {
            await dispatch(login({ email, password })).unwrap();
            if (Cookies.get('userToken')) {
                navigate('/user/home');
            }
        } catch (err) {
            console.log("Error occurred:", err);
        }
    };

    useEffect( ()=> {
        return ()=> dispatch(clearError())
    },[])

    return (
        <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="flex flex-col justify-center items-center h-full p-8">
                <div className="bg-slate-50 bg-opacity-15 backdrop-blur-sm p-12 rounded-lg shadow-lg w-full max-w-sm">
                    <h1 className="text-3xl font-bold text-[#113242] mb-6 text-center">Login</h1>
                    <form onSubmit={handleLogin}>
                        {error && <p className="text-red-600 text-lg text-center mb-4">{error}</p>}  
                        <div className="mb-4">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-3 px-4 py-2 text-black rounded-lg opacity-45"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full my-3 px-4 py-2 text-black rounded-lg opacity-45"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#FF5A3C] hover:bg-[#113242] text-white mt-2 px-3 py-2 rounded-lg shadow-lg transition duration-300 w-24"
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-4 text-center text-black">
                        Don't have an account?{' '}
                        <span
                            onClick={() => navigate('/user/register')}
                            className="text-darkblue text-md hover:text-orange cursor-pointer hover:underline"
                        >
                            Register
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginUser;

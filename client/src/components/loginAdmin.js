import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import backgroundImage from '../assets/bg4.jpg'; 
import { useDispatch , useSelector } from 'react-redux';
import { login } from '../redux/features/Admin/AdminSlice';
import Cookies from 'js-cookie'


const LoginAdmin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {error} = useSelector((state)=> state.Admin)

    
    const handleLogin = async(event) => {
        event.preventDefault();
        console.log('Login clicked with:', { email, password });
        // clear any previous cookie before storing the new one
        Cookies.remove('adminToken')

        try {
            await dispatch(login({ email, password })).unwrap();

            //After successful login, navigate to the dashboard
            if (Cookies.get('adminToken')) {
                navigate('/admin/dashboard'); }

        } catch (error) {
            console.log("Error occurred:", error);
        }
    };
    
    return (
        <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="flex flex-col justify-center items-center h-full  p-8">
                <div className="bg-slate-50 bg-opacity-15 backdrop-blur-sm  p-12 rounded-lg shadow-lg w-full max-w-sm">
                    <h1 className="text-3xl font-bold text-[#113242] mb-6 text-center">Admin Login</h1>
                    <form onSubmit={handleLogin}>
                    {/* display error msg if any occurs */}
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}  
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
                </div>
            </div>
        </div>
    );
};

export default LoginAdmin;

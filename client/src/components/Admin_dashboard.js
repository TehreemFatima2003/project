import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { approveProperty, rejectProperty, showPending } from '../redux/features/Admin/AdminSlice';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { properties } = useSelector((state) => state.Admin);
    const [error , setError] = useState(null);
    const propertyCode = 'PM-';

    // fetch properties on mounting
    useEffect(() => {
        dispatch(showPending());
    }, []);

    const handleLogout = () => {
        Cookies.remove('adminToken');
        navigate('/admin');
    };

    const RejectHandler = async (id) => {
        try {
            await dispatch(rejectProperty(id)).unwrap();
            dispatch(showPending());
        } catch (error) {
            setError(error);
        }
    };

    const ApproveHandler = async (id) => {
        try {
            await dispatch(approveProperty(id)).unwrap();
            dispatch(showPending());
        } catch (error) {
            setError(error)
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <div className="bg-darkblue w-full p-4 flex justify-between items-center">
                <h1 className="text-2xl text-white">Admin Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-opacity-30 hover:border-darkblue">
                    Logout
                </button>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center">
                <div className="w-4/5 bg-white rounded-lg shadow-2xl mb-20">
                    <h2 className="text-xl font-semibold text-darkblue p-4 border-b my-1">Pending Properties</h2>
                    {/* display error msg if any occurs */}
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}  
                    <table className="min-w-full bg-white">
                        <thead className="bg-darkblue text-white">
                            <tr>
                                <th className="py-3 px-4">Property Id</th>
                                <th className="py-3 px-4">Details</th>
                                <th className="py-3 px-4" >Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.length > 0 ? (
                                properties.map((property) => (
                                    <tr key={property._id} className="bg-gray-100 border-b">
                                        <td className="py-3 px-4">{propertyCode + Math.floor( Math. random() * (1000 - 0) + 0)}</td>
                                        <td className="py-3 px-4 text-left">
                                            <p className='py-1'><span className="font-bold">Name:</span> {property.name}</p>
                                            <p className='py-1'><span className="font-bold">Price:</span> {property.price}</p>
                                            <p className='py-1'><span className="font-bold">Property Size:</span> {property.area}</p>
                                            <p className='py-1'><span className="font-bold">OwnerId:</span> {property.ownerId}</p>
                                            <p className='py-1'><span className="font-bold">Address:</span> {property.address}</p>
                                            <p className='py-1'><span className="font-bold">City:</span> {property.city}</p>
                                            <p className='py-1'><span className="font-bold">Purpose:</span> {property.purpose}</p>
                                        </td>
                                        <td className="py-3 px-4">
                                            <button
                                                className="bg-darkblue hover:bg-orange text-white px-3 py-2 rounded-lg transition duration-300"
                                                onClick={() => ApproveHandler(property._id)}>
                                                Approve
                                            </button>
                                            <button
                                                className="bg-orange hover:bg-darkblue text-white ml-4 px-4 py-2 rounded-lg transition duration-300"
                                                onClick={() => RejectHandler(property._id)}>
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center py-4">There are no pending properties yet</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-[#113242] w-full p-4 flex justify-center items-center">
                <p className="text-white">@Copyright Prime Properties</p>
            </div>
        </div>
    );
};

export default AdminDashboard;

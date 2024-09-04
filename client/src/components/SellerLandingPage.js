import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import houseIcon from '../assets/house-real-estate-icon.png';
import Footer from './Footer';

const SellerLandingPage = () => {
  const navigate = useNavigate();

  const handleCreateProperty = () => {
    navigate('/seller/createproperty');
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    navigate(`/seller/viewproperty?status=${status}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-white rounded-md shadow-md fixed top-0 left-0 right-0 z-10 p-3 md:top-6 md:left-10 md:right-10">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-2 flex-shrink-0">
            <img src={houseIcon} alt="Home Icon" className="w-8 h-8 md:w-10 md:h-10" />
            <h1 className="text-lg md:text-2xl font-serif text-darkblue">Seller Dashboard</h1>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
            <select
              onChange={handleStatusChange}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md text-gray-700"
              defaultValue=""
            >
              <option value="" disabled>
                Select Property Status
              </option>
              <option value="all">All Properties</option>
              <option value="approved">Active</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="closed">Closed</option>
            </select>

            <Link
              to="/seller/draftproperty"
              className="hover:border-b-2 hover:pb-1 hover:border-orange text-center w-full md:w-auto"
            >
              Property Drafts
            </Link>

            <button
              className="w-full md:w-auto bg-orange text-white py-2 px-4 rounded border border-orange hover:bg-white hover:text-black hover:font-light font-bold text-center"
              onClick={handleCreateProperty}
            >
              Create Property +
            </button>
            <button
              className="w-full md:w-auto bg-orange text-white py-2 px-4 rounded border border-orange hover:bg-white hover:text-black hover:font-light font-bold text-center"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-28 md:pt-24 mx-4 md:mx-6">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default SellerLandingPage;

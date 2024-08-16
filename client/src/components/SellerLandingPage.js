import React from 'react'
import { Link, Outlet, useNavigate } from "react-router-dom";

const SellerLandingPage = () => {

    const navigate=useNavigate();
    const handleCreateProperty=() =>
    {
        navigate('/seller/createproperty')

    }
  return (
    <div>
        <div className="w-full h-20 bg-lightgrey text-white mt-6 flex items-center justify-between px-4 ">
        
        
        <button 
        onClick={handleCreateProperty}
        className="bg-orange font-light text-white border border-orange hover:bg-white hover:text-black hover:font-light font-bold py-2 px-4 rounded">
        Create Property +
        </button>

        <button className="bg-orange font-light text-white border border-orange hover:bg-white hover:text-black hover:font-light font-bold py-2 px-4 rounded">
        Log Out
        </button>
 
  </div>

    <div className='flex mt-2'>
        <div className='w-1/5 flex flex-col h-screen  bg-lightgrey mx-2 ' >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Property Status-wise</h2>
                <ol className="list-disc pl-5 space-y-3">
                    <li className="text-lg font-bold">
                        <Link to="/seller/viewproperty?status=all" 
                        className="text-blue-600 text-md hover:text-xl hover:font-extrabold">View Property</Link>
                    </li>
                    <li className="text-lg font-bold">
                        <Link to="/seller/viewproperty?status=approved" 
                        className="text-blue-600 text-md hover:text-xl hover:font-extrabold">Approved</Link>
                    </li>
                    <li className="text-lg font-bold">
                        <Link to="/seller/viewproperty?status=pending" 
                        className="text-blue-600 text-md hover:text-xl hover:font-extrabold">Pending</Link>
                    </li>
                    <li className="text-lg font-bold">
                        <Link to="/seller/viewproperty?status=rejected" 
                        className="text-blue-600 text-md hover:text-xl hover:font-extrabold">Rejected</Link>
                    </li>
                    <li className="text-lg font-bold">
                        <Link to="/seller/viewproperty?status=done" className="text-blue-600 text-md hover:text-xl hover:font-extrabold">Marked as Done</Link>
                    </li>
                </ol>

                <Link to="/seller/draftproperty" className='text-2xl font-semibold text-gray-800 mb-4 mt-8'>Property Drafts</Link>

        </div>

        <div className='w-4/5 bg-darkblue'>
         <Outlet />

        </div>
    </div>


      
    </div>
  )
}

export default SellerLandingPage

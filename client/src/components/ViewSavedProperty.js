import React, { useEffect, useState } from 'react'
import { getSavedPropertiesFromWishlist } from '../api';

const ViewSavedProperty = () => {

    const userId='66acbaf6890a33329101c110';
    const [saved,setSaved]= useState([]);

    const fetchSavedProperties =async () =>
    {
        try{
            const response= await getSavedPropertiesFromWishlist(userId);
            console.log("saved properties: ", response.data)
            
        }
        catch(error)
        {
            console.log("error: ", error)
        }
    }

    useEffect(() =>
    {
         fetchSavedProperties();
    }, []);

  return (
    <div>
        your saved properties will be displayer here
      
    </div>
  )
}

export default ViewSavedProperty

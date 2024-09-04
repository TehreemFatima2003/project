import path from 'path';
import Property from '../models/property_model.js';


export const createProperty= async (req, res)=>  //with fileupload express
{
    try {
            const file = req.files.file;
            console.log("file path is ", file);
            const uploadPath = "./../public/images/" + Date.now() + "-" + Math.round(Math.random() * 1e9);
            file.mv("./public/images/" + file.name, (err) => {
                console.log(err);
            });
  
        const base64Image = file.data.toString('base64');
        const base64ImageString = `data:${file.mimetype};base64,${base64Image}`;

        const newProperty = new Property({
          name: req.body.name,
          ownerId:req.body.ownerId,
          address:req.body.address,
          city: req.body.city,
          area: req.body.area,
          purpose: req.body.purpose,
          price: req.body.price,
          description: req.body.description,
          bedroom: req.body.bedrooms,
          bathroom: req.body.bathrooms,
          garage: req.body.garage,
          numberOfPortions: req.body.portions,
          type: req.body.type,
          images:base64ImageString
        });
        console.log("property created: ", newProperty)
    
        await newProperty.save();
        res.status(201).json(newProperty);
      }
       catch (error) {
        console.error('Error:', error);
        res.status(400).json({ error: 'Property creation failed' });
      }
}

export const createPropertyAsDraft= async (req, res)=>  //with fileupload express
{
    try {

            const file = req.files.file;
            console.log("file path is ", file);
            const uploadPath = "./../public/images/" + Date.now() + "-" + Math.round(Math.random() * 1e9);
            file.mv("./public/images/" + file.name, (err) => {
                console.log(err);
            });
  

        const base64Image = file.data.toString('base64');
        const base64ImageString = `data:${file.mimetype};base64,${base64Image}`;

        const newProperty = new Property({
          name: req.body.name,
          ownerId:req.body.ownerId,
          address:req.body.address,
          city: req.body.city,
          area: req.body.area,
          purpose: req.body.purpose,
          price: req.body.price,
          description: req.body.description,
          bedroom: req.body.bedrooms,
          bathroom: req.body.bathrooms,
          garage: req.body.garage,
          status:"draft",
          numberOfPortions: req.body.portions,
          type: req.body.type,
          images:base64ImageString
        });
        console.log("property created: ", newProperty)
    
        await newProperty.save();
        return res.status(200).json(newProperty)
      }
       catch (error) {
        console.error('Error:', error);
        res.status(400).json({ error: 'Property creation failed' });
      }
}

export const getPropertyByStatus= async (req, res)=>
{
    try
    {
        const {ownerId, status}= req.query;
        console.log("status called: ", status)

        if(status==="all")
        {
            const allData= await Property.find({ ownerId: ownerId});
           // console.log("property iunder: all" , allData)
            return res.status(200).json(allData)
        }
        else
        {
            const allData= await Property.find({ ownerId: ownerId, status: status});
            // console.log(`Property unser ${status}`, allData)
            return res.status(200).json(allData)
        }

    }
    catch(error)
    {
        res.status(400).json("error: ", error)
    }
}

export const markPropertyAsDone= async (req, res ) =>
{
    try{
        console.log("called")
        const { property_id }= req.params;
        const property=await Property.findByIdAndUpdate({ _id: property_id}, {status: "closed"}, {new: true});
        console.log("marked property: ", property)
        if (property)
            
            {
                console.log("closed")
                return res.status(200).json("deal closed")
                
            }

    }
    catch(error)
    {
        console.log("error", error)
        res.status(500).json({ error: error.message });
    }
}

export const getDraftProperty= async (req, res )=>
{
    try
    {
        console.log("called draft")
        const { ownerId }= req.params;
        console.log("ownerId ; ", ownerId )
        const drafts= await Property.find({ownerId: ownerId, status: "draft"});
        // console.log("draft: ", drafts)
        return res.status(200).json(drafts)
    }

    catch(error)
    {
        res.status(500).json({ error: error.message });
    }
}

export const submitDraftProperty = async (req, res)=>
{
    try{
        const { property_id}= req.params;
        const property=await Property.findOneAndUpdate({ _id: property_id}, {status: "pending"}, {new: true});
        console.log(property);
        if(property)
            return res.status(200).json(property)

    }
    catch(error)
    {
        res.status(500).json({ error: error.message });
    }
}

export const deleteProperty=async (req, res)=>
{
    try
    {
        const {property_id}= req.params;
        const deletedProperty=await Property.findByIdAndDelete({_id: property_id});
        if(deletedProperty)
        {
            console.log("deleted succesfylly")
            return res.status(200).json("deleted")
        }

    }
    catch(error)
    {
        res.status(500).json({ error: error.message });
    }
}














export const getPropertyById = async (req, res) => {
    try {
        
        const {property_id} = req.params;
        console.log("property id: ", property_id)
        console.log("getPropertyById called " );
        const property = await Property.findById(property_id);
        if (!property) {
            console.log (`Property not found under id: ${ property_id}`);
            return res.status(250).json("not found");
            
        }
          res.status(200).json(property);
        
        
    } catch (error) {
        console.log("error occured ", error)
        res.status(500).json({ error: error.message });
    }
};

export const getPropertyByCity = async (req, res) => {
    try {
        const { city } = req.params;
        const properties = await Property.find({ city: city });
        if (properties.length === 0) {
            return res.status(404).json({ error: 'No properties found in this city' });
        }
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getPropertyByPrice = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;
        
        // Convert minPrice and maxPrice to numbers
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
    
        // Find properties within the specified price range
        const properties = await Property.find({
            price: { $gte: min, $lte: max }
        });

        if (properties.length === 0) {
            return res.status(404).json({ error: 'No properties found in this price range' });
        }
        res.status(200).json(properties);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
};


export const getPropertyByPurpose = async (req, res) => {
    try {
        const { purpose } = req.params;
        const properties = await Property.find({ purpose: purpose });
        if (properties.length === 0) {
            return res.status(250).json({ error: 'No properties found for this purpose' });
        }
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPropertyByType = async (req, res) => {
    try {
        const { type } = req.params;
        const properties = await Property.find({ type: type });
        if (properties.length === 0) {
            return res.status(404).json({ error: 'No properties found of this type' });
        }
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const displayProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeProperty = async (req, res) => {
    try {
        const { property_id } = req.params;
        const deletedProperty = await Property.findByIdAndDelete(property_id);
        if (!deletedProperty) {
            return res.status(404).json({ error: 'Property not found' });
        }
        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateProperty = async (req, res) => {
    try {
        const { property, submit } = req.body;
        console.log("Button value: ", submit);
    
        // Initialize updateData with the property object
        let updateData = { ...property };
    
        // Check if Base64 encoded images are available
        if (req.body.imagesBase64) {
            console.log("Images are converted to base64 strings");
            updateData.images = req.body.imagesBase64; // Use the Base64 encoded images
        }
    
        let updatedProperty;
    
        if (submit) {
            // Update the status to 'pending' if submit is true
            updateData.status = 'pending';
        }
    
        // Update the property in the database
        updatedProperty = await Property.findByIdAndUpdate(
            { _id: property._id },
            updateData,
            { new: true } // Return the updated document
        );
    
        if (updatedProperty) {
            console.log("status property is:", updatedProperty.status);
        } else {
            console.log("Property not found or update failed.");
            return res.status(404).json({ error: 'Property not found' });
        }
    
        // Send the updated property as a response
        res.status(200).json(updatedProperty);
    } catch (error) {
        console.log("Error in the catch block...", error);
        res.status(500).json({ error: error.message });
    }
    
        
};





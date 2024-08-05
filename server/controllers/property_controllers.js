import { encodeImagesToBase64, uploadMultiple } from '../middleware/imageMiddleware.js';
import Property from '../models/property_model.js';


export const createProperty = async (req, res) => {
    try {
        // Parse the price, bedroom, bathroom, numberOfPortions as numbers
        const price = parseFloat(req.body.price);
        const bedroom = parseInt(req.body.bedroom, 10);
        const bathroom = parseInt(req.body.bathroom, 10);
        const numberOfPortions = parseInt(req.body.numberOfPortions, 10);
        const garage = req.body.garage === 'true'; // Convert string 'true'/'false' to boolean
        

        // Create a new Property instance
        const newProperty = new Property({
            ownerId: req.userId, // Assumed to be in valid ObjectId format
            name: req.body.name,
            address: req.body.address,
            city: req.body.city,
            purpose: req.body.purpose,
            price: price,
            description: req.body.description,
            bedroom: bedroom,
            bathroom: bathroom,
            garage: garage,
            numberOfPortions: numberOfPortions,
            type: req.body.type,
           timeOfCreation: { type: Date, default: Date.now},
             // Ensure valid date format
            images: req.imagesBase64 || [], // Handle multiple images
            status: 'pending'
        });

        // Save the property to the database
        const savedProperty = await newProperty.save();
        res.status(201).json(savedProperty);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getPropertyById = async (req, res) => {
    try {
        const {property_id} = req.params;
        const property = await Property.findById(property_id);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        res.status(200).json(property);
    } catch (error) {
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
            return res.status(404).json({ error: 'No properties found for this purpose' });
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

export const getPropertiesByOwnerId = async (req, res) => {
    try {
        const { ownerId } = req.params;
        const properties = await Property.find({ ownerId: ownerId });
        if (properties.length === 0) {
            return res.status(404).json({ error: 'No properties found for this owner' });
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
        const { property_id } = req.params;
        console.log("in the update function...");
        console.log("req body is:", req.body);

        // Prepare update data
        const updateData = { ...req.body };

        // Check if Base64 encoded images are available
        if (req.imagesBase64) {
            console.log("Images are converted to base64 strings");
            updateData.images = req.imagesBase64; // Use the Base64 encoded images
        }

        // Update the property
        const updatedProperty = await Property.findByIdAndUpdate(property_id, updateData, { new: true });
        console.log("Updated property is:", updatedProperty);

        if (!updatedProperty) {
            return res.status(404).json({ error: 'Property not found' });
        }

        // Send the updated property as a response
        res.status(200).json(updatedProperty);
    } catch (error) {
        console.log("Error in the catch block...");
        res.status(500).json({ error: error.message });
    }
};


// export const updateProperty = async (req, res) => {
//     try {
//         const { property_id } = req.params;
//         console.log("in the update function...")
//         console.log("files are :", req.files)
//         console.log("req body is:" , req.body)
//         // Check if files are uploaded in the request
//         if (req.files) {
//             console.log("go to the middleware")
//             // Manually call the middleware functions
//             await new Promise((resolve, reject) => {
//                 // Mimic a middleware chain
//                 uploadMultiple(req, res, (err) => {
//                     if (err) return reject(err);
//                     encodeImagesToBase64(req, res, (err) => {
//                         if (err) return reject(err);
//                         resolve();
//                     });
//                 });
//             });
//         }

//         // Prepare update data
//         const updateData = { ...req.body };
//         if (req.imagesBase64) {
//             console.log("images is converted to base64 string")
//             updateData.images = req.imagesBase64; // Use the Base64 encoded images
//         }

//         // Update the property
//         const updatedProperty = await Property.findByIdAndUpdate(property_id, updateData, { new: true });
//         console.log("updated property is:" , updatedProperty)
//         if (!updatedProperty) {
//             return res.status(404).json({ error: 'Property not found' });
//         }

//         // Send the updated property as a response
//         res.status(200).json(updatedProperty);
//     } catch (error) {
//         console.log("in the catch error..")
//         res.status(500).json({ error: error.message });
//     }
// };



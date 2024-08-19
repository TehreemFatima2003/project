import path from 'path';
import Property from '../models/property_model.js';


export const createProperty= async (req, res)=>  //with fileupload express
{
    try {
        // const {name } = req.body
        // console.log("ehhe")
        // console.log(req.files,"file")
        // console.log("body" , req.body)
        // console.log(req.body,"name")
    //    const data = Object.assign({}, req.body)
    //    const files = Object.assign({}, req.file)
    console.log(req.file, req.body)
            const file = req.body.file;
            const uploadPath = path.join('/', "public", "uploads", Date.now() + "-" + Math.round(Math.random() * 1e9));
            file.mv(uploadPath, (err) => {
                console.log(err);
            });
  
        // Process the form data and file
        // ...

        // console.log("object received: ", req.body)
        
        // const price = parseFloat(req.body.price);
        
        // const bedroom = parseInt(req.body.bedroom, 10);
       
        // const bathroom = parseInt(req.body.bathroom, 10);
        

        // const numberOfPortions = parseInt(req.body.numberOfPortions, 10);
        

        // // Handling file uploads
        // const images = [];
        // if (req.files && req.files.images) {
        //   const imageFiles = Array.isArray(req.files.images)
        //     ? req.files.images
        //     : [req.files.images];
    
        //   for (const image of imageFiles) {
        //     const uploadPath = `uploads/${image.name}`;
        //     await image.mv(uploadPath);
        //     images.push(uploadPath);
        //   }
        // }
        // console.log("images: ", images)
        // const newProperty = new Property({
        //   name: req.body.name,
        //   ownerId:req.body.ownerId,
        //   address:req.body.address,
        //   city: req.body.city,
        //   area: req.body.area,
        //   purpose: req.body.purpose,
        //   price: price,
        //   description: req.body.description,
        //   bedroom: bedroom,
        //   bathroom: bathroom,
        //   garage: req.body.garage,
        //   numberOfPortions: numberOfPortions,
        //   type: req.body.type,
        //   images, // store file paths in the database
        // });
        // console.log("property created: ", newProperty)
    
        // await newProperty.save();
        // res.status(201).json(newProperty);
      }
       catch (error) {
        console.error('Error:', error);
        res.status(400).json({ error: 'Property creation failed' });
      }
}





// export const createProperty = async (req, res) => {
//     try {   

//         console.log(req.body)
        
//         // Parse the price, bedroom, bathroom, numberOfPortions as number
//         console.log("create property method invoked")
//         const price = parseFloat(req.body.price);
//         const bedroom = parseInt(req.body.bedroom, 10);
//         const bathroom = parseInt(req.body.bathroom, 10);
//         const numberOfPortions = parseInt(req.body.numberOfPortions, 10);

//         const garage = req.body.garage ; // Convert string 'true'/'false' to boolean
//        console.log("images: ", req.imagesBase64)
       
//         console.log("owner id: ", req.body.ownerId)
//         // Create a new Property instance
//         const newProperty = new Property({
//             ownerId: req.body.ownerId, // Assumed to be in valid ObjectId format
//             name: req.body.name,
//             address: req.body.address,
//             city: req.body.city,
//             area: req.body.area,
//             purpose: req.body.purpose,
//             price: price,
//             description: req.body.description,
//             bedroom: bedroom,
//             bathroom: bathroom,
//             garage: garage,
//             numberOfPortions: numberOfPortions,
//             type: req.body.type,
//             images: req.imagesBase64 || [], // Handle multiple images
//             status: 'pending',
//             markAsDone: false
//         });

//         // Save the property to the database
//         //console.log(newProperty)
//         const savedProperty = await newProperty.save();
//         console.log("property saved")
//         res.status(201).json(savedProperty);
//     } catch (error) {
//         console.log("error ocured")
//         res.status(400).json({ error: error.message });
//     }
// };


export const getPropertyById = async (req, res) => {
    try {
        
        const {property_id} = req.params;
        console.log("getPropertyById called " );
        const property = await Property.findById(property_id);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        res.status(200).json(property);
        console.log(property);
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
        console.log("method was called")
        const { ownerId , status} = req.query;

        if(status==="all")
        {
            const properties=await Property.find({ownerId: ownerId});
            return  res.status(200).json(properties)
        }

        else if(status==="done")
            {
                const properties=await Property.find({ownerId: ownerId, markAsDone:true});
                return  res.status(200).json(properties)
            }

        else
        {
            const properties = await Property.find({ ownerId: ownerId , status:status});
            res.status(200).json(properties);
        }
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

export const markPropertyAsDone= async (req,res) =>
{
    try{
        const {property_id} = req.params;
        const property=await Property.findByIdAndUpdate({ _id: property_id}, {markAsDone: true}, {new: true});
        if( ! property)
            return res.status(404)
        return res.status(200).json(property)
    }

    catch(error)
    {
        res.status(400).json(error);
    }
     
}



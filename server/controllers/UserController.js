import UserModel from '../models/UserModel.js';
import PropertyModel from '../models/property_model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


export const getUsers=async (req,res)=>
{
    try{
        const result=await UserModel.find();
        if (!result)
            return res.send("no user record find");
        res.send(result);
    }
    catch(error)
    {
        res.send(error.message);

    }
}

export const getOwnerName= async(req, res)=>
{
    try{
        const {userId}=req.params;
        console.log("called ")
        console.log("user id: ", userId)
        const user=await UserModel.findOne({_id:userId});
        console.log("name: ",user.name)
        if( user)
            return res.status(200).json(user.name)
    }
    catch(error)
    {
        res.send(error.message);
    }
}

export const signUp=async (req,res)=>
{
    const {name, email , password}=req.body;
    console.log("password 1",password)
    const normalizedEmail=email.toLowerCase();
    //check for existing account 
    const oldUser=await UserModel.findOne({email:normalizedEmail});
    console.log("old user email: ",oldUser);
    
    if(oldUser)
        return res.send("Account already exists");

    //password encryption
    const salt = await bcrypt.genSalt(10);
 
    const hashedPassword = await bcrypt.hash(password, salt);

    //store in db
    const newUser= await UserModel.create({name:name,email:normalizedEmail,password:hashedPassword});
 
    //create token
    const token = jwt.sign(
        { email: newUser.email, id: newUser._id },
        process.env.SECRET
      );


    return res.status(200).json({ token, id: newUser._id });
}

export const login=async (req, res)=>
{  
    try
    {
        const {email, password}=req.body;
        const normalizedEmail=email.toLowerCase();

        const findUser=await UserModel.findOne({ email :normalizedEmail});

        if(!findUser)
            return res.status(404).json("user not exists");

        const isPasswordCorrect = await bcrypt.compare(password, findUser.password);

        if(!isPasswordCorrect)
            return res.status(404).json("invalid password");

        const token=jwt.sign(
            {email: findUser.email, id:findUser._id},process.env.SECRET
        );
        console.log("token: ",token)
        res.status(200).json(token," user id ", findUser._id, " name ",findUser.name);

    }

    catch(error)
    {
        res.status(404).json(error.message);
    }
    
}


export const getUserById=async (req,res)=>
{
    try
    {
        const { id }=req.params;
        const findUser=await UserModel.findOne({_id: id});
        console.log("user found: ",findUser)

        if(!findUser)
            return res.status(404).json("No user Found")

        res.status(200).json(findUser);
    }

    catch(error)
    {
        res.status(404).json(error.message);
    }
}

export const addPropertyInSavedProperty = async (req, res) => {
    try {
      const { userId , propertyId } = req.body;
      console.log("add in save property called")
      console.log("property id ",propertyId);
      console.log("user id",userId );
  
      const findUser = await UserModel.findById(userId);
  
      if (!findUser) {
        return res.status(404).json("User not found");
      }
  
      // Check if the property is already saved
      if (findUser.savedProperties.includes(propertyId)) {
        return res.status(200).json("Property already saved");
      }
  
      
      findUser.savedProperties.push(propertyId);
      await findUser.save();
      console.log("saved properties: ", findUser.savedProperties)
  
      res.status(200).json({ message: "Property added to saved properties", savedProperties: findUser.savedProperties });
    } 
    catch(error)
    {
        res.status(404).json(error.message);
    }
  };


  export const viewSavedProperty=async (req, res)=>
  {
    try
    {
        const {userId }=req.params
        const findUser=await UserModel.findOne({_id: userId});
        if (!findUser)
            return res.status(404).json("user not found")

        res.status(200).json(findUser.savedProperties);
        console.log(findUser.savedProperties)
    }
    catch(error)
    {
        res.status(404).json(error.message);
    }
  }


  export const removeSavedProperty=async (req,res)=>
  {
    try{
        console.log("remove from save called");

        const {userId, property_id} =req.query;

        const findUser=await UserModel.findOne({_id : userId});

        if(!findUser)
            return res.status(404).json("user not found");

        findUser.savedProperties=findUser.savedProperties.filter((properties)=> properties!=property_id)
        await findUser.save();
        res.json("property removed")
        console.log("propert removed")
    }
    catch(error)
    {
        res.status(404).json(error.message);
    }
  }

  export const viewPostedProperty=async (req,res)=>
  {
    try{

        const postedProperty=await PropertyModel.find({ownerId: req.userId});
        

        console.log("poster property by you : ",postedProperty)

        if(!postedProperty)
            return res.status(404).json("user not found")

        if (postedProperty.length==0)
            return res.status(200).json("no postings so far")

        res.status(200).json(postedProperty);
    }

    catch(error)
    {
        res.status(404).json(error.message);
    }
  }

  export const removePostedProperty=async (req,res)=>
    {
      try{
        const { propertyId }= req.params;

       const findProperty=await PropertyModel.findOne({ _id: propertyId});

       if (!findProperty)
           return res.status(404).json("no property found")

        await PropertyModel.deleteOne({ _id : propertyId});

        res.status(200).json("post deleted");
      }
      
      catch(error)
      {
          res.status(404).json(error.message);
      }
    }

export const addProperty=async (req,res)=>
{
    try
    {
        const {propertyId}= req.params;
        console.log("property id ",propertyId)

        const findUser=await UserModel.findOne({ _id: req.userId});
        if(!findUser)
            return res.status(404).json("user not found")

        findUser.postedProperties.push(propertyId);
        console.log(" yout prop ", findUser.postedProperties)
        await findUser.save();

        res.status(200).json(`property added. wait for the approval from admin id: ${propertyId}` );
    }

    catch(error)
      {
          res.status(404).json(error.message);
      }
}


    
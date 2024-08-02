import AdminModel from "../models/AdminModel.js";
import PropertyModel from '../models/property_model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'




export const login=async (req, res)=>
{  
    try
    {
        const {email, password}=req.body;
        const normalizedEmail=email.toLowerCase();
        console.log("normalized email :", normalizedEmail)

        const getAdmin=await AdminModel.find();
        console.log("admin ", getAdmin)
        console.log("admin email ",getAdmin[0].email);

        
        if(normalizedEmail!==getAdmin[0].email)
            return res.status(404).json("invalid email");

        

        const isPasswordCorrect = await bcrypt.compare(password, getAdmin[0].password);

        if(!isPasswordCorrect)
            return res.status(404).json("invalid password");

        const token=jwt.sign(
            {email: getAdmin.email, id:getAdmin._id},process.env.SECRET
        );
        console.log("token: ",token)
        res.status(200).json(token,"   admin id ", getAdmin[0]._id);

    }

    catch(error)
    {
        res.status(404).json(error.message);
    }
    
}



export const viewPendingProperty=async (req, res)=>
{
    try{
         const getPending=await PropertyModel.find({status : "pending"})

         if(getPending.length == 0)
            return res.status(404).json("no pending")
          
          res.status(200).json(getPending);

    }

    catch(error)
    {
        res.status(404).json(error.message);
    }
}

export const approvePendingProperty= async (req,res)=>
{
    try{
        const {propertyId}= req.params;
        console.log("hello")
        
        const findProperty=await PropertyModel.findOne({_id : propertyId});

        if(!findProperty)
            return res.send(404).json("no such property exists");

        const approvedProperty = await PropertyModel.findByIdAndUpdate( propertyId, { status: "approved" }, { new: true });
        console.log(" approved ",approvedProperty)
        res.status(200).json("property approved")


    }

    catch(error)
    {
        res.status(404).json(error.message);
    }

}


export const rejectPendingProperty= async (req,res)=>
    {
        try{
            const {propertyId}= req.params;
            console.log("hello")
            
            const findProperty=await PropertyModel.findOne({_id : propertyId});
    
            if(!findProperty)
                return res.send(404).json("no such property exists");
    
            const rejectedProperty = await PropertyModel.findByIdAndUpdate( propertyId, { status: "rejected" }, { new: true });
            console.log(" rejected ",rejectedProperty)
            res.status(200).json("property rejected")
    
    
        }
    
        catch(error)
        {
            res.status(404).json(error.message);
        }
    
    }




export const signUpAdmin=async (req,res)=>
{
    const {email , password}=req.body;
    console.log("password 1",password)
    const normalizedEmail=email.toLowerCase();
    

    //password encryption
    const salt = await bcrypt.genSalt(10);
    
    const hashedPassword = await bcrypt.hash(password, salt);

    //store in db
    const newAdmin = await AdminModel.create({email:normalizedEmail,password:hashedPassword});
    
    console.log("admin created")


    return res.status(200).json("Admin created");
}
import User from "../models/user.js";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken"; 


export function registerUser(req, res){

const data=req.body; 

data.password=bcrypt.hashSync(data.password, 10)

const newUser=new User(data); 

    newUser.save().then(()=>{
        res.json("user Added",)   
          
    }).catch((error)=>{
        res.status(500).json(error, "Error registering user") 
    })
//deshan

}

export function loginUser(req, res){
    const data=req.body; 

    User.findOne(
        {
            email: data.email //filter

        }
    ).then(
        (user)=>{
         if(user==null){
                res.status(404).json("User not found")
         }else{
          
        

            const isPasswordCorrect=bcrypt.compareSync(data.password, user.password);

            if(isPasswordCorrect){

                //genarate the web taken 

                const token=jwt.sign({
                    firstName:user.firstName, 
                    lastName:user.lastName, 
                    email:user.email, 
                    role:user.role

                    
                }, "kv-secret-89!")

                res.json({message:"Login successful", token:token}); 
         }
         else{
            res.status(404).json({error: "Incorrect password"})
         }
        }
    })
}
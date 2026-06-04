import { createUserService,loginService } from "../service/userService.mjs";

const cookieOption={
   httpOnly:true,
   secure:false,
   sameSite:"lax",
   maxAge:24*60*60*1000
}

export async function createUserController(req, res) {
    try {
        const user=await createUserService(req.body);
        res.status(201).send({
            Data:{
                message:"User Created Successfully",
                user
            },
            Error:null
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            Error: {
                Error: "Failed to create User!",
                info: err.message
            },
            Data:null
        })
    }

}

export async function loginController(req,res){
    try {
        const credential=req.body;
        if(!credential){
            throw new Error("Credentials required");
        }
        const response=await loginService(credential);
        const {token,user}=response;
       
        res.cookie("token",token,cookieOption);
        res.status(200).send({
            Data:{
                message:"User login Successfully",
                user
            },
            Error:null
        });

        
    } catch (err) {
        console.log(err);
        res.status(500).send({
            Error: {
                Error: "Failed to login User!",
                info: err.message
            },
            Data:null
        })
    }
}


export function getUser(){
    
}

export function logout(req,res){
    res.clearCookie("token",cookieOption);
    res.send("User logout successfully!");
}

export function getMe(req,res){
    const{user}=req.user;
    console.log("get me:",req.user)
    res.send(req.user);
}


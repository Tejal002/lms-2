
import { hashedPass, compareFun } from "../bcrypt/bcrypt.js";
import { generateToken } from "../bcrypt/jwt.js";
import User from "../models/user.mjs";



export async function createUserService(user) {
    const {email}=user;
    const existingUser=await User.findOne({email})
    if(existingUser){
        throw new Error("Email already exist!");
    }
    const newUser = new User({ ...user, password: await hashedPass(user.password) });
    return newUser.save()
}

function getUserByEmail(email) {
    return User.findOne({email});
}

function updateUser(key,value){
   
}


export async function loginService(credential) {
    const { email, password } = credential;
    console.log({ email, password })
    if(!email||email===""||password==="" || !password){
        throw new Error("Credentials required");
    }

    const user = await getUserByEmail(email);
    if(!user){
         throw new Error("User does not exist!");
    }
    console.log(user);
    const result = await compareFun(password, user.password);
    console.log(result);

    if(!result){
        throw new Error("Credentials does'nt match!");
    }

    if (result) {
           const token= generateToken({user});
           user.token=token;
           await user.save()
           return{
            token,
            user:{
                id:user._id,
                firstName:user.firstName,
                lasttName:user.lastName,
                email:user.email,
                role:user.role

            }
           }        

    }
}
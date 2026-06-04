import chalk from "chalk";
import jwt from "jsonwebtoken";

const secretKey = "your-very-secure-secret";

export function generateToken(payload){
  const token= jwt.sign(payload,secretKey,{expiresIn:'1h'});
  return token;
}

export function validateToken(token){
    try {
      const {user} = jwt.verify(token, secretKey);
      const updatedUser={
         id:user._id,
         firstName:user.firstName,
         lastName:user.lastName,
         age:user.age,
         email:user.email,
         role:user.role
      }
     
      return updatedUser;

   } catch (error) {
      console.log(error);
      return null;
   }
}


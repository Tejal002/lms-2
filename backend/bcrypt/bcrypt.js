import { hash,compare } from "bcrypt";
const SALTED_ROUND = 10;

export function hashedPass(password){
    if(password){
        return hash(password,SALTED_ROUND)
    }  
}

export function compareFun(password,hasedPassword){
    return compare(password,hasedPassword);
}
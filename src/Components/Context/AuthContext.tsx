import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState, type ReactNode } from "react";

interface User{
    id:string;
    firstName:string;
    email:string
}
interface AuthContextType{
    userData: User |null;
    saveUserData:()=>void;
}

export const AuthContext=createContext<AuthContextType|null>(null)
interface AuthContextProvProp{
    children:ReactNode;
}
export default function AuthContextProvider({children}:AuthContextProvProp){
   const [userData,setUserData]=useState< User |null>(null)
   const  saveUserData=()=>{
      const encodedToken=localStorage.getItem('userToken')
      if(encodedToken){
        const decodedToken=jwtDecode<User>(encodedToken)
         setUserData(decodedToken)
      }
   }
   //refresh
   useEffect(()=>{
if(localStorage.getItem('userToken')){
saveUserData()
}
   },[])



   return(
    <AuthContext.Provider value={{userData,saveUserData}}>{children}</AuthContext.Provider>
   )

}
import React, { useEffect, useState } from 'react';
import { Authcontext } from './Authcontext';

import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';


const Authprovider = ({children}) => {
    const provider=new GoogleAuthProvider()
    
    const [user,setuser]=useState(null)
    const [loading,setloading]=useState(true)
    
 
useEffect(()=>{
    const unsuscribe=onAuthStateChanged(auth,(currentuser=>{
        setuser(currentuser)
        setloading(false)
    }))
    return ()=>unsuscribe();
},[])

    // console.log(user)



    const singingoogle=()=>{
        return signInWithPopup(auth,provider)
    }



    const registerwithemail=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }


    const loginemail=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }



    const forgetpassword=(email)=>{
        return sendPasswordResetEmail(auth,email)
    }


    const logout=()=>{
        return signOut(auth)
    }



    
    const authinfo={
        singingoogle,
        registerwithemail,
        user,
        loginemail,
        loading,
        setloading,
        forgetpassword,
        logout,
        


    }
    return (
        <Authcontext value={authinfo}>
            {children}
        </Authcontext>
    )
};

export default Authprovider;
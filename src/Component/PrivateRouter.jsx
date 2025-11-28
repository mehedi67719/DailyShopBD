import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import { Authcontext } from './Authcomponent/Authcontext';
import { Navigate } from 'react-router';

const PrivateRouter = ({children}) => {
    const location=useLocation();
    const {user,loading}=useContext(Authcontext);


    if(loading){
        return <div className="text-center text-xl">Loading...</div>
    }


    if(!user){
        return <Navigate to='/login' state={{from:location}} replace/>
    }

    return children

};

export default PrivateRouter;
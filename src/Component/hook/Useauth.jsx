import React, { useContext } from 'react';
import { Authcontext } from '../Authcomponent/Authcontext';

const Useauth = () => {
    return (
        useContext(Authcontext)
    );
};

export default Useauth;
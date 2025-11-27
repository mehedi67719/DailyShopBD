import React from 'react';
import Footer from '../Page/fixpage/Footer';
import { Outlet } from 'react-router';
import Navbar from '../Page/fixpage/Navbar';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>

        </div>
    );
};

export default Root;
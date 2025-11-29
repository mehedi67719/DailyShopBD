import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './fixpage/Navbar';
import Footer from './fixpage/Footer';


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
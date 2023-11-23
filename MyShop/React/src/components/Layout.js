import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../../../wwwroot/lib/bootstrap/css/custom.css';
import '../../../wwwroot/lib/bootstrap/css/bootstrap.css';
import '../styles/Layout.css';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;

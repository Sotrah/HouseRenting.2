import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/Layout.css';
import '../../../wwwroot/lib/bootstrap/css/custom.css';
import '../../../wwwroot/lib/bootstrap/css/bootstrap.css';
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

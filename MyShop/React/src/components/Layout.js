import React from 'react';
import Navbar from './Navbar'; 
import Footer from './Footer'; 
import '../styles/Layout.css';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className="container">
                <main role="main" className="pb-3">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;

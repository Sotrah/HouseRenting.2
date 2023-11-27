import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Navbar from './Navbar';
import Footer from './Footer';
import '../../../wwwroot/lib/bootstrap/css/custom.css';
import '../../../wwwroot/lib/bootstrap/css/bootstrap.css';
import '../styles/Layout.css';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <Navbar />
                <Container>
                    {this.props.children}
                </Container>
                <Footer />
            </div>
        );
    }
}

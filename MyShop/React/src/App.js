import React, { Component, useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import AppRoutes from './AppRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import { Layout } from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../wwwroot/lib/bootstrap/css/bootstrap.css';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, requireAuth, ...rest } = route;
                        return <Route key={index} {...rest} element={requireAuth ? <AuthorizeRoute {...rest} element={element} /> : element} />;
                    })}
                </Routes>
            </Layout>
        );
    }
}
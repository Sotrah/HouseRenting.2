import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../wwwroot/lib/bootstrap/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ControllerTest from "./ControllerTest"
import Test from "./Test";
import Layout from "./components/Layout";
import ItemListView from './components/ItemListViewModel';
import BookingTable from "./pages/BookingTable";
import CustomerUserTable from "./pages/CustomerUserTable";
import './styles/Layout.css';
import EditListings from './pages/EditListings';
import ItemDisplay from './pages/Details';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/ctest" element={<ControllerTest />} />
                        <Route exact path="/test" element={<Test />} />
                        <Route path="/BookingTable" element={<BookingTable />} />
                        <Route path="/CustomerUserTable" element={<CustomerUserTable />} />
                        <Route exact path="/" element={<ItemListView />} />
                        <Route path="/EditListings" element={<EditListings />} />
                        <Route path="/item/details/:id" element={<ItemDisplay />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </div>
    )
}

export default App;

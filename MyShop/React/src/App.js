import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import '../../wwwroot/lib/bootstrap/css/bootstrap.css';
import ControllerTest from "./ControllerTest";
import Test from "./Test";
import { ItemsProvider } from './components/ItemContext';
import ItemListView from './components/ItemListViewModel';
import Layout from "./components/Layout";
import BookingTable from "./pages/BookingTable";
import Create from './pages/Create';
import CustomerUserTable from "./pages/CustomerUserTable";
import ItemDisplay from './pages/Details';
import EditListings from './pages/EditListings';
import UpdateListing from './pages/Update';
import './styles/Layout.css';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <ItemsProvider>      
                <Layout>
                    <Routes>
                        <Route path="/ctest" element={<ControllerTest />} />
                        <Route exact path="/test" element={<Test />} />
                        <Route path="/BookingTable" element={<BookingTable />} />
                        <Route path="/CustomerUserTable" element={<CustomerUserTable />} />
                        <Route exact path="/" element={<ItemListView />} />
                        <Route path="/EditListings" element={<EditListings />} />
                        <Route path="/item/:id" element={<ItemDisplay />} />
                        <Route path="/Create" element={<Create />} />
                        <Route path="/update/:itemId" element={<UpdateListing />} />
                     </Routes>
                </Layout>
                </ItemsProvider>
            </BrowserRouter>
        </div>
    )
}

export default App;

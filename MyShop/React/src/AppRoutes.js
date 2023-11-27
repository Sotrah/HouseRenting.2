import React from 'react';
import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import ControllerTest from "./ControllerTest"
import Test from "./Test";
import { Layout } from "./components/Layout";
import ItemListView from './components/ItemListViewModel';
import BookingTable from "./pages/BookingTable";
import CustomerUserTable from "./pages/CustomerUserTable";
import './styles/Layout.css';
import EditListings from './pages/EditListings';
import ItemDisplay from './pages/Details';

const AppRoutes = [
    {
        index: true,
        element: <ItemListView />
    },
    {
        path: '/ctest',
        element: <ControllerTest />
    },
    {
        path: '/test',
        requireAuth: true,
        element: <Test />
    },
    {
        path: '/BookingTable',
        element: <BookingTable />
    },
    {
        path: '/CustomerUserTable',
        element: <CustomerUserTable />
    },
    {
        path: '/EditListings',
        requireAuth: true,
        element: <EditListings />
    },
    {
        path: '/item/details/:id',
        element: <ItemDisplay />
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;


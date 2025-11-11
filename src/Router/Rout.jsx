import React from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from '../Layout/Layout';
import ErrorPage from '../ErrorPage/ErrorPage';
import Home from '../Component/Home';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import AddTrans from '../Component/AddTrans';
import MyTrans from '../Component/MyTrans';
import Report from '../Component/Report';
import MyProfile from '../Component/MyProfile';

const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "/login",
                Component: Login,
            },
            {
                path: "/register",
                Component: Register,
            }
            ,
            {
                path: "/add-transaction",
                Component: AddTrans,
            }
            ,
            {
                path: "/my-transactions",
                Component: MyTrans,
            }
            ,
            {
                path: "/reports",
                Component: Report,
            },
            {
                path: "/myprofile",
                Component: MyProfile,
            }


        ]


    }
]);

export default router;
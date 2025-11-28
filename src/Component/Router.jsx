import { createBrowserRouter } from "react-router";
import Home from "../Page/Homepage/Home";
import About from "../Page/About";
import Contact from "../Page/Contact";
import Register from "../Page/Authintaction/Register";
import Login from "../Page/Authintaction/Login";
import Profile from "../Page/Profile";
import EditProfile from "../Page/Editprofiel";
import Servicearea from "../Page/Servicearea";
import Products from "../Page/Products";
import Root from "./Root";
import PrivateRouter from "./PrivateRouter";
import Productdetels from "../Page/Productdetels";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:'/about',
        Component:About
      },
      {
        path:'/contact',
        Component:Contact
      },
      {
        path:'/register',
        Component:Register
      },
      {
        path:'/login',
        Component:Login
      },
      {
        path:"/profile",
        element:<PrivateRouter><Profile/></PrivateRouter>
      },
      {
        path:"/editprofile",
        element:<PrivateRouter><EditProfile/></PrivateRouter>
      },
      {
        path:'/area',
        Component:Servicearea,
        loader:()=>fetch("/warehouses.json").then(res=>res.json())
      },
      {
        path:"/products",
        Component:Products
      },
      {
        path:'/productdetels/:id',
        Component:Productdetels
      }
    ]
  },
]);
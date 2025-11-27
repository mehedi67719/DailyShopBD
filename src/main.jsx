import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './Component/Root.jsx';
import Home from './Page/Homepage/Home.jsx';
import About from './Page/About.jsx';
import Contact from './Page/Contact.jsx';
import Register from './Page/Authintaction/Register.jsx';
import Login from './Page/Authintaction/Login.jsx';
import Authprovider from './Component/Authcomponent/Authprovider.jsx';
import Profile from './Page/Profile.jsx';
import Editprofiel from './Page/Editprofiel.jsx';
import Servicearea from './Page/Servicearea.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
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
        Component:Profile
      },
      {
        path:"/editprofile",
        Component:Editprofiel
      },
      {
        path:'/area',
        Component:Servicearea,
        loader:()=>fetch("/warehouses.json").then(res=>res.json())
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Authprovider>
      <RouterProvider router={router} />,
     </Authprovider>
  </StrictMode>,
)

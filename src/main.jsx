import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { RouterProvider } from "react-router/dom";
import Authprovider from './Component/Authcomponent/Authprovider.jsx';
import {router} from '../src/Component/Router.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Authprovider>
      <RouterProvider router={router} />
     </Authprovider>
  </StrictMode>
)

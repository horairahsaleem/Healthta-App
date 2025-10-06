import React from 'react'              // 👈 add this line
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import store from "./redux/store/store.js";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";




createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
 <Provider store={store}>
<GoogleOAuthProvider clientId={'932270816263-t978o8e65t5reh7ldvse73nvmmeapf6s.apps.googleusercontent.com'}>
    <App />
  </GoogleOAuthProvider>    
  </Provider>     
     </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)

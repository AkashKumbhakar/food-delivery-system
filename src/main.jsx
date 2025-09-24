import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import Store from './components/Redux/Store/Store.js'
import StoreContextProvider from './context/StoreContext.jsx'
import { BrowserRouter } from 'react-router-dom'
 import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <StoreContextProvider>
        <BrowserRouter>
        <ToastContainer />
         <App />
        </BrowserRouter>
        
      </StoreContextProvider>
     
    </Provider>
  </StrictMode>,
)

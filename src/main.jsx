import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import Store from './components/Redux/Store/Store.js'
import StoreContextProvider from './context/StoreContext.jsx'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <StoreContextProvider>
        <BrowserRouter>
         <App />
        </BrowserRouter>
        
      </StoreContextProvider>
     
    </Provider>
  </StrictMode>,
)

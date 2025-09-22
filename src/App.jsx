
import React, { useState } from 'react'
import Navbar from '../src/components/navbar/Navbar'
import Home from '../src/pages/Home/Home'
import Footer from './components/Footer/Footer'
import { Routes, Route } from 'react-router-dom'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrder from './pages/MyOrder/MyOrder'

const App = () => {
  const [showlogin,setShowLogin] = useState(false)
  return (
    <>
    {showlogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/cart' element={<Cart></Cart>}></Route>
            <Route path='/order' element={<PlaceOrder></PlaceOrder>}></Route>
            <Route path='/my-orders' element={<MyOrder></MyOrder>}></Route>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
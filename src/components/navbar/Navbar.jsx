import React, { useContext, useState } from 'react'
import './Navbar.css'
import { CiSearch } from "react-icons/ci";
import { BsBasketFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { FaUser } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
const Navbar = ({setShowLogin}) => {
    const navigate = useNavigate();
    const [menu,setMenu] = useState("home");
    const {user_id} = useContext(StoreContext);
    const logoutHandler=()=>{
        sessionStorage.removeItem("user_id");
        window.location.reload();
    }
  return (
    <div className='navbar'>
        <Link to='/'><img src='https://media.istockphoto.com/id/1435983029/vector/food-delivery-logo-images.jpg?s=612x612&w=0&k=20&c=HXPxcjOxUiW4pMW1u9E0k2dJYQOU37a_0qZAy3so8fY=' className='logo' alt="" /></Link>
        <ul className='navbar-menu'>
            <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
            <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
            <a href='#footer' onClick={()=>setMenu("contact-us")}className={menu==="contact-us"?"active":""}>contact us</a>
        </ul>
        <div className='navbar-right'>
            <div className='navbar-icon'>
                {/* <CiSearch /> */}
                <Link to='/cart'><BsBasketFill /></Link>   
            </div>
            {!user_id?<button onClick={()=>setShowLogin(true)}>sign in</button>:
            <div className='navbar-profile'>
                <FaUser/>
                <ul className='nav-profile-dropdown'>
                    <li onClick={()=>navigate('my-orders')}><MdOutlineShoppingBag/><p>Orders</p></li>
                    <hr />
                    <li onClick={()=>logoutHandler()}><MdOutlineLogout/><p>Logout</p></li>
                </ul>
                
            </div>}
            
        </div>
    </div>
  )
}

export default Navbar
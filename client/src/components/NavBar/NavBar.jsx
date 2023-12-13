import React, { useEffect, useState } from 'react'
import './NavBar.css'
import { useNavigate } from 'react-router'
import { selectTheme, useGetDetailsQuery } from '../../features/apiSlice'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../features/apiSlice';
function NavBar() {
    const navigate = useNavigate()
    const {data:userData, isLoading, isSuccess} = useGetDetailsQuery()
    const [showProfile, setShowProfile] = useState(null)
    const [NavOpts, showNavOpts] = useState(false)
   // const [theme, setTheme] = useState(null)
    const dispatch = useDispatch()
    const theme = useSelector(selectTheme)
    const changeTheme = ()=>{
      const newTheme = theme === 'light' ? 'dark' : 'light';
      console.log(newTheme);
      dispatch(setTheme(newTheme));
    }

   useEffect(()=>{
   
    console.log(userData);
    if(userData){
   
      setShowProfile(true)
    }
    window.addEventListener('scroll',()=>{
      showNavOpts(false)
    });
    
    return () => {
      window.removeEventListener('scroll', ()=>{
        showNavOpts(false)
      });
    };
   },[userData,NavOpts, theme])
  return (
    <div>

          <div id={`mainNav${theme}`}>
      <p id="logo" onClick={()=>navigate('/')}>TechXus</p>
     <div id='topOpts'>
     <FontAwesomeIcon icon={faMagnifyingGlass} className='search' />
      <FontAwesomeIcon icon={faCartShopping}  onClick={()=>navigate('/cart')}  className='Cart' />
      <FontAwesomeIcon icon={faBars} onClick={()=>showNavOpts(!NavOpts)} className='burger' />
      <FontAwesomeIcon icon={faCircleHalfStroke} onClick={changeTheme} className='halfStroke' />
     </div>
    </div>
   <div id='navOpts'>
   {NavOpts &&
      <div id={`navOpts${theme}`}>
             <p onClick={() => navigate('/product_tiles', { state: 'Laptop' })} >Laptops</p>
      <p  onClick={() => navigate('/product_tiles', { state: 'PC' })}>PCs</p>
      <p  onClick={() => navigate('/product_tiles', { state: 'Gaming Laptop' })}>Gaming Laptops</p>
     
   
      {showProfile ? (
         <p onClick={()=>navigate('/addproduct')}>Add Product</p>
      ):(
        <p onClick={()=>navigate('/login')}>Login</p>
      )}
      </div>
      
    }
   </div>
    </div>
  )
}

export default NavBar

import React, { useEffect, useState } from "react"
import { Route, Routes } from "react-router"
import NavBar from "./components/NavBar/NavBar"
import './App.css'
import Home from "./components/Home/Home"
import Signup from "./components/Signup/Signup"
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login/Login"
import Profile from "./components/Profile/Profile"
import AddProduct from "./components/AddProduct/AddProduct"
import ProdSec from "./components/ProdSecondary/ProdSec"
import ProductTile from "./components/ProductTile/ProductTile"
import Cart from "./components/Cart/Cart"
import ViewProduct from "./components/ViewProduct/ViewProduct"
import { Provider } from "react-redux"
import store from "./components/store"
import Footer from "./components/Footer/Footer"
function App() {
  localStorage.setItem('theme', 'dark')
  return (
    <>

    <Provider store={store}>
    <NavBar/>
    <Routes>
      <Route path= 'cart' element={<Cart/>}/>
      <Route path= '/view_product' element={<ViewProduct/>}/>
      <Route path="/product_tiles" element = {<ProductTile/>}/>
      <Route path="/prodsec" element={<ProdSec/>}/>
      <Route path="/addproduct" element={<AddProduct/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element = {<Login/>}/>
    </Routes>
    <Footer/>
    </Provider>
 
    <ToastContainer/>
    </>
  )
}

export default App

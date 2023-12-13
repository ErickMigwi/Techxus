import React, { useEffect, useState } from 'react'
import './ProductTile.css'
import { useLocation, useNavigate } from 'react-router'
import { selectTheme, useGetProdByTypeMutation } from '../../features/apiSlice'
import HashLoader from 'react-spinners/HashLoader'
import url from '../../url'
import {toast} from 'react-toastify'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import {
   useGetDetailsQuery,
   useAddToCartMutation,
 } from '../../features/apiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../../features/apiSlice';
function ProductTile() {
    const dispatch = useDispatch()
    
    const theme  = useSelector(selectTheme)
    const location =useLocation()
    const navigate = useNavigate()
    const [getProdByType, {isLoading, isError, data}] = useGetProdByTypeMutation()
    const [type, setType] = useState(location.state)
    const [products, setProducts] = useState(null)
    const [showNoProd, setShowNoProd] = useState(null)
    const {data:userData, isLoading:loadingUserDetails, isError:errFetchingUserDetails} = useGetDetailsQuery()
    const [addToCart, {isLoading:setToCartState, isError:errorWhenSettingToCart}] = useAddToCartMutation()
    //Functions
    const fetchData = async(type)=>{
   try{
    const res = await getProdByType({type}).unwrap()
    return res
   }catch (err){
    console.log(err);
   }
    }
    const add_to_cart = async (idproduct)=>{
      if(userData){
    try{
      const res = await addToCart({idproduct:idproduct, iduser:userData[0].idusers, quantity:1}).unwrap()
    if(res){
      console.log(res.msg.msg);
      toast.success(res.msg.msg)
    }
    }catch(err){
      console.log(err);
    }
      }else{
        toast.warning('kindly login or create an account to access cart feature')
      }
    }
    const state = location.state
    useEffect(()=>{
 
      console.log(userData);
      const SetProducts = async()=>{
        try{
          const res =await fetchData(location.state)
          if(res.length > 0){
          console.log(res);
      setProducts(res)
          }else{
            
          }
        }catch(err){
          console.log(err);
        }
      }
   
      SetProducts()
    },[userData,state])
  return (
    <div id={`mainProdTiles${theme}`}>
   
    {isLoading &&
     <div id='loader'>
      <HashLoader
      color='orange'
      size={50}
      />
      </div>
      }
   
   {products ?(
   <div id='products'>
   {products.map(e=>{
    return(
      <div id='prodShowCase'>
        <img src={`${url}/uploads/${e.main_img}`} alt="" srcset="" onClick={()=>navigate('/view_product', {state:e})} />
      <div id={`prodDetails${theme}`}>
      <p id='prodName'>{e.product_name}</p>
    <p id='desc'>{e.product_desc}</p>
    <p id="price">Ksh {Number(e.product_price).toLocaleString()}</p>
    <p id='type'>Brand: {e.brand}</p>
   <div id="prodOpts">
   <FontAwesomeIcon icon={faCartPlus}  className='cart' onClick={()=>add_to_cart(e.idproduct)}/>

   </div>
      </div>
      </div>
    )
   })}
 </div>
  ):(
    <p>No Products Found</p>
  ) }
    </div>
  )
}

export default ProductTile

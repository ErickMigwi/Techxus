import React, { useEffect, useState } from 'react'
import { 
  selectTheme,
    useFetchCartItemsMutation,
    useGetDetailsQuery,
    useSetItemQuantityMutation,
    useDelItemInCartMutation,
 } from '../../features/apiSlice'
import { useNavigate } from 'react-router'
import {toast} from 'react-toastify'
import './Cart.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select'
import url from '../../url'
import {useSelector} from 'react-redux'
function Cart() {
  const [delItemInCart, {data:delItemInCartData}] = useDelItemInCartMutation()
    const [fetchCartItems, {data:cartedItems, isLoading:loadingCartItems, isError:errFetchingCartItems}] = useFetchCartItemsMutation()
    const {data:userDetails, isLoading, isError} = useGetDetailsQuery()
    const navigte = useNavigate()
    const [totalPrice, setTotalPrice]=useState(null)
    const [setItemQuantity, {data:setQuantityRes}] = useSetItemQuantityMutation()
    const [carItems , setCarItems] =useState(null)
  const options = [
    {label:1, value:1},
    {label:2, value:2},
    {label:3, value:3},
    {label:4, value:4},
    {label:5, value:5},
    {label:6, value:6},
    {label:7, value:7},
    {label:9, value:9},
    {label:10, value:10},
    {label:11, value:11},
    {label:12, value:12},
  ]
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '15vw',
      borderRadius: '10px',
      border: '2px solid hsl(20, 99%, 57%, 0.8)',
      color: '#FE6F27',  // Adjusted text color
      fontSize: '20px',
      paddingLeft: '2vw',
      paddingRight: '2vw',
      background: '#2f2f2f',
    }),
    menu: (provided, state) => ({
      ...provided,
      width: '15vw',
      borderRadius: '10px',
      border: '2px solid hsl(20, 99%, 57%, 0.8)',
      color: '#FE6F27', 
      fontSize: '20px',
      background: ' hsl(0, 0%, 18%, 0.9)',
      fontFamily: 'Roboto, sans-serif',
    
    }),
    singleValue: provided => ({
      ...provided,
      color: '#FE6F27'
    })
  };
  const theme = useSelector(selectTheme)
    //Functions
    const setQuantity = async (e, id)=>{
      await setItemQuantity({quantity:e.value, id:id}).unwrap()
      if(setQuantityRes){
        console.log(setQuantityRes);
        toast.success(setQuantityRes)
       }
    }
    const fetchCartedItems = async()=>{
      try{
        console.log(1);
        if(userDetails&& userDetails[0].idusers){
            console.log(2);
            const cartProducts = await fetchCartItems({iduser:userDetails[0].idusers}).unwrap()
            setCarItems(cartProducts)
            console.log(cartProducts);
            setTotalPrice(getTotalPrice(cartProducts));
        }
      }catch(err){
        // console.log(err);
      }
    }
   const getTotalPrice = (data)=>{
    let sum = 0 
    data.map(e=>{
      sum += e.product_price * Number(e.quantity)
     })
     console.log(sum);
     return sum
   }
    useEffect(()=>{

     if(userDetails){
        fetchCartedItems()

     }
     if(delItemInCartData){
      toast.success(delItemInCartData.msg)
      console.log(delItemInCartData);
      getTotalPrice(carItems)
      console.log(getTotalPrice(carItems));
      fetchCartItems()
    }
   
  
     
        console.log(userDetails);
    },[userDetails, setQuantityRes,delItemInCartData, totalPrice])
  return (
    <div id={`mainCart${theme}`}>
      <p id='heading'>Cart</p>
      <div id='cartedItems'>
        {cartedItems && cartedItems.map(e=>{
            return(
                <div id='displayCart' key={e.idproduct}>
                   <img src={`${url}/uploads/${e.main_img}`} alt="" srcset="" id='cartImg' />
                    <p>{e.product_name}</p>
                   
                <p>Ksh {Number(e.product_price).toLocaleString()}</p>
             <div id='disQuantity'>
             {e.quantity?(
              <p>Qty: {e.quantity}</p>
             ):(
              <p>Qty: 1</p>
             ) }
           
           <Select 
           placeholder={`quantity`}
           options={options}
           styles={customStyles}
           onChange={(v)=>setQuantity(v, e.idproduct)}
           className='Select'
         
           />
       


             <FontAwesomeIcon icon={faTrash} className='trash' onClick={()=>delItemInCart({idcart:e.idcart})}/>
             </div>
              
                </div>
            )
        })}
      </div>
       {totalPrice ? (
        <div id="totalPrice">
        <p>TotalPrice:</p>
       <p>ksh {Number(totalPrice).toLocaleString()}</p>
       <button>Order Now</button>
       </div>
       ):(
        <p id='addItems'> Add Items to Cart</p>
       )}
    </div>
  )
}

export default Cart

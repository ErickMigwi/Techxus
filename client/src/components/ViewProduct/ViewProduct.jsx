import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import url from '../../url';
import './ViewProduct.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from 
"@fortawesome/free-solid-svg-icons";
import { faPlay } from 
"@fortawesome/free-solid-svg-icons";
import { faX } from 
"@fortawesome/free-solid-svg-icons";
import {
    useGetDetailsQuery,
    useAddToCartMutation,
    selectTheme,
  } from '../../features/apiSlice'
  import {toast} from 'react-toastify'
import { useSelector } from 'react-redux';
function ViewProduct() {
    const location = useLocation()
    const theme = useSelector(selectTheme)
    const [product , setProduct] = useState(location.state)
    const [mainView, setMainView] = useState(location.state.main_img)
    const [addToCart, {isLoading:setToCartState, isError:errorWhenSettingToCart}] = useAddToCartMutation()
    const {data:userData, isLoading:loadingUserDetails, isError:errFetchingUserDetails} = useGetDetailsQuery()
    const [more_imgs, setMoreImgs] = useState(null)
    const [disVid, setDisVid] = useState(false)
    //Fucntions
    const add_to_cart = async (idproduct)=>{
        if(userData){
      try{
        const res = await addToCart({idproduct:idproduct, iduser:userData[0].idusers}).unwrap()
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
      const changeMainView = e=>{
        setMainView(e)
      }
      useEffect(()=>{
        console.log(theme);
        setMoreImgs(location.state)
     
      },[userData])
    return (
    <div id={`mainViewProduct${theme}`}>
        <div id='prodImgs'>
          <div id="vidShowCase">
          <img src={`${url}/uploads/${mainView}`} alt="" srcset="" id='mainImg' />
          {product.more_imgs.split(",").map(e=>{
                if(e.endsWith('mp4')){
                    return(
                     <div>
                       <FontAwesomeIcon icon={faPlay} className='video'
                       onClick={()=>setDisVid(!disVid)}
                       />
                       {disVid && 
        <div id='disVid'>
           <video src={`${url}/uploads/${e}`} controls id='video'/>
           <FontAwesomeIcon icon={faX} 
           className='x'
           onClick={()=>setDisVid(!disVid)}
           />
        </div>
        }
                     </div>
                    )
                }
            })}
          </div>
            <div id='moreImg'>
            {product.more_imgs.split(",").map((e, index) => {
  if (e.endsWith('.jpg') || e.endsWith('.webp') || e.endsWith('.png') || e.endsWith('.jpeg')) {
    return (
      <div key={index}>
        <img src={`${url}/uploads/${e}`} alt="" srcSet="" id='moreImgs' onClick={()=>changeMainView(e)} />
      </div>
    );}
//   } else if (e.endsWith('.mp4')) {
//     return (
//       <div key={index}>
//         <video onClick={()=>changeMainView(e)} width='320px' height ='320px' src={`${url}/uploads/${e}`} controls/>
//       </div>
//     );
//   } else {
//     // Handle other cases or provide a default fallback
//     return null;
//   }
})}
<img src={`${url}/uploads/${product.main_img}`} alt="" srcset=""  id='moreImgs' onClick={()=>changeMainView(product.main_img)}/>

            </div>
         <div id="showVid">
        
         </div>
        </div>
        <div id="prodDetails">
            <p id='prodName'>{product.product_name}</p>
            <p>Description</p>
            <p id='prodDesc'>{product.product_desc}</p>
            <p>Price</p>
            <p id='prodPrice'>{Number(product.product_price).toLocaleString()}</p>
            <p>Brand</p>
            <p id='brand'>{product.brand}</p>
            <FontAwesomeIcon icon={faCartPlus}  className='cart' onClick={()=>add_to_cart(product.idproduct)}/>
        </div>
        
    </div>
  )
}

export default ViewProduct

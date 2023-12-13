import React, { useState } from 'react'
import { useAddMoreImgsMutation } from '../../features/apiSlice'
import {toast} from 'react-toastify'
import { useLocation, useNavigate } from 'react-router'
function ProdSec() {
  const navigate  = useNavigate()
    const location =useLocation()
    console.log(location.state.id);
    const [moreImgs, setMoreImgs] = useState([])
    const [video, setVideo] = useState(null)
    const [addMoreImgs, {isLoading, isError}] = useAddMoreImgsMutation()
    //Funs
    const AddMoreImgs = async()=>{
      console.log(moreImgs);
      if(moreImgs.length > 0){
    const res = await addMoreImgs({moreImgs:moreImgs, id:location.state.id}).unwrap()
    if (res) {
      navigate('/product_tiles', {state:location.state.prodType}) 
    }
      
      }else{
       toast.error('all input fields must have a value')
      } 
     
       console.log(1);
    }
  return (
    <div id='setBackground'>
      <p id='addProd'>Add More Details</p>
     <div id="mainAddProduct">
     <div id="align">
        <p>More Images</p>
        <input type="file"  multiple onChange={(e)=>setMoreImgs(e.target.files)}/>
       
      </div>
      <button onClick={AddMoreImgs}>Add More Images or a Video</button>
      {/* <div id="align">
        <p>Add Video</p>
        <input type="file" accept='video/*' onChange={e=>setVideo(e.target.files[0])} />
       
      </div> */}
      {/* <button>Add Video</button> */}
     </div>
    </div>
  )
}

export default ProdSec

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import './AddProduct.css'
import { useAddProductMutation } from '../../features/apiSlice'
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router'
import Select from 'react-select'
function AddProduct() {
  const navigate = useNavigate()
  const [prodName, setProdName] = useState(null)
  const [prodPrice, setProdPrice] = useState(null)
  const [prodDesc, setProdDesc] = useState(null)
  const [mainImg, setMainImg] = useState(null)
  const [brand, setBrand] = useState(null)
  const [prodType, setProdType] = useState(null)
  const [addProduct, { isLoading, isError }] = useAddProductMutation()
  const options = [
    { value: 'Gaming Laptop', label: 'Gaming Laptop' },
    { value: 'Laptop', label: 'Laptop' },
    { value: 'PC', label: 'PC' },
    { value: 'Computer Accessores', label: 'Computer Accessories' },

  ]
  //Functions
  const AddProduct = async () => {
    console.log(prodType);
    if (prodName && prodPrice && prodDesc && mainImg && brand && prodType) {
      try {
        const id = await nanoid()
        const res = await addProduct({ prodDesc, prodName, prodPrice, mainImg, id, brand, prodType }).unwrap()
        if (res.response === 'product added') {
          navigate('/prodsec', { state:{id:id, prodType:prodType}})
        }

      } catch (err) {
        console.log(err);
      }
    } else {
      toast.warning('all input fields must have a values')
    }
  }
  
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '30vw',

      borderRadius: '10px',
      border: '2px solid hsl(20, 99%, 57%, 0.8)',
      color: '#FE6F27',
      fontSize: '20px',
      paddingLeft: '2vw',
      paddingRight: '2vw',
      background: 'none',
      fontFamily: 'Roboto, sans-serif'
    }),
    menu: (provided, state) => ({
      ...provided,
      width: '30vw',
      borderRadius: '10px',
      border: '2px solid hsl(20, 99%, 57%, 0.8)',
      color: '#FE6F27',
      fontSize: '20px',
      background: ' hsl(0, 0%, 18%, 0.9)',
      fontFamily: 'Roboto, sans-serif',
    }),
   
  };
  return (
    <div id="setBackground">
      <p id='addProd'>Add Product</p>
      <div id='mainAddProduct'>

        <div id="align">
          <p>Product Name</p>
          <input type="text" onChange={e => setProdName(e.target.value)} />
        </div>
        <div id="align">
          <p>Product Price</p>
          <input type="text" onChange={e => setProdPrice(e.target.value)} />
        </div>

        <div id="align">
          <p>Product Description</p>
          <textarea name="" id="" cols="30" rows="10" onChange={e => setProdDesc(e.target.value)}></textarea>
        </div>
        <div id="align">
          <p>Product Brand</p>
          <input type="text" onChange={e => setBrand(e.target.value)} />
        </div>
        <div id="align">
          <p>Product Main Image</p>
          <input type="file" onChange={e => setMainImg(e.target.files[0])} />
        </div>
        <div id="align">
          <p>Product type</p>
          <Select
          options={options}
           styles={customStyles}
          onChange={e=>setProdType(e.value)}
          />
        </div>
        {/* <p>More Images</p>
      <input type="file" multiple/> */}
        <button onClick={AddProduct}>Add Product</button>
      </div>
    </div>
  )
}

export default AddProduct

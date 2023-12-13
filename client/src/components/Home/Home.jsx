import React, {useEffect,useState} from 'react'
import './Home.css'
import razer from '../../Images/razer.png'
import { useNavigate } from 'react-router'
import  Axios  from 'axios'
import url from '../../url'
import { 
  selectTheme,
    useGetDetailsQuery,
    useGetProductsQuery,
} from '../../features/apiSlice'
import asus from '../../Images/asus1.jpg'
import asus1 from '../../Images/asus2.jpg'
import gamPc from '../../Images/gamPc.jpg'
import gamPc1 from '../../Images/gamePc.webp'
import { useDispatch, useSelector } from 'react-redux';


function Home() {
  const navigate = useNavigate();
  const theme = useSelector(selectTheme)
  const { data: detailsData, error: detailsError, isLoading: detailsIsLoading } = useGetDetailsQuery();
  const { data: productsData, error: productsError, isLoading: productsIsLoading } = useGetProductsQuery();



  window.addEventListener('storage', (e)=>{
    console.log(e);
  })
  useEffect(() => {
 
  }, []); 
  
  return (
    <div>
      {asus && asus1 && gamPc1 && gamPc ? (
        <div id={`mainHome${theme}`}>
          <img src={razer} alt="" srcSet="" id='producImgAd' />
          <p id={`productAd${theme}`}>Latest Gaming Gear</p>
          {productsData && (
            <div id={`disRazer${theme}`}>
              {productsData.map((e, index) => {
                if (e.brand === 'Razer') {
                  return (
                    <div id={`disPerImg${theme}`} key={index}>
                      <img
                        src={`${url}/uploads/${e.main_img}`}
                        alt=""
                        srcSet=""
                        onClick={() => navigate('/product_tiles', { state: 'Gaming Laptop' })}
                      />
                      <p>{e.product_name}</p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
          <p id={`productAd${theme}`}>High-End Laptops</p>
          <div id='adAsus'>
            <img id='asusImgAd' src={asus} alt="" srcSet="" onClick={() => navigate('/product_tiles', { state: 'Laptop' })} />
            <img id='asusImgAd' src={asus1} alt="" srcSet="" onClick={() => navigate('/product_tiles', { state: 'Laptop' })} />
          </div>
          <p id={`productAd${theme}`}>Built for Dominance: Explore Our Pro PC Builds.</p>
          <div id='adAsus'>
            <img src={gamPc} alt="" srcSet="" id='gamePc' onClick={() => navigate('/product_tiles', { state: 'PC' })} />
            <img src={gamPc1} alt="" srcSet="" id='gamePc' onClick={() => navigate('/product_tiles', { state: 'PC' })} />
          </div>
      
        </div>
      ) : (
        <div id='loader'>
          <HashLoader color='orange' size={50} />
        </div>
      )}
    </div>
  );
}

export default Home;

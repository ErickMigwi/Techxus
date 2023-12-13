import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { createSlice } from '@reduxjs/toolkit'
const themeSlice = createSlice({
    name:'theme',
    initialState:{
        mode:'dark'
    },
    reducers:{
        setTheme:(state, action)=>{
            console.log(action.payload);
            state.mode = action.payload
        }
    }
})

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:3500',
    credentials:'include'
}),
tagTypes: ["Users"],
    endpoints:(builder)=>({
        regUser:builder.mutation({
            query:(userDetails)=>({
                url:'/user/createaccount',
                method:'POST',
                body:userDetails
            })
        }),
        loginUser:builder.mutation({
            query:(userDetails)=>({
                url:'/user/login',
                method:'POST',
                body:userDetails
            })
        }),
        getDetails:builder.query({
            query:()=>({
                url:'/user/user_details',
                method:'GET',
            })
        }),
        addProduct:builder.mutation({
            query:(product)=>{
                const formData = new FormData()
                formData.append('prodName', product.prodName)
                formData.append('prodDesc', product.prodDesc)
                formData.append('prodPrice', product.prodPrice)
                formData.append('mainImg', product.mainImg)
                formData.append('idproduct', product.id)
                formData.append('prodType',product.prodType)
               console.log(formData)
               formData.append('brand', product.brand)
                return{
                    url:'/product/addProduct',
                method:'POST',
                body:formData,
              
                }
            }
        }),
        addMoreImgs:builder.mutation({
            query:(data)=>{
                
                const formData = new FormData()
                for (let i = 0; i < data.moreImgs.length; i++) {
                    formData.append('moreImgs', data.moreImgs[i])
                  
                    
                }
                formData.append('idproduct', data.id)
                console.log(formData);
                return{
                    url:'/product/moreImgs',
                    method:'POST',
                    body:formData
                }
            }
        }),
        getProducts:builder.query({
            query:()=>({
                url:'/product/getprodcuts',
                method:'GET',
            })
        }),
        getProdByType:builder.mutation({
            query:(data)=>{
                console.log(data);
                return{
                    url:'/product/fetchByType',
                    method:'GET',
                    params:data
                }
            }
        }),
        addToCart:builder.mutation({
            query:(data)=>{
                console.log(data);
                return{
                    url:'/cart/add_to_cart',
                    method:'POST',
                    body:data
                }
            }
        }),
        fetchCartItems:builder.mutation({
            query:(data)=>{
                console.log(data);
                return{
                    url:'/cart/fetchCartItems',
                    method:'POST',
                    body:data
                }
            }
        }),
        setItemQuantity:builder.mutation({
            query:(data)=>{
           console.log(data);
                return{
            url:'/cart/setQuantity',
            method:'POST', 
            body:data
           }
            }
        }), 
        delItemInCart:builder.mutation({
            query:(data)=>{
                console.log(data);
                return{
                    url:'/cart/del_carted_item',
                    method:'DELETE',
                    params:data
                }
            }
        })
      

        
    })
})
export const {
    useGetDetailsQuery,
    useLoginUserMutation,
    useRegUserMutation,
    useAddProductMutation,
    useAddMoreImgsMutation,
    useGetProductsQuery,
   useGetProdByTypeMutation,
   useAddToCartMutation,
   useFetchCartItemsMutation,
   useSetItemQuantityMutation,
   useDelItemInCartMutation,
} = apiSlice
export const { setTheme } = themeSlice.actions;

export const selectTheme = (state) => state.theme.mode;
export const ThemeSlice = themeSlice.reducer
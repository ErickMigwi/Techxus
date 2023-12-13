import React, { useState } from 'react'
import './Login.css'
import { useLocation, useNavigate } from 'react-router'
import Axios from 'axios'
import url from '../../url'
import {toast} from 'react-toastify'
import { useLoginUserMutation } from '../../features/apiSlice'
Axios.defaults.withCredentials = true
function Login() {
    //States

    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [loginUser, { data, error, isLoading }] = useLoginUserMutation()
    //Functions
    const login = async()=>{
        if(email && password){
         const data = {email, password}
         try{
          const res = await loginUser(data).unwrap()
         if(res.msg){
            toast.success(res.msg)
            navigate('/')
            window.location.reload()
         }else{
            toast.warning(res.err)
         }
         }catch(err){
             console.log(err);
         }
     }}
  return (
   <div id="setBackground">
     <div id='mainLogin'>
      <p id='login'>Login</p>
      <p>Email</p>
      <input type="text" onChange={e=>setEmail(e.target.value)}/>
      <p>Password</p>
      <input type="password" onChange={e=>setPassword(e.target.value)}/>
      <button id='login' onClick={login}>Login</button>
      <p id='goto' onClick={()=>navigate('/signup')}>Create Account ?</p>
    </div>
   </div>
  )
}

export default Login

import React, { useState } from 'react'
import './Signup.css'
import { useNavigate } from 'react-router'
import url from '../../url'
import {toast} from 'react-toastify'
import Axios from 'axios'
import { useRegUserMutation } from '../../features/apiSlice'
Axios.defaults.withCredentials = true
function Signup() {
    //States
    const navigate = useNavigate()
    const [email, setEmail] = useState(null)
    const [firstname, setFirstname] = useState(null)
    const [lastname, setLastname] = useState(null)
    const [password, setPassword] = useState(null)
    const [confPswd, setConfPswd] = useState(null)
    const [regUser, {isLoading, isError}]=useRegUserMutation()
    //Fucntions
    const createAcc =async ()=>{
       if(password !== confPswd){
        toast.warning('passwords do not match. Please try again')
       }else if(email, lastname, firstname, password, confPswd){
            Axios.post(`${url}/user/createaccount`, {
                email:email,
                password:password,
                firstname:firstname,
                lastname:lastname
            }).then(res=>{
              if(res.data.msg){
                toast.success(res.data.msg)
                navigate('/login', {state:1})
              }else{
                toast.warning(res.data.dup)
              }
            })
          const data = {email, password, firstname, lastname}
          console.log(data);
          try{
            const res = await regUser(data).unwrap()
          
            if(res.msg){
              toast.success(res.msg)
            }else{
              toast.warning(res.dup)
            }
          }catch(err){
            console.log(err);
          }

       }else{
        toast.warning('all input fields must have values')
       }
    }
  return (
   <div id="setBackground">
     <div id='mainSignup'>
      <p>Email</p>
      <input type="text" onChange={(e)=>setEmail(e.target.value)}/>
      <p>Firstname</p>
      <input type="text" onChange={e=>setFirstname(e.target.value)}/>
      <p>Lastname</p>
      <input type="text" onChange={e=>setLastname(e.target.value)}/>
      <p>Password</p>
      <input type="password" onChange={e=>setPassword(e.target.value)}/>
      <p>Confirm Password</p>
      <input type="password"  onChange={e=>setConfPswd(e.target.value)}/>
      <button id='createAcc' onClick={createAcc}>Create Account</button>
      <p id='goto' onClick={()=>navigate('/login')}>Login</p>
    </div>
   </div>
  )
}

export default Signup

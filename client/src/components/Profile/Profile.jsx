import React, { useState } from 'react'
import { useGetDetailsQuery } from '../../features/apiSlice'
function Profile() {
  const {data:userData, isLoading, isError, isSuccess} = useGetDetailsQuery()

  return (
    <div>
      {isLoading ? (
        <p>Loading</p>
      ):(
        <div id='mainProfile'>
        <div id='accOpts'>
            <button>Logout</button>
            <button>Switch Account</button>
        </div>
        <div id="userData">
        <img src= {userData[0].profileimage} alt="" srcset="" />
        <p>{userData[0].firstname}{userData[0].lastname}</p>
        </div>
        <div id='profOpts'>
            <button>Check Inbox</button>
            <button>Add Product</button>
        </div>
    </div>
      )}
    </div>
  )
}

export default Profile

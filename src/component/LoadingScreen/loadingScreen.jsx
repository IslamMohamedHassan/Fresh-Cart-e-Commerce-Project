import React from 'react'

export default function LoadingScreen () {
  return (
    <div className='vh-100 w-100 bg-light  d-flex justify-content-center align-items-center position-fixed'>
        <i className='fa-solid fa-spinner fa-spin fa-7x'/>
    </div>
  )
}

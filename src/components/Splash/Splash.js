import React from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'
import './Splash.css'

const Splash = props => {
  return (
    <div className='splash'>
      <ScaleLoader color={'#28df99'} loading={props.loading} size={400} />
    </div>
  )
}

export default Splash

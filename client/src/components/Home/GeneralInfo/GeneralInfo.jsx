import React from 'react'
import "./GeneralInfo.css"

function GeneralInfo() {
  return (
    <div className='generalInfo'>
      <div className="palliativeCare">
        <h3>What is Palliative Care and how can it help me?</h3>
        <button className='readMore'> Read More &rarr; </button>
      </div>
      <div className="pcnCare">
        <h3>How to care for your percutaneous nephrostomy tube!</h3>
        <button className='readMore'> Read More &rarr; </button>
      </div>
      <div className="biliaryCare">
        <h3>How to care for your biliary drain!</h3>
        <button className='readMore'> Read More &rarr; </button>
      </div>
    </div>
  )
}

export default GeneralInfo

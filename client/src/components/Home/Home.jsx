import React from 'react'
import Banner from './Banner/Banner'
import "./Home.css"
import GeneralInfo from './GeneralInfo/GeneralInfo'

function Home({handleSignInOpen, handleCreateAccOpen}) {
  return (
    <div className='home'>
        <Banner 
            handleSignInOpen = {handleSignInOpen}
            handleCreateAccOpen = {handleCreateAccOpen}
        />
        <GeneralInfo/>

    </div>
  )
}

export default Home

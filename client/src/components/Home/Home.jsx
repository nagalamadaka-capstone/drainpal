import React from 'react'
import Banner from './Banner/Banner'
import "./Home.css"
import GeneralInfo from './GeneralInfo/GeneralInfo'
import NavBar from '../NavBar/NavBar'
import Sidebar from '../Sidebar/Sidebar'
import {useParams} from 'react-router-dom'

function Home({handleSignInOpen, handleCreateAccOpen, isLoggedIn, createAcc, signIn, handleOnCreateAccFormChange, handleOnSignInFormChange, isSignInOpen, isCreateAccOpen, handleOnSignInSubmit}) {
    
  return (
    <div className='home'>
        
        <Sidebar
            isSignInOpen={isSignInOpen}
            isCreateAccOpen={isCreateAccOpen}
            createAcc = {createAcc}
            handleOnCreateAccFormChange = {handleOnCreateAccFormChange}
            handleCreateAccOpen = {handleCreateAccOpen}
            handleSignInOpen = {handleSignInOpen}
            handleOnSignInFormChange = {handleOnSignInFormChange}
            signIn = {signIn}
            handleOnSignInSubmit={handleOnSignInSubmit}
          />
        <NavBar
            handleSignInOpen={handleSignInOpen}
            isLoggedIn = {isLoggedIn}
            handleCreateAccOpen={handleCreateAccOpen}
          />
        <Banner 
            handleSignInOpen = {handleSignInOpen}
            handleCreateAccOpen = {handleCreateAccOpen}
            isLoggedIn = {isLoggedIn}
        />
        <GeneralInfo/>

    </div>
  )
}

export default Home

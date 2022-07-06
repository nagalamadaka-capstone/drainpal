import React from 'react'
import CreateAcc from './CreateAcc/CreateAcc'
import SignIn from './SignIn/SignIn'
import "./Sidebar.css"

function Sidebar({isSignInOpen, isCreateAccOpen, createAcc, handleOnCreateAccFormChange, handleCreateAccOpen, handleSignInOpen, handleOnSignInFormChange, signIn}) {
  return (
    <aside className={isCreateAccOpen ? "sidebar createaccopen" : isSignInOpen? "sidebar signinopen" : "sidebar"}>
        {isCreateAccOpen ? <CreateAcc 
        createAcc = {createAcc} 
        handleOnCreateAccFormChange = {handleOnCreateAccFormChange}
        handleCreateAccOpen = {handleCreateAccOpen}
        /> : isSignInOpen ? <SignIn
        signIn = {signIn}
        handleOnSignInFormChange = {handleOnSignInFormChange}
        handleSignInOpen = {handleSignInOpen}
        /> : null}

    </aside>
  )
}

export default Sidebar

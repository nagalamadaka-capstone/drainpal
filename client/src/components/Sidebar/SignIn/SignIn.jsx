import React from 'react'
import ".//SignIn.css"

function SignIn({signIn, handleSignInOpen, handleOnSignInFormChange, handleOnSignInSubmit}) {
  return (
    <div className='signIn'>
        <form className='signin-form'>
        <button className='back-button' onClick = {() => handleSignInOpen()}> &rarr;</button>
        <h1>Sign In!</h1>

        <h2>E-mail</h2>
        <input type="email" name="email" placeholder = "e.g. drainpal@drainpal.com" 
        className="sign-in-input" value={signIn.email}
        onChange={(e) => {handleOnSignInFormChange("email", e.target.value)}} />

        <h2>Password</h2>
        <input type="password" name="password" placeholder = "********" 
        className="sign-in-input" value={signIn.password}
        onChange={(e) => {handleOnSignInFormChange("password", e.target.value)}} />

        <button className="sign-in-button" onClick={() => console.log("create acc")}> Sign In </button>

        </form>
      
    </div>
  )
}

export default SignIn

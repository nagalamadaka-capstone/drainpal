import React from 'react';
import "./ArticleView.css";
import NavBar from '../NavBar/NavBar';
import {useState} from 'react';

function ArticleView({isLoggedIn, handleSignInOpen, handleCreateAccOpen}) {
    const API_BASE_URL = "http://localhost:3001";
    const [article, setArticle] = useState({});

  return (
    <div className='articleView'>
         <NavBar
        handleSignInOpen={handleSignInOpen}
        isLoggedIn = {isLoggedIn}
        handleCreateAccOpen={handleCreateAccOpen}
        /> 
      
    </div>
  )
}

export default ArticleView

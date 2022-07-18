import React from 'react'
import "./GeneralInfo.css"
import { Link } from "react-router-dom";

function GeneralInfo({article}) {
  


  return (
    <div class="article">
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <Link to="/articles/"><button className='readMore'> Read More &rarr; </button></Link>
    </div>
  )
}

export default GeneralInfo

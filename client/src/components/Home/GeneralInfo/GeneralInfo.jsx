import React from 'react'
import "./GeneralInfo.css"
import { Link } from "react-router-dom";

function GeneralInfo({article}) {
  const articleId = article.id;
  
  return (
    <div class="article">
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <Link to= {`/articles/${articleId}`} ><button className='readMore'> Read More &rarr; </button></Link>
    </div>
  )
}

export default GeneralInfo

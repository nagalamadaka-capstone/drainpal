import React from "react";
import "./ArticleView.css";
import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ArticleView({
  isLoggedIn,
  handleSignInOpen,
  handleCreateAccOpen,
  isDoctorLoggedIn,
}) {
  const API_BASE_URL = "http://localhost:3001";
  const params = useParams();
  let articleId = params.articleid;
  const [article, setArticle] = useState({});

  useEffect(() => {
    axios.get(`${API_BASE_URL}/articles/${articleId}`).then((res) => {
      setArticle(res.data.article);
    });
  }, []);

  return (
    <div className="articleView">
      <NavBar
        handleSignInOpen={handleSignInOpen}
        isLoggedIn={isLoggedIn}
        handleCreateAccOpen={handleCreateAccOpen}
        isDoctorLoggedIn={isDoctorLoggedIn}
      />
      <div className="notNavBar articleViewContent">
        <h1>{article.title}</h1>
        <p>{article.body}</p>
        <h2>{article.header1}</h2>
        <p>{article.body2}</p>
        <h2>{article.header2}</h2>
        <p>{article.body3}</p>
        <h2>{article.header3}</h2>
        <p>{article.body4}</p>
        <h2>{article.header4}</h2>
        <p>{article.body5}</p>
      </div>
    </div>
  );
}

export default ArticleView;

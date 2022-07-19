const express = require('express');
const router = express.Router();
const {NotFoundError} = require('../utils/error');
var Parse = require("parse/node");
const BACK4APPKEY = require("../../client/src/securitykeys").BACK4APPKEY;
const BACK4APPSECRET = require("../../client/src/securitykeys").BACK4APPSECRET;

Parse.initialize(
  BACK4APPKEY,
  BACK4APPSECRET
);
Parse.serverURL = "https://parseapi.back4app.com/";

//return array of all articles
router.get('/', async (req, res, next) => {
    try{
        let articles = Parse.Object.extend("Articles");
        var query = new Parse.Query(articles);
        query.find().then((results) => {
            let newArticles = [];
            for (let i = 0; i < results.length; i++){
                let article = results[i];
                let newArticle = {
                    id: article.id,
                    key: article.id,
                    title: article.get("Title"),
                    body: article.get("Body"),
                    description: article.get("Description"),
                    header1: article.get("Header1"),
                    header2: article.get("Header2"),
                    header3: article.get("Header3"),
                    header4: article.get("Header4"),
                    body2 : article.get("Body2"),
                    body3 : article.get("Body3"),
                    body4: article.get("Body4"),
                    body5: article.get("Body5"),
                }
                newArticles.push(newArticle);
            }
            res.send({newArticles});
        });
    }
    catch(err){
    } 
    }
);

//fetch single article
router.get('/:articleId', async (req, res, next) => {
    try{
        const articleId = req.params.articleId;
        let articles = Parse.Object.extend("Articles");
        var query = new Parse.Query(articles);
        const article = query.get(articleId);
        let newArticle = {
            id: articleId,
            title: (await article).attributes["Title"],
            body: (await article).attributes["Body"],
            description: (await article).attributes["Description"],
            header1: (await article).attributes["Header1"],
            header2: (await article).attributes["Header2"],
            header3: (await article).attributes["Header3"],
            header4: (await article).attributes["Header4"],
            body2 : (await article).attributes["Body2"],
            body3 : (await article).attributes["Body3"],
            body4: (await article).attributes["Body4"],
            body5: (await article).attributes["Body5"],
        }
        if (!article) {
            throw new NotFoundError('Article not found');
        }
        res.status(200).send({"article": newArticle})
    }
    catch (err){
        next(err);
    }  
})

module.exports = router;
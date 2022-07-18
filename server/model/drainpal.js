const {BadRequestError} = require("../utils/error");
var Parse = require("parse/node");
const BACK4APPKEY = require("../../client/src/securitykeys").BACK4APPKEY;
const BACK4APPSECRET = require("../../client/src/securitykeys").BACK4APPSECRET;

Parse.initialize(
  BACK4APPKEY,
  BACK4APPSECRET
);
Parse.serverURL = "https://parseapi.back4app.com/";

function findArticleById(newArticles, id){
    for (let i = 0; i < newArticles.length; i++){
        if (Number(newArticles[i].id) === Number(id)){
            return newArticles[i];
        }
    }
return null;    
}

class DrainModel {
    constructor(){
        this.super();
    }

    static async fetchArticles(){
        try{
            let articles = Parse.Object.extend("Articles");
            var query = new Parse.Query(articles);
            query.find().then((results) => {
                let newArticles = [];
                for (let i = 0; i < results.length; i++){
                    let article = results[i];
                    let newArticle = {
                        id: article.id,
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
                console.log('newArticles in model: ', newArticles);
                return newArticles;
                
            }).catch((error) =>  {
                console.log("error", error);
                return error;
            });
        
        // const articles = storage.get("articles").value();
         return {articles};

        }
        catch(err){
            console.log("error:", err);
        }
        
    }

    static async fetchArticleById(id){
        const article = storage.get("articles").find({id}).value();
        if(!article){
            throw new BadRequestError("Article not found");
        }
        return {article};
    }

}

module.exports = DrainModel;
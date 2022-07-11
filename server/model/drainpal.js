const {storage} = require("../data/storage");
const {BadRequestError} = require("../utils/error");

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
        const articles = storage.get("articles").value();
        return {articles};
    }

    static async fetchArticleById(id){
        // var allArticles = await this.fetchArticles();
        // let newArticles = allArticles.articles;
        // return findArticleById(newArticles, id);
        const article = storage.get("articles").find({id}).value();
        if(!article){
            throw new BadRequestError("Article not found");
        }
        return {article};
    }

}

module.exports = DrainModel;
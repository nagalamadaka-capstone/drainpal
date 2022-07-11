const express = require('express');
const router = express.Router();
const DrainModel = require('../model/drainpal');
const {NotFoundError} = require('../utils/error');

//return array of all articles
router.get('/', async (req, res, next) => {
    try{
        const articles = await DrainModel.fetchArticles();
        res.status(200).json(articles);
    }
    catch (err) {
        next(err)
    }
})

//fetch single article
router.get('/:articleId', async (req, res, next) => {
    try{
        const articleId = req.params.articleId;
        const article = await DrainModel.fetchArticleById(articleId);
        if (!article) {
            throw new NotFoundError('Article not found');
        }
        res.status(200).json({"article": article})
    }
    catch (err){
        next(err);
    }  
})

module.exports = router;
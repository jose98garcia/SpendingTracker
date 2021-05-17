const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//GET 
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

//ADD
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    //console.log(req.body);
    //console.log(req.body.budgetCategories);
    //console.log(req.body.budgetCategories.categoryName);
    await posts.insertOne({
        budgetName: req.body.budgetName,
        budgetTotal: req.body.budgetTotal, 
        budgetCategories: req.body.budgetCategories,
        createdAt: new Date()
    });

    res.status(201).send();
});

//DELETE
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send();
})

async function loadPostsCollection(){
    const client = 
        await mongodb.MongoClient.connect('mongodb+srv://tester:tester1234@stracker.ckqna.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        {useNewUrlParser: true, useUnifiedTopology: true});
        
    return client.db('vue_express').collection('posts');
}

module.exports = router;
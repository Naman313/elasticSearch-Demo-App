const express= require('express');
const bodyParser= require('body-parser');
const cors= require('cors')
const {Client}= require('@elastic/elasticsearch')
const app= express()
app.use(bodyParser.json());
app.use(cors());

// const { Client } = require('@elastic/elasticsearch');
const client = new Client({
  node: 'https://41d69d69390b4f068bc9b3cb1eafe726.us-central1.gcp.cloud.es.io:443',
  auth: {
      apiKey: 'cDd0dkdKUUJhUHZHcG9rWENrSTY6QmpqdjR1Q09TcFdieHUyd3BvZHVEQQ=='
  }
});

(async()=>{
    try{
        const info= await client.info();
        console.log('Elasticsearch connected', info);
    }catch(error){
        console.log('error connection', error);
    }
})()

app.get('/flashcards', async(req, res)=>{
    try{
        const result= await client.search({
            index: 'flashcards',
            query: {match_all:{}},
        })
    const cards= result.hits.hits.map(hit=> hit._source);
    res.json(cards);
    }catch(error){
        console.log('Error fetching flashcards', error);
        res.status(500).send('Error fetching')
    }
});

app.post('/flashcards', async(req, res)=>{
    const {text}= req.body;
    try{
        await client.index({
            index: 'flashcards',
            document: {text},
        });
        res.status(201).send('flashcard added');
    }catch(error){
        console.log('Error fetching ', error);
        res.status(500).send('Error adding flashcard');
    }
})

const PORT= 3001;
app.listen(PORT, ()=>{
    console.log(`Server runninga at http://localhost:${PORT}`)
})


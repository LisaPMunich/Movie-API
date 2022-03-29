const express = require('express');
morgan = require('morgan');
const app = express();

let top10ClimateDocumentaries = [
    {
        title: 'Chasing Ice',
        director: 'Jeff Orlowski'
    },
    {
        title: 'This Changes Everything',
        director: 'Avi Lewis'
    },
    {
        title: 'Merchants Of Doubt',
        director: 'Robert Kenner'
    },
    {
        title: 'A Plastic Ocean',
        director: 'Craig Leeson'
    },
    {
        title: 'Racing Extinction',
        director: 'Louie Psihoyos'
    },
    {
        title: 'Chasing Coral',
        director: 'Jeff Orlowski'
    },
    {
        title: 'Before The Flood',
        director: 'Fisher Stevens'
    },
    {
        title: 'The New Corporation',
        director: 'Jennifer Abbott, Joel Bakan'
    },
    {
        title: 'The 11th Hour',
        director: 'Leila Conners Petersen, Nadia Conners'
    },
    {
        title: 'Seaspiracy',
        director: 'Ali Tabrizi'
    },
]
// LOGGING
app.use(morgan ('common'));

// STATIC FILES
app.use('/', express.static('public'));

// APP ROUTING
app.get('/', (req, res) =>{
    res.send('This is an awesome page about documentaries dealing with climate change. Welcome!');
});

app.get ('/documentaries', (req, res) =>{
    res.json(top10ClimateDocumentaries);
});

// ERROR HANDLING
app.use ((err, req, res, next)=>{
console.log(err.stack);
res.status(500).send('something broke');
});

// LISTEN FOR REQUESTS
app.listen(8080,()=> {
    console.log('Your app is listening on port 8080');
});



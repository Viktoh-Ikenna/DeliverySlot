const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to our awesome API'})
})

app.get('/slots', (req, res) => {
    // slot handler
})

app.post('/slots', (req, res) => {
    // cleate a new slot here
})

app.get('/customer', (req, res) => {
    // slot handler
})

const port = 3200;
app.listen(port, () => {
    console.log('listing on ',port);
})
require('dotenv').config();
const express = require('express');
const routes = require('./routes');

const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);

app.listen( port, () => {
    console.log(`App running on port ${port}`);
})


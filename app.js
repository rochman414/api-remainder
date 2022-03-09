require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const cronJob = require('./controller/CronJob');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');


const app = express();
const port = process.env.PORT;

//swagger 
const options = {
    definition : {
        openapi: "3.0.0",
        info: {
            title: "API Reminder Imani Prima",
            version: "1.0.0",
            description: "This is a API Reminder Imani Prima for Reminder payment"
        },
        servers: [
            {
                url: `http://localhost:${port}`
            }
        ]
    },
    apis: ["./docsApi/*.js"]
}

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
//end swagger


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);

cronJob.cekTanggal();

app.listen( port, () => {
    console.log(`App running on port ${port}`);
})


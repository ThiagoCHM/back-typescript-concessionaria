import "dotenv/config"
import express from "express"
import router from "./routers"
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
}));

app.use(express.json())

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(require('../swagger.json')));

app.get('/swagger.json', (req, res) => {
    res.sendFile(path.join(__dirname, '../swagger.json'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/docs', function (req, res) {
    res.sendFile(path.join(__dirname, 'redoc-static.html'));
});

app.use(router)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
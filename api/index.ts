import express from 'express';
import * as mongoose from 'mongoose';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    try {
        console.log('Подключение к NongoDb');
        await mongoose.connect('mongodb://localhost/links');
        console.log('Подключение к MongoDb');

        app.listen(port, () => {
            console.log(`Подключение к порту: ${port}`);
        });
    } catch (error) {
        console.log('Что-то пошло не так с MongoDb', error);
    }

    process.on('exit', () => {
        console.log('Сервер не подключен к MongoDb');
        mongoose.disconnect().then(() => console.log('Сервер не подключен к MongoDb'))
    });
};

run().catch(console.error);
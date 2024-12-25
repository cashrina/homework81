import express from 'express';
import * as mongoose from 'mongoose';
import linkRouter from './routrs/link';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static('public'));
app.use('/links',linkRouter);

const run = async () => {
    try {
        console.log('Подключение к MongoDb');
        await mongoose.connect('mongodb://localhost/links');
        console.log('Подключение к MongoDb');

        app.listen(port, () => {
            console.log(`http://localhost:${port}`);
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
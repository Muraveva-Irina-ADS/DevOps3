import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

dotenv.config();
const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());
const messageFilePath = path.join(process.cwd(), 'message.txt');
app.post('/api/save', async (req, res) => {
    const { message } = req.body;
    try {
        if (!message) { return res.status(400).json({ error: 'Сообщение не может быть пустым' }); }
        fs.appendFile(messageFilePath, message + '\n', (err) => {
            if (err) {
                console.error("Ошибка при записи в файл:", err);
                return res.status(500).json({ error: 'Ошибка записи в файл', details: err.message });
            }
            console.log("Сообщение записано в файл:", message);
            res.json({ success: true, message: 'Данные сохранены' });
        });
    } catch (err) {
        console.error("Ошибка сервера:", err);
        res.status(500).json({ error: 'Ошибка передачи', details: err.message });
    }
});
app.get('/api/gets', async (req, res) => {
    try {
        console.log("dfvfd")
        fs.readFile(messageFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error("Ошибка при чтении файла:", err);
                return res.status(500).json({ error: 'Ошибка чтения файла', details: err.message });
            }
            console.log(data)
            const messages = data.split('\n').filter(line => line); // Разделяем строки и убираем пустые
            console.log(messages)
            res.json({ messages }); // Отправляем сообщения на фронтенд
        });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка получения данных' });
    }
});
app.get('/', (req, res) => {
    res.send('Backend работает!');
});
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
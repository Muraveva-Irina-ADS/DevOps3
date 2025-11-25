import React, { useState } from 'react';
import { save, get } from './api/Api';


function App() {
    const [inputText, setInputText] = useState('');
    const [getText, setGetText] = useState('');

    const handleSend = async () => {
        try {
            const data = await save(inputText);
            console.log(data)
        }
        catch (e) {
        console.error('Ошибка при взаимодействии с сервером:', e);
        const message = e.response?.data?.error || 'Произошла ошибка';
        alert(message);
        }
    };
    const handleGet = async () => {
        try {
            const data = await get();
            console.log(data)
            setGetText(data.messages)
        }
        catch (e) {
        console.error('Ошибка при взаимодействии с сервером:', e);
        const message = e.response?.data?.error || 'Произошла ошибка';
        alert(message);
        }
    };    

    return (
        <div>
            <h1>Отправка текста на сервер</h1>
            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Введите текст" />
            <button onClick={handleSend}>Отправить</button>
            <h1>Получение текста из сервера (из файла)</h1>
            <input type="text" value={getText} readOnly placeholder="Получить текст" />
            <button onClick={handleGet}>Получить данные из файла</button>
        </div>
    );
}

export default App;
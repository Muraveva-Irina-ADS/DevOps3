import axios from "axios";
const $host = axios.create({
    baseURL: 'http://localhost:5000'
})
export {
    $host
}
export const save = async (message) => {
    const { data } = await $host.post('/api/save', { message });
    return data; // Возвращаем данные от сервера
}
export const get = async () => {
    const { data } = await $host.get('/api/gets');
    return data; // Возвращаем данные от сервера
}
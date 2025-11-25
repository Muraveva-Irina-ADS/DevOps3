#Используем официальный образ Node.js для React-приложения
FROM node:18-alpine

#Устанавливаем рабочую директорию
WORKDIR /app

#Копируем package.json и package-lock.json, чтобы сначала установить зависимости
COPY package*.json ./

#Устанавливаем зависимости
RUN npm install

#Копируем весь проект в контейнер
COPY . .

#Собираем проект для production
RUN npm run build

#Открываем порт для взаимодействия
EXPOSE 3000

#Запускаем простой сервер для раздачи статики
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
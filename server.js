// server.mjs
import { createServer } from 'node:http';

const server = createServer((req, res) => {
    req.url
    switch (req.url) {
        case "/api/filters":
            
            break;
        case "/api/clubs":
        default:
            break;
    }
    res.writeHead(200,{'content-type':"application/json"});
    res.end(`{
        filters: {
            directions: [
                { "id": "volunteer", "label": "Сайн дурын" },
                { "id": "sport", "label": "Спорт" },
                { "id": "art", "label": "Урлаг" },
                { "id": "humanitarian", "label": "Чөлөөт" },
                { "id": "photo", "label": "Фото зураг" },
                { "id": "science", "label": "Шинжлэх ухаан" },
                { "id": "it", "label": "Мэдээллийн технологи" },
                { "id": "language", "label": "Хэл судлал" }
            ]
        }
    }`);


});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`

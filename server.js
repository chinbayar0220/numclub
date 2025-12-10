// server.mjs
import { createServer } from 'node:http';
import { url } from 'node:inspector';


const clubs =[
    {
      "id": 1,
      "name": "Hackum students club",
      "shortName": "Hackum",
      "description": "Мэдээллийн технологийн чиглэлээр үйл ажиллагаа явуулдаг бөгөөд оюутнуудад мэдлэгийг хөгжүүлэх, практик ур чадвар олгох, инновац бүтээхэд чиглэсэн үйл ажиллагаа явуулдаг.",
      "directions": ["it", "science"],
      "school": "its",
      "logo": "images/clubs/hackum.png",
      "members": 65
    },
    {
      "id": 2,
      "name": "BSONK",
      "shortName": "BSONK",
      "description": "BSONK клуб нь бизнес ба стартап сонирхдог оюутнуудад зориулсан уулзалт, хэлэлцүүлэг, pitch event зохион байгуулдаг.",
      "directions": ["volunteer", "science"],
      "school": "bs",
      "logo": "images/clubs/bsonk.png",
      "members": 42
    },
    {
      "id": 3,
      "name": "Google developers club",
      "shortName": "GDSC",
      "description": "Google технологи болон ерөнхий программчлалын чиглэлээр workshop, hackathon, coding challenge зохион байгуулдаг.",
      "directions": ["it"],
      "school": "its",
      "logo": "images/clubs/gdsc.png",
      "members": 80
    },
    {
      "id": 4,
      "name": "Club name",
      "shortName": "Art club",
      "description": "Урлаг, дизайн, илтгэл, контент бүтээх сонирхолтой оюутнуудад зориулсан клуб.",
      "directions": ["art"],
      "school": "shus",
      "logo": "images/clubs/art.png",
      "members": 30
    },
    {
      "id": 5,
      "name": "Club name",
      "shortName": "Sport club",
      "description": "Спортын тэмцээн, дасгал хөдөлгөөн, health lifestyle-ыг дэмждэг клуб.",
      "directions": ["sport"],
      "school": "mtes",
      "logo": "images/clubs/sport.png",
      "members": 55
    },
    {
      "id": 6,
      "name": "Club name",
      "shortName": "Photo club",
      "description": "Фото зураг, видео, медиа контентын чиглэлээр дадлага, аялал, workshop хийдэг.",
      "directions": ["photo", "art"],
      "school": "uts",
      "logo": "images/clubs/photo.png",
      "members": 25
    },
    {
      "id": 7,
      "name": "Club name",
      "shortName": "Language club",
      "description": "Гадаад хэлний ярианы клуб, соёлын солилцоо болон хэлний эвентүүд зохион байгуулдаг.",
      "directions": ["language"],
      "school": "shus",
      "logo": "images/clubs/language.png",
      "members": 40
    },
    {
      "id": 8,
      "name": "Club name",
      "shortName": "Volunteer club",
      "description": "Нийгэмд эерэг нөлөө үзүүлэх сайн дурын үйл ажиллагаа зохион байгуулдаг.",
      "directions": ["volunteer"],
      "school": "bs",
      "logo": "images/clubs/volunteer.png",
      "members": 70
    }
  ];


const loadData = (url) =>{
  return fetch(url)
    .then(res => res.json())
}

const server = createServer((req, res) => { 
  res.setHeader("Access-Control-Allow-Origin", "*");
    switch (req.url) {
        case "/api/filters":
            res.writeHead(200,{"content-type":"application/json"});
            res.end(JSON.stringify({
                filters:{
                    directions:[
                        { id: "volunteer", label: "Сайн дурын" },
                        { id: "sport", label: "Спорт" },
                        { id: "art", label: "Урлаг" },
                        { id: "humanitarian", label: "Чөлөөт" },
                        { id: "photo", label: "Фото зураг" },
                        { id: "science", label: "Шинжлэх ухаан" },
                        { id: "it", label: "Мэдээллийн технологи" },
                        { id: "language", label: "Хэл судлал" }
                    ]
                }
            }))
            break;
        
        case "/api/clubs":
            res.writeHead(200,{"content-type":"application/json"});
            res.end(JSON.stringify({clubs}));
            break;
        default:
            res.writeHead(404,{"content-type":"application/json"})
            res.end(JSON.stringify({message:"Not found"}));
    }
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`

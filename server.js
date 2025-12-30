// server.mjs
import { createServer } from 'node:http';
import { url } from 'node:inspector';


const clubs =[
    {
      "id": 1,
      "cname": "Artemisia",
      "shortName": "Artemisia",
      "description": "\"Artemisia\" клуб нь 2022 оны намар үүсгэн байгуулагдсан бөгөөд байгуулагдсан өдрөөсөө хойш уран зургийн чиглэлээр тасралтгүй үйл ажиллагаагаа амжилттай явуулсаар ирсэн МУИС-д харъяалагдах бие даасан уран зургийн цор ганц клуб билээ. Одоогийн байдлаар \"Artemisia\"  клуб нь 65 идэвхтэй гишүүдтэй. Мөн үйл ажиллагааны хувьд гишүүдийн хооронд мэдлэг мэдээлэл олгох, урлагаар нийгэмшүүлэх, уран зургийн авъяас чадварыг өргөжүүлэхийг гол зорилго, зорилтоо болгон ажилладаг клуб юм.",
      "directions": ["art", "open"],
      "school": "shus",
      "logo": "artemisia.png",
      "members": 65
    },
    {
      "id": 2,
      "cname": "Astrology Club",
      "shortName": "Astrology",
      "description": "Астрологи клуб нь 2022 оны 10-р сараас хойш үйл ажиллагаагаа явуулж эхэлсэн бөгөөд одон орон, зурхайн судлалаар үйл ажиллагаа явуулдаг.",
      "directions": ["volunteer", "science"],
      "school": "shus",
      "logo": "images/clubs/astrology.png",
      "members": 42
    },
    {
      "id": 3,
      "name": "Bilim Club",
      "shortName": "Bilim",
      "description": "МУИС-ийн харьяа казах оюутан залуусийн нэгдэл Билим клуб",
      "directions": ["volunteer", "open"],
      "school": "its",
      "logo": "images/clubs/bilim.png",
      "members": 80
    },
    {
      "id": 4,
      "name": "BSONK Club",
      "shortName": "BSONK",
      "description": "МУИС-Бизнесийн сургуулийн оюутны нэгдэл /БСОНК/ клуб нь оюутан оюутнаа дэмжих цогц төсөл хөтөлбөрүүдийг хэрэгжүүлэх, оюутны хөгжлийг дараагийн түвшинд хүргэх, бие даасан, хариуцлагатай, зөөлөн ур чадвартай оюутнуудыг бэлтгэх зорилгоор байгуулагдсан бөгөөд өдийг хүртэл тасралтгүй үйл ажиллагаа явуулж байна.",
      "directions": ["open"],
      "school": "bs",
      "logo": "images/clubs/bsonk.png",
      "members": 100
    },
    {
      "id": 5,
      "name": "Delta Club",
      "shortName": "Delta",
      "description": "МУИС, ШУС, БУС, Физикийн тэнхимийн харьяа “ДЕЛЬТА- ОНОЛЫН ФИЗИКИЙН КЛУБ” нь их сургуулийн оюутнуудын дунд физикийн шинжлэх ухааныг гүнзгийрүүлэн судлах сонирхлыг нэмэгдүүлэх, физик судлах соёлыг дэлгэрүүлэх сайн дурын нэгдэл.",
      "directions": ["science"],
      "school": "shus",
      "logo": "images/clubs/delta.png",
      "members": 55
    },
    {
      "id": 6,
      "name": "DEVILISH CROCODILE",
      "shortName": "DEVILISH CROCODILE",
      "description": "DEVILISH CROCODILE friendly volunteer club нь олон төрлийн өөрийгөө хөгжүүлэх сургалт, тэмцээн, сэтгэл зүйн эрүүл мэндэд чиглэсэн үйл ажиллагаа, сайн дурын олон талт ажлуудыг зохион байгуулдаг үйл ажиллагаа бүртээ Certificate өгдөг, тодорхойлох захидал бичиж өгдөг, төгсөхөд нь 2 төрлийн дипломтой төгсгөдөг МУИС-ийн анхны клуб юм",
      "directions": ["volunteer", "open"],
      "school": "uts",
      "logo": "images/clubs/photo.png",
      "members": 25
    },
    {
      "id": 7,
      "name": "Ecology Erdem Club",
      "shortName": "EEC",
      "description": "МУИС-ын Биологийн тэнхимийн дэргэдэх Экологи-Эрдэм клуб нь 21 дэх жилдээ үйл ажиллагаагаа явуулж буй 3 удаагийн шилдэг ууган клуб юм.",
      "directions": ["science", "volunteer"],
      "school": "shus",
      "logo": "images/clubs/eec.png",
      "members": 40
    },
    {
      "id": 8,
      "name": "Hackum Students Club",
      "shortName": "Hackum",
      "description": "Мэдээллийн технологийн чиглэлээр үйл ажиллагаа явуулдаг бөгөөд оюутнуудад мэдлэгийг хөгжүүлэх, практик ур чадвар олгох, инновац бүтээхэд чиглэсэн үйл ажиллагаа явуулдаг.",
      "directions": ["it", "science", "open"],
      "school": "mtes",
      "logo": "images/clubs/hackum.png",
      "members": 70
    },
    {
      "id": 9,
      "name": "INFINITY",
      "shortName": "INFINITY",
      "description": "сайн дурын үндсэн дээр муисийн оюутан залуусын чөлөөт цагийг зөв боловсон өнгрүүлэхэд орчин, үйл ажиллагаа хийх боломжийг бүрдүүлэн, оюутнуудын дунд спорт, урлаг, соёлын арга хэмжээг зохион байгуулж, нийгэмд эерэг өөрчлөлт авчрах үйлсэд хувь нэмрээ оруулан ажилладаг клуб юм.",
      "directions": ["volunteer", "open"],
      "school": "shus",
      "logo": "images/clubs/infinity.png",
      "members": 120
    }
  ];




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
                        { id: "open", label: "Чөлөөт" },
                        { id: "photo", label: "Фото зураг" },
                        { id: "science", label: "Шинжлэх ухаан" },
                        { id: "it", label: "Мэдээллийн технологи" },
                        { id: "language", label: "Хэл судлал" }
                    ],
                    schools:[
                      { "id": "bs", "label": "БС" },
                      { "id": "its", "label": "ИТС" },
                      { "id": "mtes", "label": "МТЭС" },
                      { "id": "uts", "label": "УТСОХУС" },
                      { "id": "khs", "label": "ХЗС" },
                      { "id": "shus", "label": "ШУС" }
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

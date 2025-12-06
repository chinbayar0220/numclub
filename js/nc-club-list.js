const loadData=(url)=>{
    fetch(url).then  
    //get download 
    //ene componentiig urlaar data avaad const ashiglaj componentiig zurna
}
const DATA = {
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
    ],
    schools: [
      { "id": "bs", "label": "БС" },
      { "id": "its", "label": "ИТС" },
      { "id": "mtes", "label": "МТЭС" },
      { "id": "uts", "label": "УТСОХУС" },
      { "id": "khs", "label": "ХЗС" },
      { "id": "shus", "label": "ШУС" }
    ]
  },

  clubs: [
    {
      id: 1,
      name: "Hackum students club",
      shortName: "Hackum",
      description: "Мэдээллийн технологийн чиглэлээр үйл ажиллагаа явуулдаг бөгөөд оюутнуудад мэдлэгийг хөгжүүлэх, практик ур чадвар олгох, инновац бүтээхэд чиглэсэн үйл ажиллагаа явуулдаг.",
      directions: ["it", "science"],
      school: "its",
      logo: "images/clubs/hackum.png",
      members: 65
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
  ]
};

class NcClubList extends HTMLElement {
    constructor() {
        super();
    this.clubs = DATA.clubs;
    this.filters = null;
        
    }

    connectedCallback() {
        this.render();
    }

    filter(filters){
        this.filters=filters;
        this.render();
    }

    render(){
        let clubsToShow = this.clubs;
        const activeDirection = [];

        if(this.filters){
            this.filters.directions.forEach((checked,id) => {
                if(checked){
                    activeDirection.push(id);
                }
            });
        }
        if(activeDirection.length>0){
            clubsToShow = this.clubs.filter(club=>{
                const matchDir = club.directions.some(d => activeDirection.includes(d));
                return matchDir;
            });
        }
        this.innerHTML=`<h1>hiii HI<h1> <ul>
      ${clubsToShow.map(c => `<li>${c.shortName}</li>`).join("")}
    </ul>`;
    }
    }

window.customElements.define('nc-club-list', NcClubList);
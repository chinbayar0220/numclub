import { getClubs} from "./apiclient.js";

// const loadData=(url)=>{
//     return fetch(url).then(res=>res.json())
//     //get download 
//     //ene componentiig urlaar data avaad const ashiglaj componentiig zurna
// }

class NcClubList extends HTMLElement {
    constructor() {
        super();
    this.clubs = [];
    this.filters = null;
    }

    async connectedCallback(){
        const neg = await getClubs();
        this.clubs = neg.data;
        this.render();
        // this.clubs = loadData("http://127.0.0.1:3000/api/clubs")
        //   .then(data=>{
        //     console.log("server data:",data);
        //     this.clubs = data.clubs;
        //     this.render();
        //   })
    }

    filter(filters){
        this.filters=filters;
        this.render();
    }

    render(){
        let clubsToShow = this.clubs;
        const activeDirection = [];
        const activeSchools =[];

        if(this.filters){
            this.filters.directions.forEach((checked,id) => {
                if(checked){
                    activeDirection.push(id);
                }
            });
            this.filters.surguuli.forEach((checked, id) => {
                if (checked) activeSchools.push(id);
            });
        }
        if(activeDirection.length>0){
            clubsToShow = this.clubs.filter(club=>{
                const matchDir = club.directions.some(d => activeDirection.includes(d));
                return matchDir;
            });
        }
        if(activeSchools.length>0){
            clubsToShow = this.clubs.filter(club=>{
                const matchSchool = activeSchools.includes(club.school)
                return matchSchool;
            });
        }
        this.innerHTML=`<h1>hiii HI<h1> <ul>
      ${clubsToShow.map(c => `<li>${c.shortName}</li>`).join("")}
    </ul>`;
    }
    }

window.customElements.define('nc-club-list', NcClubList);
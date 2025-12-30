import { getFilters } from "./apiclient.js";
class NcClubFilter extends HTMLElement {
    constructor() {
        super();
        this.filters={directions:new Map(), surguuli:new Map()};
    }

    async connectedCallback() {
        const result  = await getFilters();
        const filters = (result && result.data && result.data && result.data.filters)
            ? result.data.filters :{directions : [], schools: []};
        const directionsHtml = filters.directions
            .map((f) => `<nc-form id="${f.id}" label="${f.label}"></nc-form>`)
            .join("");
        const schoolsHtml = filters.schools
            .map((f) => `<nc-form id="${f.id}" label="${f.label}"></nc-form>`)
            .join("");
        this.innerHTML = `
                <div class="sidebar">
                    <h2>Клуб ангилах</h2>
                    <form class="directions">
                        <h4>Чиглэл</h4>
                        ${directionsHtml}
                    </form>
                    <form class="schools">
                        <h4>Сургууль</h4>
                        ${schoolsHtml}
                    </form>
                </div>`;
        this.querySelectorAll('form[class="directions"] nc-form').forEach( fe => {

            fe.addEventListener("change", ev=>{

                const id = fe.getAttribute("id");
                const checked = ev.target.checked;
                this.filters.directions.set(id, checked);

                //darsan elemtiin value ig avaad

                //herev checklegdej baival this.filters.chiglel.set(id, true)

                //uncheck bol this.filters.chiglel.set(id, false)
                
                this.inform();
            }); 
        });

        this.querySelectorAll('form[class="schools"] nc-form').forEach( fe => {

            fe.addEventListener("change", ev=>{

                const id = fe.getAttribute("id");
                const checked = ev.target.checked;
                this.filters.surguuli.set(id,checked)
                //darsan elemtiin value ig avaad
                //herev checklegdej baival this.filters.chig
                this.inform();
            }); 
        });


    }

    inform(){
        const list = document.querySelector("nc-clubs-list");
        if (list && typeof list.filter === "function") {
            list.filter(this.filters);
        }
    }
    disconnectedCallback() {

    }

    attributeChangedCallback(name, oldVal, newVal) {

    }

    adoptedCallback() {

    }

}

window.customElements.define('nc-club-filter', NcClubFilter);

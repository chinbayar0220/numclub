class NcClubFilter extends HTMLElement {
    constructor() {
        super();
        this.filters={directions:new Map(), surguuli:new Map()};
    }

    connectedCallback() {
        this.innerHTML = `
                <div class="sidebar">
                    <h2>Клубийн чиглэл</h2>
                    <form class="directions">
                        <h4>Чөлөөт</h4>
                        <nc-form id="volunteer" label="Сайн дурын"></nc-form>
                        <nc-form id="sport" label="Спорт"></nc-form>
                        <nc-form id="art" label="Урлаг"></nc-form>
                        <nc-form id="humanitarian" label="Чөлөөт"></nc-form>
                        <nc-form id="photo" label="Фото зураг"></nc-form>
                        <nc-form id="science" label="Шинжлэх ухаан"></nc-form>
                        <nc-form id="it" label="Мэдээллийн технологи"></nc-form>
                        <nc-form id="language" label="Хэл судлал"></nc-form>
                    </form>
                    <form class="schools">
                        <h4>Сургууль</h4>
                        <nc-form id="bs" name="business" label="БС"></nc-form>
                        <nc-form id="its" name="its" label="ИТС"></nc-form>
                        <nc-form id="mtes" name="mtes" label="МТЭС"></nc-form>
                        <nc-form id="uts" name="olonuls" label="УТСОУХНУС"></nc-form>
                        <nc-form id="khs" name="huuli" label="ХЗС"></nc-form>
                        <nc-form id="shus" name="shus" label="ШУС"></nc-form>
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

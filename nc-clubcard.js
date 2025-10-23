class NcClubcard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const clubname = this.getAttribute('cname') || '-';
        this.innerHTML=`
        <article class="a_club">
                    <div class="club_header">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDsCK1U_HGMYYAFqOOPaqu71kFkUg9ywSSGQ&amp;s" class="sFlh5c FyHeAf" alt="Hackum Students Club" jsname="JuXqh" style="max-width: 1292px; width: 100px; height: 100px; margin: 0px;" data-ilt="1759989884696">
                        <h2>${clubname}</h2>
                    </div>
                    <p>Мэдээллийн технологийн чиглэлээр үйл ажиллагаа явуулдаг бөгөөд оюутнуудын мэдлэгийг дээшлүүлэх, практик ур чадвар олгох, инновац бүтээхэд чиглэсэн үйл ажиллагаа явуулдаг</p>
                    <div>
                        <button>Элсэх</button>
                        <button>Дэлгэрэнгүй</button>
                    </div>
                </article>`;
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
    }

}

window.customElements.define('nc-clubcard', NcClubcard);
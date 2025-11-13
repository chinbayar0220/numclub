class NcClubcard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const clubname = this.getAttribute('cname') || 'Club name';
        this.innerHTML=`
        <article class="club_card">
                    <div class="club_header">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDsCK1U_HGMYYAFqOOPaqu71kFkUg9ywSSGQ&amp;s" class="sFlh5c FyHeAf" alt="Hackum Students Club" jsname="JuXqh" style="max-width: 1292px; width: 58px; height: 58px; margin: 0px;" data-ilt="1759989884696">
                        <h3>${clubname}</h3>
                    </div>
                    <p>Мэдээллийн технологийн чиглэлээр үйл ажиллагаа явуулдаг бөгөөд оюутнуудын мэдлэгийг дээшлүүлэх, практик ур чадвар олгох, инновац бүтээхэд чиглэсэн үйл ажиллагаа явуулдаг</p>
                    <div class="club_buttons">
                        <button class="login">Элсэх</button>
                        <button class="signup">Дэлгэрэнгүй</button>
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
class NcClubcard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const clubname = this.getAttribute('cname') || 'Club name';
        const description = this.getAttribute('desc') || 'Мэдээллийн технологийн чиглэлээр үйл ажиллагаа явуулдаг бөгөөд оюутнуудын мэдлэгийг дээшлүүлэх, практик ур чадвар олгох, инновац бүтээхэд чиглэсэн үйл ажиллагаа явуулдаг';
        const button1 = this.getAttribute('btn1') || 'Элсэх';
        const button2 = this.getAttribute('btn2') || 'Дэлгэрэнгүй';
        const imgSrc = this.getAttribute('img') || this.getAttribute('logo') || 'images/event.png';
        const imgAlt = this.getAttribute('img-alt') || clubname;
        const clubId = this.getAttribute('club-id') || this.getAttribute('data-index') || '1';

        this.innerHTML=`
        <article class="club_card">
            <div class="club_name">
                <img src="${imgSrc}" alt="${imgAlt}" class="club-card-img" style="width:58px;height:58px;object-fit:cover;border:1px solid var(--color-gray);box-shadow:0px 4px 16px rgba(0,0,0,0.06);">
                <h3>${clubname}</h3>
            </div>
            <p class="desc">${description}</p>
            <div class="buttons">
                <button class="btn1">${button1}</button>
                <button class="btn2" data-club-id="${clubId}">Дэлгэрэнгүй</button>
            </div>
        </article>`;
        
        const btn2 = this.querySelector('.btn2');
        if (btn2) {
            btn2.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn2.getAttribute('data-club-id');
                if (window.Router) {
                    window.Router.navigate(`/club/${id}`);
                } else {
                    window.location.hash = `#/club/${id}`;
                }
            });
        }
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
    }

}

window.customElements.define('nc-clubcard', NcClubcard);
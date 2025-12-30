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

        this.innerHTML = `
        <article class="club_card">
            <div class="club_name">
                <img src="${imgSrc}" alt="${imgAlt}" class="club-card-img" style="width:58px;height:58px;object-fit:cover;border:1px solid var(--color-gray);box-shadow:0px 4px 16px rgba(0,0,0,0.06);cursor:pointer;">
                <h3>${clubname}</h3>
            </div>
            <p class="desc">${description}</p>
            <div class="buttons">
                <button class="btn1" data-club-id="${clubId}">${button1}</button>
                <button class="btn2" data-club-id="${clubId}">${button2}</button>
            </div>
        </article>`;
        
        // Image click handler - navigate to club profile
        const img = this.querySelector('.club-card-img');
        if (img) {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                try {
                    const clubInfo = {
                        id: clubId,
                        name: clubname,
                        logo: imgSrc,
                        description: description
                    };
                    localStorage.setItem('current_club_data', JSON.stringify(clubInfo));
                } catch (err) {
                    console.error('Failed to store club data:', err);
                }
                
                if (window.Router) {
                    window.Router.navigate(`/club/${clubId}`);
                } else {
                    window.location.hash = `#/club/${clubId}`;
                }
            });
        }
        
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

        // btn1: go to registration page and store selected club id and name
        const btn1 = this.querySelector('.btn1');
        if (btn1) {
            btn1.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn1.getAttribute('data-club-id') || clubId || this.getAttribute('data-index') || '1';
                try { 
                    localStorage.setItem('register_club_id', id);
                    localStorage.setItem('register_club_name', clubname);
                } catch (err) {}
                if (window.Router) {
                    window.Router.navigate('/registration');
                } else {
                    window.location.hash = '#/registration';
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
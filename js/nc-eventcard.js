class ncEventcard extends HTMLElement {
    constructor() {
        super();
        this._actionsBound = false;
    }

    connectedCallback() {
        const eventname = this.getAttribute('ename') || 'Эвентийн нэр';
        const datetime = this.getAttribute('date') || '2025.10.01 19:00';
        const descriptionAttr = this.getAttribute('desc');
        const description = descriptionAttr === null
            ? 'Эвентийн тухай мэдээллийг дэлгэрэнгүйгээр тайлбарлаж өгч болно.'
            : descriptionAttr;
        const priceAttr = this.getAttribute('price');
        const price = priceAttr === null ? '₮10,000' : priceAttr;
        const button1 = this.getAttribute('btn1');
        const button2 = this.getAttribute('btn2') || 'Дэлгэрэнгүй';
        const clubNameAttr = this.getAttribute('club-name');
        const clubName = clubNameAttr === null ? '' : clubNameAttr;
        const clubLogo = this.getAttribute('club-logo') || 'images/club_logo.svg';
        const eventImage = this.getAttribute('event-image') || 'images/event.png';
        const hasRegister = button1 !== null && button1 !== '';
        const buttonRowClass = hasRegister ? 'buttons' : 'buttons single';
        this.innerHTML=`
        <div class="event_card">
            <img src="${eventImage}" width=flex alt="Event Image"/>
            <div class="club_name">
                <img src="${clubLogo}" width="24" height="24" alt="Club Icon"/>
                <h4>${clubName}</h4>
            </div>
            <h2>${eventname}</h2>
            <p>${datetime}</p>
            <aside class="line">
                <p class="desc">${description}</p>
            </aside>
            <h4>${price}</h4>
            <div class="${buttonRowClass}">
            ${hasRegister ? `<button class="btn1" data-action="register">${button1}</button>` : ``}
            <button class="btn2" data-action="details">${button2}</button>
            </div>
        </div>`;
        this.bindButtonActions();
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
    }

    bindButtonActions() {
        if (this._actionsBound) return;
        this._actionsBound = true;
        this.addEventListener('click', (event) => {
            const actionButton = event.target.closest('button[data-action]');
            if (!actionButton) return;
            const eventId = this.getAttribute('data-event-id');
            if (!eventId) return;
            const action = actionButton.getAttribute('data-action');
            const path = action === 'register'
                ? `/event/${eventId}/register`
                : `/event/${eventId}`;
            if (window.Router && typeof window.Router.navigate === 'function') {
                window.Router.navigate(path);
            } else {
                window.location.hash = path;
            }
        });
    }

    set button1(val) {
      if (val) this.setAttribute('button1', '');
      else this.removeAttribute('button1');
    }
    get button1() {
      return this.hasAttribute('button1');
    }

}

window.customElements.define('nc-eventcard', ncEventcard);

class ncEventcard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const eventname = this.getAttribute('ename') || 'Event name';
        const datetime = this.getAttribute('date') || '2025.10.01 19:00';
        const description = this.getAttribute('desc') || 'Эвентийн тухай мэдээллийг дэлгэрэнгүйгээр тайлбарлаж өгч болно';
        const price = this.getAttribute('price') || '₮10,000';
        const button1 = this.getAttribute('btn1');
        const button2 = this.getAttribute('btn2') || 'Дэлгэрэнгүй';
        this.innerHTML=`
        <div class="event_card">
            <img src="images/event.png" width=flex alt="Event Image"/>
            <div class="club2">
                <img src="images/club_logo.svg" width="24" height="24" alt="Club Icon"/>
                <h4>Hackum students club</h4>
            </div>
            <h2>${eventname}</h2>
            <p>${datetime}</p>
            <aside class="line">
                <p class="des">${description}</p>
            </aside>
            <h4>${price}</h4>
            <div class="btn1">${ button1!=null?`<button class="login">${button1}</button>`:``}    
            <button class="btn2">${button2}</button>
            </div>
        </div>`;
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
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
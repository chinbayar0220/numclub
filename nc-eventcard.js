class ncEventcard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const eventname = this.getAttribute('ename') || '-';
        this.innerHTML=`
        <div class="event_card">
            <img src="images/event.png" width=flex alt="Event Image"/>
            <div class="club2">
                <img src="images/club_logo.svg" width="24" height="24" alt="Club Icon"/>
                <h4>Hackum students club</h4>
            </div>
            <h2>Эвентийн нэр</h2>
            <div>
                <p>2025.10.01 19:00</p>
                <p>7th building</p>
            </div>
            <aside class="line">
                <p class="des">Эвентийн тухай мэдээллийг дэлгэрэнгүйгээр тайлбарлаж өгч болно</p>
            </aside>
            <h4>₮10,000</h4>
            <div class="buttons">
                <button type="button">Цуцлах</button>
                <button type="button">Дэлгэрэнгүй</button>
            </div>
        </div>`;
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
    }

}

window.customElements.define('nc-eventcard', ncEventcard);
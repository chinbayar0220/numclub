class ClbEventCard extends HTMLElement {
    constructor() {
        super();

    }

    connectedCallback() {
        const eventname=this.getAttribute("en") || "-";
        this.innerHTML=`
        <arcticle class="event-card">
                <div class="event-image">🎵</div>
                <div class="event-content">
                    <h3>${eventname}</h3>
                    <p>2025-11-15</p>
                </div>
        </arcticle>`;
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
    }

}

window.customElements.define('clb-event-card', ClbEventCard);
class NcCeventCard extends HTMLElement {
    constructor() {
        super();
        
    }

    connectedCallback() {
        this.innerHTML = `<article class="event-card">
                    <img src="images/event.png" alt="">
                    <header>
                        <label><img src="images/club_logo.svg" alt=""><h4>Hackumx student club</h4></label>
                    </header>
                    <p>Эвентийн нэр</p>
                    <p>2025.10.23 18.40</p>
                    <p>Эвентийн тухай мэдээллийг дэлгэрэнгүйгээр тавьж өгч болно.</p>
                    <p>$1000</p>
                    <button>Дэлгэрэнгүй</button>
                </article>`
        
    }

    disconnectedCallback() {
        
    }

    attributeChangedCallback(name, oldVal, newVal) {
        
    }

    adoptedCallback() {
        
    }

}

window.customElements.define('nc-cevent-card', NcCeventCard);
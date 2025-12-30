class ClbEventCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const eventname = this.getAttribute("en") || "-";

        this.innerHTML = `
        <style>
            :host {
                display: block;
            }
            .card {
                min-width: 300px;
                height: 300px;
                background-color: var(--color-white, #fff);
                border: 1px solid #ccc;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                font-size: 16px;
                margin-right: 10px;
                border-radius: 10px;
                padding: 15px;
                box-sizing: border-box;
            }
            .card img {
                width: 100%;
                height: 150px;
                object-fit: cover;
                border-radius: 10px;
            }
            .card header {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-top: 10px;
            }
            .card header h4 {
                margin: 0;
                font-size: 18px;
            }
            .card p {
                margin: 5px 0;
                font-size: 14px;
                text-align: center;
            }
            .card button {
                margin-top: 10px;
                padding: 8px 16px;
                border: none;
                background-color: #667eea;
                color: white;
                border-radius: 5px;
                cursor: pointer;
            }
        </style>

        <article class="card">
            <img src="images/EventW.png" alt="">
            <header>
                <img src="images/club_logo.svg" alt="" width="30" height="30">
                <h4>Hackumx student club</h4>
            </header>
            <p>${eventname}</p>
            <p>2025.10.23 18.40</p>
            <p>Эвентийн тухай мэдээллийг дэлгэрэнгүйгээр тавьж өгч болно.</p>
            <p>$1000</p>
            <button>Дэлгэрэнгүй</button>
        </article>
        `;
    }

    disconnectedCallback() {}

    attributeChangedCallback(name, oldVal, newVal) {}

    adoptedCallback() {}
}

window.customElements.define('clb-event-card', ClbEventCard);



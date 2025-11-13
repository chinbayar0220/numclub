class NcEvent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const image = this.getAttribute('img') || 'images/event.png';
        const logo = this.getAttribute('logo') || 'images/club_logo.svg';
        const club = this.getAttribute('club') || 'Hackum students club';
        const title = this.getAttribute('title') || 'Эвентийн нэр';
        const date = this.getAttribute('date') || '2025.10.23 18:40';
        const tailbar = this.getAttribute('desc') || 'Эвентийн тухай мэдээллийг дэлгэрэнгүйгээр тавьж өгч болно.';
        const price = this.getAttribute('price') || '₮10,000';
        const more = this.getAttribute('more') || 'delgerngui';

        this.innerHTML = `
                 <article>
                    <img src=${image} alt="">
                    <header>
                        <label><img src=${logo} alt=""><h4>${club}</h4></label>
                    </header>
                    <p>${title}</p>
                    <p>${date}</p>
                    <p>${tailbar}</p>
                    <p>${price}</p>
                    <button>${more}</button>
                </article>
                `;

    }


}

window.customElements.define('nc-event', NcEvent);
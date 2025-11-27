class NcClubRequestCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const clubname = this.getAttribute('cname') || 'Club name';
        const button1 = this.getAttribute('btn1') || 'Элсэх';
        const button2 = this.getAttribute('btn2') || 'Дэлгэрэнгүй';
        const description = this.getAttribute('desc') || 'Таны элсэх хүсэлтийг хүлээж авсан байна.';
        this.innerHTML=`
        <article class="request_card">
                    <div class="club_header">
                        <img src="images/club_logo.svg" width="58" height="58" alt="Club Icon"/>
                        <h3>${clubname}</h3>
                    </div>
                    <p class="desc">${description}</p>
                    <button class="btn2">${button2}</button>
                </article>`;
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
    }

}
window.customElements.define('nc-clubrequestcard', NcClubRequestCard);
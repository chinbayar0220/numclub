class NcClubRequestCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const clubname = this.getAttribute('cname') || 'Club name';
        this.innerHTML=`
        <article class="club_requests">
                    <div class="club_header">
                        <img src="images/club_logo.svg" width="58" height="58" alt="Club Icon"/>
                        <h3>Hackum students club</h3>
                    </div>
                    <h5>Таны элсэх хүсэлтийг хүлээж авсан байна.</h5>
                    <button>Дэлгэрэнгүй</button>
                </article>`;
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
    }

}

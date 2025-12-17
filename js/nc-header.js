class NcHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 32px 100px;
                    background: var(--header-bg, #fff);
                    border-bottom: 1px solid var(--border-color, #e5e7eb);
                }
                .logo {
                    text-decoration: none;
                }
                .logo img {
                    display: block;
                }
                @media (max-width: 1024px) {
                    header {
                        padding: 24px 32px;
                    }
                }
                @media (max-width: 640px) {
                    header {
                        padding: 16px 24px;
                    }
                }
            </style>
            <header>
                <a class="logo" href="/" data-navigate="/"><img src="images/Club.svg" width="57.75" height="24" alt="NUM.Club Logo"/></a>
                <nc-navbar></nc-navbar>
            </header>
        `;
    }
}

customElements.define('nc-header', NcHeader);

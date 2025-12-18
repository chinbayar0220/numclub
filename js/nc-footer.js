class NcFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                footer {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    padding: 32px 40px;
                    background: var(--footer-bg, #f9fafb);
                    border-top: 1px solid var(--border-color, #e5e7eb);
                    margin-top: auto;
                }
                footer img {
                    display: block;
                }
                footer p {
                    margin: 0;
                    font-size: 14px;
                    color: var(--text-secondary, #6b7280);
                }
            </style>
            <footer>
                <img src="images/Club.svg" width="57.75" height="24" alt="NUM.Club Logo"/>
                <p>Холбогдох дугаар: +976 9999 9999</p>
            </footer>
        `;
    }
}

customElements.define('nc-footer', NcFooter);

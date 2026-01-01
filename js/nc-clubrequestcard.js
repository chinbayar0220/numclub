class NcClubRequestCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const clubName = this.getAttribute('cname') || 'Клубын нэр';
        const logo = this.getAttribute('logo') || 'images/club_logo.svg';
        const status = (this.getAttribute('status') || 'pending').toLowerCase();
        const description = this.getAttribute('desc');

        const statusLabels = {
            pending: 'Хүлээгдэж байна',
            approved: 'Зөвшөөрсөн',
            rejected: 'Татгалзсан'
        };

        const defaultDescriptions = {
            pending: 'Таны элсэх хүсэлт хүлээгдэж байна.',
            approved: 'Таны элсэх хүсэлт зөвшөөрөгдсөн байна.',
            rejected: 'Таны элсэх хүсэлт татгалзсан байна.'
        };

        const statusText = statusLabels[status] || status;
        const bodyText = description || defaultDescriptions[status] || 'Таны хүсэлт илгээгдсэн.';

        this.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .request_card {
                    border: 1px solid var(--border-color, #e5e7eb);
                    border-radius: 12px;
                    padding: 20px;
                    background: var(--color-white, #fff);
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
                }
                .club_header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .club_header img {
                    width: 58px;
                    height: 58px;
                    border-radius: 12px;
                    object-fit: cover;
                    border: 1px solid var(--border-color, #e5e7eb);
                }
                .club_title {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .club_title h3 {
                    margin: 0;
                    font-size: 18px;
                }
                .status {
                    display: inline-flex;
                    align-items: center;
                    padding: 4px 8px;
                    border-radius: 999px;
                    font-size: 12px;
                    font-weight: 600;
                    background: #f3f4f6;
                    color: #374151;
                    width: fit-content;
                }
                .status.approved {
                    background: #e8f7ee;
                    color: #107d4e;
                }
                .status.rejected {
                    background: #fdecec;
                    color: #b42318;
                }
                .desc {
                    margin: 0;
                    color: var(--text-secondary, #6b7280);
                    font-size: 14px;
                    line-height: 1.5;
                }
            </style>
            <article class="request_card">
                <div class="club_header">
                    <img src="${logo}" alt="${clubName}">
                    <div class="club_title">
                        <h3>${clubName}</h3>
                        <span class="status ${status}">${statusText}</span>
                    </div>
                </div>
                <p class="desc">${bodyText}</p>
            </article>
        `;
    }
}

window.customElements.define('nc-clubrequestcard', NcClubRequestCard);

class NcClubsSidebar extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        await this.loadAndRender();
    }

    async loadAndRender() {
        // Fetch filters from JSON
        let filters = { directions: [], schools: [] };
        try {
            const response = await fetch('/json/Club.json');
            if (response.ok) {
                const data = await response.json();
                filters = data.filters || filters;
            }
        } catch (error) {
            console.error('Failed to load filters:', error);
        }

        this.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 20%;
                }
                .sidebar {
                    display: flex;
                    flex-direction: column;
                    padding: 8px 28px 28px 28px;
                    gap: 0px;
                    height: fit-content;
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    background-color: var(--card-bg);
                }
                .sidebar h2 {
                    color: var(--text-primary);
                    font-size: 16px;
                    margin-bottom: 16px;
                }
                .sidebar h4 {
                    color: var(--text-primary);
                    font-size: 16px;
                    font-weight: 400;
                    margin-top: 16px;
                    margin-bottom: 8px;
                }
                .sidebar input[type="checkbox"] {
                    margin: 8px 8px 8px 0px;
                    cursor: pointer;
                    accent-color: var(--color-default);
                    width: 16px;
                    height: 16px;
                }
                .sidebar input[type="checkbox"]:checked {
                    accent-color: var(--color-default);
                }
                .sidebar input[type="checkbox"] + label {
                    cursor: pointer;
                    user-select: none;
                    color: var(--text-primary);
                }
                .sidebar input[type="checkbox"]:checked + label {
                    color: var(--color-default);
                    font-weight: 500;
                }
                
                @media (max-width: 768px) {
                    :host {
                        width: 100%;
                    }
                }
            </style>

            <div class="sidebar">
                <h2>Клубийн чиглэл</h2>
                <form class="chiglel">
                    <h4>Чөлөөт</h4>
                    ${filters.directions.map(dir => 
                        `<nc-form id="${dir.id}" name="${dir.id}" label="${dir.label}"></nc-form>`
                    ).join('')}
                </form>
                <form class="surguuli">
                    <h4>Сургууль</h4>
                    ${filters.schools.map(school => 
                        `<nc-form id="${school.id}" name="${school.id}" label="${school.label}"></nc-form>`
                    ).join('')}
                </form>
            </div>
        `;
    }
}

window.customElements.define('nc-clubs-sidebar', NcClubsSidebar);

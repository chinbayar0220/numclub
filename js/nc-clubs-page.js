class NcClubsPage extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .main {
                    display: flex;
                    flex-direction: row;
                    padding: 28px 90px;
                    gap: 10%;
                }
                nc-club-filter {
                    display: block;
                    width: 17%;
                }
                .sidebar {
                    display: flex;
                    flex-direction: column;
                    padding: 8px 28px 28px 28px;
                    gap: 0px;
                    height: fit-content;
                    border: 1px solid #d3d3d3;
                    border-radius: 8px;
                    width: 17%;
                }
                nc-club-filter .sidebar {
                    width: 100%;
                }
                .sidebar input[type="checkbox"] {
                    margin: 8px 8px 8px 0px;
                    cursor: pointer;
                    accent-color: #2c2c2c;
                    width: 16px;
                    height: 16px;
                }
                .sidebar input[type="checkbox"]:checked {
                    accent-color: #2c2c2c;
                }
                .sidebar input[type="checkbox"] + label {
                    cursor: pointer;
                    user-select: none;
                }
                .sidebar input[type="checkbox"]:checked + label {
                    color: var(--color-default);
                    font-weight: 500;
                }
                .content {
                    display: flex;
                    flex-direction: column;
                    gap: 28px;
                    width: 75%;
                }
                
                @media (max-width: 768px) {
                    .main {
                        flex-direction: column;
                        padding: 20px;
                    }
                    .content {
                        width: 100%;
                    }
                }
                .search {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 16px;
                    width: 100%;
                    height: fit-content;
                }
                .search form {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 12px;
                    width: 100%;
                }
                .search input[type="search"] {
                    padding: 10px 16px;
                    border: 1px solid var(--border-color);
                    border-radius: 20px;
                    width: 320px;
                    height: 40px;
                    font-size: medium;
                    max-width: 100%;
                    background-color: var(--card-bg);
                    color: var(--text-primary);
                }
                .search button[type="submit"] {
                    padding: 10px 20px;
                    background-color: #2c2c2c;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                }
                .search button[type="submit"]:hover {
                    background-color: #3a3a3a;
                }
                .clubs {
                    display: grid;
                    grid-template-rows: auto auto auto;
                    grid-template-columns: auto auto auto;
                    gap: 28px;
                    margin: auto;
                }
                .pagination {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 12px;
                    padding: 32px 16px;
                }
                .pagination-previous,
                .pagination-next {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 12px;
                    height: fit-content;
                    border-radius: 8px;
                    background-color: var(--card-bg);
                    color: var(--text-primary);
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    user-select: none;
                }
                .pagination-previous:hover,
                .pagination-next:hover {
                    background-color: var(--bg-secondary);
                }
                .pagination-previous img,
                .pagination-next img {
                    width: 16px;
                    height: 12px;
                    filter: var(--img-filter, none);
                }
                .pagination-list {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .pagination-page,
                .element-wrapper {
                    min-width: 24px;
                    min-height: 24px;
                    height: fit-content;
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    background-color: var(--card-bg);
                    color: var(--text-primary);
                    font-size: 14px;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    padding: 4px 8px;
                }
                .pagination-page {
                    background-color: var(--color-default);
                    color: var(--color-white);
                    border-color: var(--color-default);
                }
                .element-wrapper:hover {
                    background-color: var(--bg-secondary);
                }
                .pagination-gap {
                    padding: 0 4px;
                    color: var(--text-secondary);
                    font-size: 14px;
                    user-select: none;
                }
            </style>

            <div class="main">
                <nc-club-filter></nc-club-filter>

                <div class="content">
                    <div class="search">
                        <form action="#" method="get">
                            <input type="search" placeholder="Хайх" name="search">
                            <button type="submit">Хайх</button>
                        </form>
                    </div>

                    <nc-clubs-list id="clubs"></nc-clubs-list>

                    <div class="pagination">
                        <div class="pagination-previous">
                            <img src="images/Arrow Left.svg" alt="Previous" />
                            <span>Өмнөх</span>
                        </div>
                        <div class="pagination-list">
                            <div class="pagination-page">1</div>
                            <div class="element-wrapper">2</div>
                            <div class="element-wrapper">3</div>
                            <div class="pagination-gap">...</div>
                            <div class="element-wrapper">10</div>
                        </div>
                        <div class="pagination-next">
                            <span>Дараах</span>
                            <img src="images/Arrow Right.svg" alt="Next" />
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

window.customElements.define('nc-clubs-page', NcClubsPage);

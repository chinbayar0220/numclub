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
                    gap: 5%;
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
                    justify-content: space-between;
                    gap: 12px;
                    width: 100%;
                }
                .search input[type="search"] {
                    padding: 10px 16px;
                    border: 1px solid #d3d3d3;
                    border-radius: 20px;
                    width: 320px;
                    height: 40px;
                    font-size: medium;
                    max-width: 100%;
                }
                .radioff {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                    margin-left: 16px;
                }
                .radio {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .radio input[type="radio"] {
                    position: absolute;
                    opacity: 0;
                    width: 0;
                    height: 0;
                }
                .radio label {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 12px;
                    border: 1px solid var(--color-secondary);
                    border-radius: 8px;
                    cursor: pointer;
                    background: var(--color-white);
                    color: var(--color-secondary);
                    user-select: none;
                }
                .radio input[type="radio"]:checked + label {
                    background: var(--color-default);
                    color: #ffffff;
                    border-color: var(--color-default);
                }
                .radio label:hover {
                    background: var(--color-gray);
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
                    border: 1px solid var(--border-color);
                    border-radius: 6px;
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
                <nc-clubs-sidebar></nc-clubs-sidebar>

                <div class="content">
                    <div class="search">
                        <form action="#" method="get">
                            <input type="search" placeholder="Хайх" name="search">
                            <div class="radioff" role="radiogroup" aria-label="Sort order">
                                <div class="radio">
                                    <input id="sort-az" type="radio" name="sortOrder" value="az">
                                    <label for="sort-az">A-Я</label>
                                </div>
                                <div class="radio">
                                    <input id="sort-za" type="radio" name="sortOrder" value="za">
                                    <label for="sort-za">Я-А</label>
                                </div>
                            </div>
                        </form>
                    </div>

                    <nc-clubs-list id="clubs"></nc-clubs-list>

                    <div class="pagination">
                        <div class="pagination-previous">
                            <img src="images/Arrow Left.svg" alt="Previous" />
                            Өмнөх
                        </div>
                        <div class="pagination-list">
                            <div class="pagination-page">1</div>
                            <div class="element-wrapper">2</div>
                            <div class="element-wrapper">3</div>
                            <div class="pagination-gap">...</div>
                            <div class="element-wrapper">9</div>
                            <div class="element-wrapper">10</div>
                        </div>
                        <div class="pagination-next">
                            Дараагийн
                            <img src="images/Arrow Right.svg" alt="Next" />
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

window.customElements.define('nc-clubs-page', NcClubsPage);

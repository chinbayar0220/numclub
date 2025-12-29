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
                nc-club-filter {
                    display: block;
                    width: 20%;
                }
                .sidebar {
                    display: flex;
                    flex-direction: column;
                    padding: 8px 28px 28px 28px;
                    gap: 0px;
                    height: fit-content;
                    border: 1px solid #d3d3d3;
                    border-radius: 8px;
                    width: 20%;
                }
                nc-club-filter .sidebar {
                    width: 100%;
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
                    gap: 8px;
                    padding: 16px;
                }
                .pagination button {
                    border: 1px solid var(--color-secondary);
                    border-radius: 8px;
                    background-color: var(--color-white);
                    font-size: medium;
                    color: var(--color-secondary);
                    padding: 2px 8px;
                    cursor: pointer;
                }
                .pagination button:hover {
                    background-color: var(--color-gray);
                }
            </style>

            <div class="main">
                <nc-club-filter></nc-club-filter>

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
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>4</button>
                        <button>5</button>
                    </div>
                </div>
            </div>
        `;
    }
}

window.customElements.define('nc-clubs-page', NcClubsPage);

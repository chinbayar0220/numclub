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
                <div class="sidebar">
                    <h2>Клубийн чиглэл</h2>
                    <form class="chiglel">
                        <h4>Чөлөөт</h4>
                        <nc-form id="1" name="1" label="Сайн дурын"></nc-form>
                        <nc-form id="2" name="2" label="Спорт"></nc-form>
                        <nc-form id="3" name="3" label="Урлаг"></nc-form>
                        <nc-form id="4" name="4" label="Чөлөөт"></nc-form>
                        <nc-form id="5" name="5" label="Фото зураг"></nc-form>
                        <nc-form id="6" name="6" label="Шинжлэх ухаан"></nc-form>
                        <nc-form id="7" name="7" label="Мэдээллийн технологи"></nc-form>
                        <nc-form id="8" name="8" label="Хэл судлал"></nc-form>
                    </form>
                    <form class="surguuli">
                        <h4>Сургууль</h4>
                        <nc-form id="1" name="business" label="БС"></nc-form>
                        <nc-form id="2" name="its" label="ИТС"></nc-form>
                        <nc-form id="3" name="mtes" label="МТЭС"></nc-form>
                        <nc-form id="4" name="olonuls" label="УТСОУХНУС"></nc-form>
                        <nc-form id="5" name="huuli" label="ХЗС"></nc-form>
                        <nc-form id="6" name="shus" label="ШУС"></nc-form>
                    </form>
                </div>

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

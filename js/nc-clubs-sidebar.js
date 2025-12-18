class NcClubsSidebar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
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
        `;
    }
}

window.customElements.define('nc-clubs-sidebar', NcClubsSidebar);

(() => {
  // js/nc-clubs-page.js
  var NcClubsPage = class extends HTMLElement {
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
                            <input type="search" placeholder="\u0425\u0430\u0439\u0445" name="search">
                            <div class="radioff" role="radiogroup" aria-label="Sort order">
                                <div class="radio">
                                    <input id="sort-az" type="radio" name="sortOrder" value="az">
                                    <label for="sort-az">A-\u042F</label>
                                </div>
                                <div class="radio">
                                    <input id="sort-za" type="radio" name="sortOrder" value="za">
                                    <label for="sort-za">\u042F-\u0410</label>
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
  };
  window.customElements.define("nc-clubs-page", NcClubsPage);

  // js/nc-main-page-new.js
  var NcMainPage = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .hero {
                    text-align: center;
                    padding: 60px 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }
                .hero h1 {
                    font-size: 48px;
                    margin: 20px 0;
                }
                .search-bar {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 30px;
                    flex-wrap: wrap;
                }
                .search-input {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 20px;
                    width: 300px;
                    font-size: 14px;
                }
                .filter-btn {
                    padding: 8px 16px;
                    border: 2px solid white;
                    background: transparent;
                    color: white;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.3s;
                }
                .filter-btn:hover {
                    background: white;
                    color: #667eea;
                }
                .filter-btn.secondary {
                    border-color: rgba(255,255,255,0.5);
                }
                .events-section {
                    padding: 40px 20px;
                }
                .events-container {
                    position: relative;
                    margin-bottom: 60px;
                }
                .events-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px;
                    padding: 20px;
                }
                .scroll-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 10px;
                    border-radius: 50%;
                    cursor: pointer;
                    z-index: 10;
                }
                .scroll-btn-left {
                    left: 10px;
                }
                .scroll-btn-right {
                    right: 10px;
                }
                .section-title {
                    font-size: 28px;
                    margin: 40px 0 20px;
                    padding-left: 20px;
                }
                .clubs-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px;
                    padding: 20px;
                }
                .club-card {
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    padding: 20px;
                    background: white;
                    position: relative;
                    transition: transform 0.3s;
                }
                .club-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }
                .club-favorite {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                }
                .club-header {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 15px;
                }
                .club-icon {
                    font-size: 32px;
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .club-info h3 {
                    margin: 0;
                    font-size: 18px;
                }
                .club-category {
                    margin: 5px 0 0;
                    color: #999;
                    font-size: 14px;
                }
                .club-description {
                    color: #666;
                    font-size: 14px;
                    line-height: 1.5;
                    margin: 10px 0;
                }
                .btn-join {
                    width: 100%;
                    padding: 10px;
                    background: #667eea;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    transition: background 0.3s;
                }
                .btn-join:hover {
                    background: #764ba2;
                }
                .comments-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    padding: 20px;
                }
                .comment-card {
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    padding: 20px;
                    background: white;
                }
                .comment-header {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 15px;
                }
                .comment-avatar {
                    width: 40px;
                    height: 40px;
                    background: #ddd;
                    border-radius: 50%;
                }
                .comment-author {
                    font-weight: 600;
                    margin: 0;
                }
                .comment-text {
                    color: #666;
                    font-size: 14px;
                    line-height: 1.5;
                    margin: 0;
                }
                footer {
                    background: #333;
                    color: white;
                    padding: 40px 20px;
                    text-align: center;
                }
                .footer-logo {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 15px;
                }
                .footer-social {
                    margin: 15px 0;
                }
                .footer-social a {
                    color: white;
                    margin: 0 10px;
                    text-decoration: none;
                    font-size: 14px;
                }
            </style>

            <section class="hero">
                <h1>NUM CLUBS</h1>
                <div class="search-bar">
                    <input type="text" class="search-input" placeholder="\u0445\u0430\u0439\u0445...">
                    <button class="filter-btn">NEW</button>
                    <button class="filter-btn secondary">Computer</button>
                    <button class="filter-btn secondary">Sport</button>
                    <button class="filter-btn secondary">Art</button>
                </div>
            </section>

            <section class="events-section">
                <div class="events-container">
                    <button class="scroll-btn scroll-btn-left" id="scrollLeft">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>

                    <div class="events-grid">
                        <clb-event-card en="hogjimm"></clb-event-card>
                        <clb-event-card en="jaaz"></clb-event-card>
                        <clb-event-card></clb-event-card>
                        <clb-event-card en="jaaz"></clb-event-card>
                        <clb-event-card en="jaaz"></clb-event-card>
                        <clb-event-card en="jaaz"></clb-event-card>
                    </div>

                    <button class="scroll-btn scroll-btn-right" id="scrollRight">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>

                <h2 class="section-title">club</h2>

                <div class="clubs-grid">
                    <div class="club-card">
                        <button class="club-favorite">\u2661</button>
                        <div class="club-header">
                            <div class="club-icon">\u{1F4DA}</div>
                            <div class="club-info">
                                <h3>Hasbun students club</h3>
                                <p class="club-category">\u0411\u043E\u043B\u043E\u0432\u0441\u0440\u043E\u043B</p>
                            </div>
                        </div>
                        <p class="club-description">\u0425\u0430\u0441\u0431\u0443\u043D \u0441\u0443\u0440\u0433\u0443\u0443\u043B\u0438\u0439\u043D \u043E\u044E\u0443\u0442\u043D\u0443\u0443\u0434\u044B\u043D \u043A\u043B\u0443\u0431. \u0421\u0443\u0440\u0430\u043B\u0446\u0430\u0445, \u0445\u04E9\u0433\u0436\u0438\u0445, \u0441\u0430\u0439\u0436\u0440\u0430\u0445 \u0437\u043E\u0440\u0438\u043B\u0433\u043E\u0442\u043E\u0439 \u0445\u0430\u043C\u0442 \u043E\u043B\u043E\u043D. \u0425\u0438\u0447\u044D\u044D\u043B\u044D\u044D\u0441 \u0433\u0430\u0434\u0443\u0443\u0440 \u043E\u043B\u043E\u043D \u0430\u0440\u0433\u0430 \u0445\u044D\u043C\u0436\u044D\u044D \u0437\u043E\u0445\u0438\u043E\u043D \u0431\u0430\u0439\u0433\u0443\u0443\u043B\u0434\u0430\u0433.</p>
                        <button class="btn-join">\u042D\u041B\u0421\u042D\u0413\u0421\u042D\u041D\u0413\u04AE\u0419</button>
                    </div>

                    <div class="club-card">
                        <button class="club-favorite">\u2661</button>
                        <div class="club-header">
                            <div class="club-icon">\u{1F4BB}</div>
                            <div class="club-info">
                                <h3>Hasbun students club</h3>
                                <p class="club-category">\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438</p>
                            </div>
                        </div>
                        <p class="club-description">\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0434 \u0441\u043E\u043D\u0438\u0440\u0445\u043E\u043B\u0442\u043E\u0439 \u043E\u044E\u0443\u0442\u043D\u0443\u0443\u0434\u044B\u043D \u0431\u04AF\u043B\u044D\u0433. \u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0447\u043B\u0430\u043B, \u0440\u043E\u0431\u043E\u0442 \u0442\u0435\u0445\u043D\u0438\u043A, \u0448\u0438\u043D\u044D \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438 \u0441\u0443\u0434\u0430\u043B\u0434\u0430\u0433. Hackathon \u0431\u043E\u043B\u043E\u043D \u0442\u04E9\u0440\u04E9\u043B \u0431\u04AF\u0440\u0438\u0439\u043D \u0443\u0440\u0430\u043B\u0434\u0430\u0430\u043D\u0434 \u043E\u0440\u043E\u043B\u0446\u0434\u043E\u0433.</p>
                        <button class="btn-join">\u0414\u042D\u041B\u0413\u042D\u0420\u042D\u041D\u0413\u04AE\u0419</button>
                    </div>

                    <div class="club-card">
                        <button class="club-favorite">\u2661</button>
                        <div class="club-header">
                            <div class="club-icon">\u26BD</div>
                            <div class="club-info">
                                <h3>Hasbun students club</h3>
                                <p class="club-category">\u0421\u043F\u043E\u0440\u0442</p>
                            </div>
                        </div>
                        <p class="club-description">\u0421\u043F\u043E\u0440\u0442\u043E\u043E\u0440 \u0445\u0438\u0447\u044D\u044D\u043B\u043B\u044D\u0445 \u0434\u0443\u0440\u0442\u0430\u0439 \u043E\u044E\u0443\u0442\u043D\u0443\u0443\u0434\u044B\u043D \u043A\u043B\u0443\u0431. \u0425\u04E9\u043B \u0431\u04E9\u043C\u0431\u04E9\u0433, \u0441\u0430\u0433\u0441\u0430\u043D \u0431\u04E9\u043C\u0431\u04E9\u0433 \u0431\u043E\u043B\u043E\u043D \u0431\u0443\u0441\u0430\u0434 \u0441\u043F\u043E\u0440\u0442\u044B\u043D \u0442\u04E9\u0440\u043B\u04AF\u04AF\u0434\u044D\u044D\u0440 \u0442\u043E\u0433\u043B\u043E. \u042D\u0440\u04AF\u04AF\u043B \u0430\u043C\u044C\u0434\u0440\u0430\u043B\u044B\u043D \u0445\u044D\u0432 \u043C\u0430\u044F\u0433!</p>
                        <button class="btn-join">\u0414\u042D\u041B\u0413\u042D\u0420\u042D\u041D\u0413\u04AE\u0419</button>
                    </div>

                    <div class="club-card">
                        <button class="club-favorite">\u2661</button>
                        <div class="club-header">
                            <div class="club-icon">\u{1F3AD}</div>
                            <div class="club-info">
                                <h3>Hasbun students club</h3>
                                <p class="club-category">\u0423\u0440\u043B\u0430\u0433</p>
                            </div>
                        </div>
                        <p class="club-description">\u0422\u0435\u0430\u0442\u0440 \u0443\u0440\u043B\u0430\u0433\u0438\u0439\u0433 \u0445\u0430\u0439\u0440\u043B\u0430\u0433\u0447\u0434\u044B\u043D \u0431\u04AF\u043B\u044D\u0433. \u0416\u04AF\u0436\u0438\u0433 \u0431\u044D\u043B\u0442\u0433\u044D\u0445, \u0434\u04AF\u0440\u0434 \u0442\u043E\u0433\u043B\u043E\u0445, \u0443\u0440\u043B\u0430\u0433\u0430\u0430 \u0445\u04E9\u0433\u0436\u04AF\u04AF\u043B\u044D\u0445 \u0431\u043E\u043B\u043E\u043C\u0436. \u0411\u04AF\u0442\u044D\u044D\u043B\u0447 \u0445\u04AF\u043C\u04AF\u04AF\u0441\u0438\u0439\u043D \u0433\u0430\u0439\u0445\u0430\u043B\u0442\u0430\u0439 \u043E\u0440\u0447\u0438\u043D.</p>
                        <button class="btn-join">\u0414\u042D\u041B\u0413\u042D\u0420\u042D\u041D\u0413\u04AE\u0419</button>
                    </div>

                    <div class="club-card">
                        <button class="club-favorite">\u2661</button>
                        <div class="club-header">
                            <div class="club-icon">\u{1F3B5}</div>
                            <div class="club-info">
                                <h3>Hasbun students club</h3>
                                <p class="club-category">\u0425\u04E9\u0433\u0436\u0438\u043C</p>
                            </div>
                        </div>
                        <p class="club-description">\u0425\u04E9\u0433\u0436\u0438\u043C \u0441\u043E\u043D\u0438\u0440\u0445\u043E\u0433\u0447\u0434\u044B\u043D \u0446\u0443\u0433\u043B\u0430\u0430\u043D. \u0414\u0443\u0443\u043B\u0430\u0445, \u0445\u04E9\u0433\u0436\u0438\u043C \u0442\u043E\u0433\u043B\u043E\u0445, \u0431\u04AF\u0442\u044D\u044D\u0445. \u0411\u04AF\u0445 \u0442\u04E9\u0440\u043B\u0438\u0439\u043D \u0445\u04E9\u0433\u0436\u0438\u043C\u0434 \u043D\u044D\u044D\u043B\u0442\u0442\u044D\u0439. \u0414\u043E\u043B\u043E\u043E \u0445\u043E\u043D\u043E\u0433 \u0431\u04AF\u0440 \u0434\u0430\u0441\u0433\u0430\u043B \u0445\u0438\u0439\u0434\u044D\u0433.</p>
                        <button class="btn-join">\u0414\u042D\u041B\u0413\u042D\u0420\u042D\u041D\u0413\u04AE\u0419</button>
                    </div>

                    <div class="club-card">
                        <button class="club-favorite">\u2661</button>
                        <div class="club-header">
                            <div class="club-icon">\u{1F4F8}</div>
                            <div class="club-info">
                                <h3>Hasbun students club</h3>
                                <p class="club-category">\u0413\u044D\u0440\u044D\u043B \u0437\u0443\u0440\u0430\u0433</p>
                            </div>
                        </div>
                        <p class="club-description">\u0413\u044D\u0440\u044D\u043B \u0437\u0443\u0440\u0433\u0438\u0439\u043D \u0443\u0440\u043B\u0430\u0433\u0442 \u0441\u043E\u043D\u0438\u0440\u0445\u043E\u043B\u0442\u043E\u0439 \u0437\u0430\u043B\u0443\u0443\u0441\u044B\u043D \u043A\u043B\u0443\u0431. \u0417\u0443\u0440\u0430\u0433 \u0430\u0432\u0430\u0445 \u0442\u0435\u0445\u043D\u0438\u043A, \u0431\u043E\u043B\u043E\u0432\u0441\u0440\u0443\u0443\u043B\u0430\u0445 \u0430\u0440\u0433\u0430 \u0431\u0430\u0440\u0438\u043B \u0441\u0443\u0440\u0430\u0445. \u04AE\u0437\u044D\u0441\u0433\u044D\u043B\u044D\u043D \u0437\u043E\u0445\u0438\u043E\u043D \u0431\u0430\u0439\u0433\u0443\u0443\u043B\u0434\u0430\u0433.</p>
                        <button class="btn-join">\u0414\u042D\u041B\u0413\u042D\u0420\u042D\u041D\u0413\u04AE\u0419</button>
                    </div>
                </div>

                <h2 class="section-title">\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B</h2>
                <p style="color: #666; margin-bottom: 2rem; padding-left: 20px;">\u0413\u0438\u0448\u04AF\u04AF\u0434\u0438\u0439\u043D \u0441\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B \u0431\u043E\u043B\u043E\u043D \u0442\u0443\u0440\u0448\u043B\u0430\u0433\u0430</p>

                <div class="comments-grid">
                    <div class="comment-card">
                        <div class="comment-header">
                            <div class="comment-avatar"></div>
                            <div>
                                <div class="comment-author">"Quote"</div>
                                <div style="font-size: 0.8rem; color: #999;">Hasbun students club</div>
                            </div>
                        </div>
                        <p class="comment-text">\u041C\u0430\u0448 \u0441\u0430\u0439\u0445\u0430\u043D \u0442\u0443\u0440\u0448\u043B\u0430\u0433\u0430 \u0431\u0430\u0439\u043B\u0430\u0430. \u041E\u043B\u043E\u043D \u0448\u0438\u043D\u044D \u0437\u04AF\u0439\u043B \u0441\u0443\u0440\u0447, \u043D\u0430\u0439\u0437\u0443\u0443\u0434\u0442\u0430\u0439 \u0431\u043E\u043B\u0441\u043E\u043D.</p>
                    </div>

                    <div class="comment-card">
                        <div class="comment-header">
                            <div class="comment-avatar"></div>
                            <div>
                                <div class="comment-author">"Quote"</div>
                                <div style="font-size: 0.8rem; color: #999;">Hasbun students club</div>
                            </div>
                        </div>
                        <p class="comment-text">\u041A\u043B\u0443\u0431\u0442 \u044D\u043B\u0441\u0441\u044D\u043D\u044D\u044D\u0441\u044D\u044D \u0445\u043E\u0439\u0448 \u0431\u0438\u0434 \u043C\u0430\u0448 \u0438\u0445 \u0445\u04E9\u0433\u0436\u0441\u04E9\u043D. \u0421\u0430\u043D\u0430\u043B \u0431\u043E\u043B\u0433\u043E\u0436 \u0431\u0430\u0439\u043D\u0430.</p>
                    </div>

                    <div class="comment-card">
                        <div class="comment-header">
                            <div class="comment-avatar"></div>
                            <div>
                                <div class="comment-author">"Quote"</div>
                                <div style="font-size: 0.8rem; color: #999;">Hasbun students club</div>
                            </div>
                        </div>
                        <p class="comment-text">\u0413\u0430\u0439\u0445\u0430\u043B\u0442\u0430\u0439 \u0445\u0430\u043C\u0442 \u043E\u043B\u043E\u043D, \u043E\u043B\u043E\u043D \u0431\u043E\u043B\u043E\u043C\u0436. \u04E8\u04E9\u0440\u0438\u0439\u0433\u04E9\u04E9 \u0438\u043B\u044D\u0440\u0445\u0438\u0439\u043B\u044D\u0445 \u0441\u0430\u0439\u0445\u0430\u043D \u043E\u0440\u0447\u0438\u043D.</p>
                    </div>

                    <div class="comment-card">
                        <div class="comment-header">
                            <div class="comment-avatar"></div>
                            <div>
                                <div class="comment-author">"Quote"</div>
                                <div style="font-size: 0.8rem; color: #999;">Hasbun students club</div>
                            </div>
                        </div>
                        <p class="comment-text">\u0418\u0445 \u0441\u0443\u0440\u0433\u0443\u0443\u043B\u0438\u0439\u043D \u0430\u043C\u044C\u0434\u0440\u0430\u043B \u0441\u043E\u043D\u0438\u0440\u0445\u043E\u043B\u0442\u043E\u0439 \u0431\u043E\u043B\u0441\u043E\u043D. \u0411\u0430\u044F\u0440\u043B\u0430\u043B\u0430\u0430!</p>
                    </div>

                    <div class="comment-card">
                        <div class="comment-header">
                            <div class="comment-avatar"></div>
                            <div>
                                <div class="comment-author">"Quote"</div>
                                <div style="font-size: 0.8rem; color: #999;">Hasbun students club</div>
                            </div>
                        </div>
                        <p class="comment-text">\u041C\u0430\u0448 \u0438\u0445 \u0437\u04AF\u0439\u043B \u0441\u0443\u0440\u0447 \u0430\u0432\u0441\u0430\u043D. \u0425\u0430\u043C\u0442 \u043E\u043B\u043E\u043D \u043D\u044C \u0433\u0430\u0439\u0445\u0430\u043B\u0442\u0430\u0439 \u0434\u044D\u043C\u0436\u043B\u044D\u0433 \u04AF\u0437\u04AF\u04AF\u043B\u0434\u044D\u0433.</p>
                    </div>

                    <div class="comment-card">
                        <div class="comment-header">
                            <div class="comment-avatar"></div>
                            <div>
                                <div class="comment-author">"Quote"</div>
                                <div style="font-size: 0.8rem; color: #999;">Hasbun students club</div>
                            </div>
                        </div>
                        <p class="comment-text">\u0411\u04AF\u0445 \u0437\u04AF\u0439\u043B \u043C\u0430\u0448 \u0437\u043E\u0445\u0438\u043E\u043D \u0431\u0430\u0439\u0433\u0443\u0443\u043B\u0430\u043B\u0442\u0442\u0430\u0439. \u04E8\u043D\u0434\u04E9\u0440 \u0447\u0430\u043D\u0430\u0440\u0442\u0430\u0439 \u0430\u0440\u0433\u0430 \u0445\u044D\u043C\u0436\u044D\u044D\u043D\u04AF\u04AF\u0434.</p>
                    </div>
                </div>
            </section>

            <script>
                setTimeout(() => {
                    const scrollLeft = this.querySelector('#scrollLeft');
                    const scrollRight = this.querySelector('#scrollRight');
                    const grid = this.querySelector('.events-grid');

                    if (scrollLeft && grid) {
                        scrollLeft.addEventListener('click', () => {
                            grid.scrollBy({ left: -grid.offsetWidth, behavior: 'smooth' });
                        });
                    }

                    if (scrollRight && grid) {
                        scrollRight.addEventListener('click', () => {
                            grid.scrollBy({ left: grid.offsetWidth, behavior: 'smooth' });
                        });
                    }
                }, 0);
            <\/script>
        `;
    }
  };
  window.customElements.define("nc-main-page", NcMainPage);

  // js/nc-user-profile-page.js
  var NcUserProfilePage = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                main {
                    background-color: var(--color-gray);
                }
                .main {
                    display: flex;
                    flex-direction: column;
                    padding-top: 0px;
                    padding-bottom: 64px;
                }
                .user_card {
                    display: flex;
                    flex-direction: row;
                    gap: 5%;
                    align-items: flex-start;
                    background-color: var(--color-white);
                    padding: 28px 90px;
                    width: flex;
                }
                .profile_picture{
                    flex: 1 1 auto;
                    border-radius: 50%;
                    border: 1px solid var(--color-gray); 
                    background-color: var(--color-gray)"
                    width: 20%;
                }
                .info {
                    display: flex;
                    flex-direction: column;
                    gap: 0px;
                    width: 60%;
                }
                .user_identity {
                    display: flex;
                    gap: 8px;
                }
                .url{
                    display:flex;
                    flex-direction: row;
                    gap:8px;
                    width: 10%;
                }
            </style>

            <div class="main">
                <nc-usercard></nc-usercard>

                <div class="club_requests" id="clubs">
                    <h2>\u0422\u0430\u043D\u044B \u044D\u043B\u0441\u044D\u0445 \u0445\u04AF\u0441\u044D\u043B\u0442 \u044F\u0432\u0443\u0443\u043B\u0441\u0430\u043D \u043A\u043B\u0443\u0431\u04AF\u04AF\u0434</h2>
                    <div class="requests">
                        <nc-clubrequestcard></nc-clubrequestcard>
                        <nc-clubrequestcard></nc-clubrequestcard>
                        <nc-clubrequestcard></nc-clubrequestcard>
                    </div>
                </div>

                <section class="events_section" id="events">
                    <h2>\u042D\u0432\u0435\u043D\u0442\u04AF\u04AF\u0434</h2>
                    <section class="events">
                        <nc-eventcard button1=""></nc-eventcard>
                        <nc-eventcard></nc-eventcard>
                        <nc-eventcard></nc-eventcard>
                    </section>
                </section>

                <div class="club_requests">
                    <h2>\u0425\u0430\u0434\u0433\u0430\u043B\u0441\u0430\u043D</h2>
                    <div class="requests">
                        <nc-clubrequestcard desc="\u041C\u044D\u0434\u044D\u044D\u043B\u043B\u0438\u0439\u043D \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439\u043D \u0447\u0438\u0433\u043B\u044D\u043B\u044D\u044D\u0440 \u04AF\u0439\u043B \u0430\u0436\u0438\u043B\u043B\u0430\u0433\u0430\u0430 \u044F\u0432\u0443\u0443\u043B\u0434\u0430\u0433 \u0431\u04E9\u0433\u04E9\u04E9\u0434 \u043E\u044E\u0443\u0442\u043D\u0443\u0443\u0434\u044B\u043D \u043C\u044D\u0434\u043B\u044D\u0433\u0438\u0439\u0433 \u0434\u044D\u044D\u0448\u043B\u04AF\u04AF\u043B\u044D\u0445, \u043F\u0440\u0430\u043A\u0442\u0438\u043A \u0443\u0440 \u0447\u0430\u0434\u0432\u0430\u0440 \u043E\u043B\u0433\u043E\u0445, \u0438\u043D\u043D\u043E\u0432\u0430\u0446 \u0431\u04AF\u0442\u044D\u044D\u0445\u044D\u0434 \u0447\u0438\u0433\u043B\u044D\u0441\u044D\u043D \u04AF\u0439\u043B \u0430\u0436\u0438\u043B\u043B\u0430\u0433\u0430\u0430 \u044F\u0432\u0443\u0443\u043B\u0434\u0430\u0433"></nc-clubrequestcard>
                        <nc-clubrequestcard desc="\u041C\u044D\u0434\u044D\u044D\u043B\u043B\u0438\u0439\u043D \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439\u043D \u0447\u0438\u0433\u043B\u044D\u043B\u044D\u044D\u0440 \u04AF\u0439\u043B \u0430\u0436\u0438\u043B\u043B\u0430\u0433\u0430\u0430 \u044F\u0432\u0443\u0443\u043B\u0434\u0430\u0433 \u0431\u04E9\u0433\u04E9\u04E9\u0434 \u043E\u044E\u0443\u0442\u043D\u0443\u0443\u0434\u044B\u043D \u043C\u044D\u0434\u043B\u044D\u0433\u0438\u0439\u0433 \u0434\u044D\u044D\u0448\u043B\u04AF\u04AF\u043B\u044D\u0445, \u043F\u0440\u0430\u043A\u0442\u0438\u043A \u0443\u0440 \u0447\u0430\u0434\u0432\u0430\u0440 \u043E\u043B\u0433\u043E\u0445, \u0438\u043D\u043D\u043E\u0432\u0430\u0446 \u0431\u04AF\u0442\u044D\u044D\u0445\u044D\u0434 \u0447\u0438\u0433\u043B\u044D\u0441\u044D\u043D \u04AF\u0439\u043B \u0430\u0436\u0438\u043B\u043B\u0430\u0433\u0430\u0430 \u044F\u0432\u0443\u0443\u043B\u0434\u0430\u0433"></nc-clubrequestcard>
                        <nc-clubrequestcard desc="\u041C\u044D\u0434\u044D\u044D\u043B\u043B\u0438\u0439\u043D \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439\u043D \u0447\u0438\u0433\u043B\u044D\u043B\u044D\u044D\u0440 \u04AF\u0439\u043B \u0430\u0436\u0438\u043B\u043B\u0430\u0433\u0430\u0430 \u044F\u0432\u0443\u0443\u043B\u0434\u0430\u0433 \u0431\u04E9\u0433\u04E9\u04E9\u0434 \u043E\u044E\u0443\u0442\u043D\u0443\u0443\u0434\u044B\u043D \u043C\u044D\u0434\u043B\u044D\u0433\u0438\u0439\u0433 \u0434\u044D\u044D\u0448\u043B\u04AF\u04AF\u043B\u044D\u0445, \u043F\u0440\u0430\u043A\u0442\u0438\u043A \u0443\u0440 \u0447\u0430\u0434\u0432\u0430\u0440 \u043E\u043B\u0433\u043E\u0445, \u0438\u043D\u043D\u043E\u0432\u0430\u0446 \u0431\u04AF\u0442\u044D\u044D\u0445\u044D\u0434 \u0447\u0438\u0433\u043B\u044D\u0441\u044D\u043D \u04AF\u0439\u043B \u0430\u0436\u0438\u043B\u043B\u0430\u0433\u0430\u0430 \u044F\u0432\u0443\u0443\u043B\u0434\u0430\u0433"></nc-clubrequestcard>
                    </div>
                </div>

                <section class="events_section">
                    <h2>\u0422\u0430\u043D\u044B \u0431\u04AF\u0440\u0442\u0433\u04AF\u04AF\u043B\u0441\u044D\u043D \u044D\u0432\u0435\u043D\u0442\u04AF\u04AF\u0434</h2>
                    <section class="events">
                        <nc-eventcard></nc-eventcard>
                        <nc-eventcard></nc-eventcard>
                        <nc-eventcard></nc-eventcard>
                    </section>
                </section>
            </div>
        `;
    }
  };
  window.customElements.define("nc-user-profile-page", NcUserProfilePage);

  // js/nc-club-profile-page.js
  var NcClubProfilePage = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      const clubId = this.getAttribute("id") || "";
      const demoData = {
        "5": {
          name: "Hackum students club",
          email: "Hackum@gmail.com",
          category: "\u041C\u044D\u0434\u044D\u044D\u043B\u043B\u0438\u0439\u043D \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438",
          tags: ["\u041C\u0422\u042D\u0421-\u041C\u041A\u0423\u0422", "\u041C\u044D\u0440\u0433\u044D\u0436\u043B\u0438\u0439\u043D"]
        }
      };
      const club = clubId && demoData[clubId] ? demoData[clubId] : clubId ? { name: `Club ${clubId}`, email: "", category: "", tags: [] } : demoData["5"];
      this.innerHTML = `
            <style>
                body {
                    display: grid;
                    grid-template-areas:
                        "hd"
                        "main"
                        "ft";
                    grid-template-rows: 100px 1fr 272px;
                    border: 1px solid black;
                }

                header {
                    grid-area: hd;
                    font-family: inter;
                }

                main {
                    grid-area: main;
                    border: 1px solid green;
                    background-color: #F5F5F5;
                }

                footer {
                    grid-area: ft;
                    border: 1px solid red;
                    padding: 32px;
                    >img{padding-bottom: 24px;}
                }
                header{
                    display: flex;
                    align-items: center;
                    justify-content:space-between;
                    margin: 32px 100px 32px 96px;
                }
                header nav{
                    display: flex;
                    gap: 16px;
                    align-items: center;
                }
                header nav a{
                    text-decoration: none;
                    color: #1e1e1e;
                    cursor: pointer;
                    padding: 8px;
                }

                header nav a:hover{
                    background-color: #F5F5F5;
                    border-radius: 8px;
                }
                main h2{
                    margin: 0;
                }
                main>article{
                    display: flex;
                    flex-wrap: wrap;
                    padding: 64px 100px;
                    gap: 64px;
                    justify-content: space-between;
                    background-color: white;
                    h1{
                        font-size: 48px;
                        font-weight: 700;
                        font-family: inter;
                        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
                        margin: 0px 0px 16px 0px ;
                    }
                    .hero-card{
                        display: flex;
                        flex-wrap: wrap; 
                        gap: 8px;
                        p{  
                        border: 1px solid black;
                        background-color: #2c2c2c;
                        color: aliceblue;
                        border-radius: 8px;
                        padding: 6px 8px;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        margin: 0px;
                        font-family: inter;
                        }
                    }
                    .hero-card p span img{
                        padding: 0px;
                        margin-right: 8px;   

                    }
                    details{
                        border: 1px solid #D9D9D9;
                        border-radius: 8px;
                        background-color: #F5F5F5;
                        min-height: 54px;
                        margin-bottom: 18px;
                    }
                    .details{
                        margin: 25px 26px 0px 0px;
                        font-family: inter;
                        summary{
                            padding: 16px;
                            font-weight: 600;
                            font-size: 16px;
                            list-style: none;
                            display: flex;
                            justify-content: space-between;
                        }
                        p{
                            margin-top: 0px;
                            padding-left: 16px;
                            padding-right: 16px;
                            font-size: 16px;
                        }
                    }
                    .details summary img{
                        transition: transform 0.3s ease;
                    }
                    .details details[open] summary img {
                        transform: rotate(180deg);
                        }
                    details[open]{
                        background-color: white;
                    }
                }

                .club-logo img{
                    height: 250px;
                    width: 250px;
                    border-radius: 150px;
                }
                .hero{
                    max-width: 666px;
                    width: 100%;
                }
                #Uil-ajillagaa{
                    padding: 64px 100px;
                    font-family: inter;
                    font-weight: 600;
                    h2{
                        margin: 0px;
                        font-size: 24px;
                    }
                }
                #Uil-ajillagaa>div{
                    display: flex;
                    gap: 25px;
                    flex-wrap: wrap;
                    margin-top: 24px;
                    p{
                        display: flex;
                        border: 1px solid #D9D9D9;
                        background-color: white;
                        width: 340.33px;
                        height: 32px;
                        border-radius: 8px;
                        align-items: center;
                        padding: 24px;
                        margin: 0px;
                        font-size: 16px;
                        box-shadow:  0 4px 4px rgba(0, 0, 0, 0.2);
                    }
                }
                .gishuun-elseh{
                    padding: 64px 100px ;
                    font-family: inter;
                    details{
                        color: #757575;
                    }
                    button{
                        width: 98%;
                        height: 40px;
                        border-radius: 8px;
                        color: white;
                        background-color: #1e1e1e;
                        margin-top: 48px;
                    }
                }
                .events{
                    padding: 64px 100px;
                }
                .events>div{
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    padding-top: 24px;
                    gap: 24px;
                }
                .events header{
                    margin:0px;
                    h4{
                        font-size: 16px;
                        font-weight: 600;
                    }
                }
                .event-card{
                    padding:16px;
                    border: 1px solid #D9D9D9;
                    background-color: white;
                    border-radius: 8px;
                    >img{
                        width: 100%;
                    }
                label{
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 8px;
                    h4{
                        font-weight: 600px;
                        font-size: 20px;
                        margin: 0;
                    }
                }
                }
                .comment {
                    padding: 64px 100px;
                    font-family: inter;
                }

                .comment h2 {
                    font-weight: 600;
                    margin: 0;
                }

                .comment h3 {
                    margin: 24px 0 0;
                }

                .comment > p {
                    margin: 10px 0 0 0;
                    color: #757575;
                }

                .comment-cards {
                    margin-top: 48px;
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 24px;
                }

                .comment-cards article {
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    background-color: white;
                    border: 1px solid #D9D9D9;
                    border-radius: 8px;
                }

                .comment-cards article > img {
                    width: 116px;
                    height: 20px;
                }

                .comment-cards article #review h3 {
                    margin: 0 0 4px 0;
                    font-size: 24px;
                }

                .comment-cards article #review p {
                    margin: 0;
                }

                .comment-cards article #comment-tt {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .comment-cards article #comment-tt h5 {
                    margin: 0;
                    font-size: 14px;
                    font-weight: 600;
                    color: #757575;
                }

                .comment-cards article #comment-tt p {
                    margin: 2px 0 0;
                    font-size: 12px;
                    color: #B3B3B3;
                }

                .comment-cards article #comment-tt img {
                    border: 1px solid #D9D9D9;
                    border-radius: 50%;
                }


                @media (max-width: 1024px) {
                    .comment {
                        padding: 48px 32px;
                    }
                    .comment-cards {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                    .events {
                        padding: 48px 32px;
                    }
                    .events>div{
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                }

                @media (max-width: 640px) {
                    .comment {
                        padding: 32px 16px;
                    }
                    .comment-cards {
                        grid-template-columns: 1fr;
                    }
                }

            </style>

            <main>
                <article>
                    <div class="club-logo">
                        <img src="images/club_logo.svg" alt="clubs logo">
                    </div>
                    <div class="hero">
                        <section>
                            <h1>${club.name}${clubId ? ` <span style="font-size:14px;color:var(--text-secondary,#888);font-weight:400;">#${clubId}</span>` : ""}</h1>
                            <article class="hero-card">
                                ${club.tags.map((t) => `<p><span><img src="images/Book.svg" alt="">${t}</span></p>`).join("")}
                                <p><span><img src="images/Book.svg" alt="">${club.category}</span></p>
                                <p><span><img src="images/Book.svg" alt="">${club.email}</span></p>
                            </article>
                        </section>
                        <div class="details">
                            <details>
                                <summary>\u0417\u043E\u0440\u0438\u043B\u0433\u043E <img src="images/Chevron up.svg" alt=""></summary>
                                <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet laoreet ipsum. Quisque pulvinar turpis vel lobortis efficitur. Duis nec auctor magna. Nullam tempor ligula nisl, in ultricies nisl commodo et.</p>
                            </details>
                            <details>
                                <summary>\u0410\u043B\u0441\u044B\u043D \u043A\u0430\u0440\u0430\u0430 <img src="images/Chevron up.svg" alt=""></summary>
                                <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet laoreet ipsum. Quisque pulvinar turpis vel lobortis efficitur. Duis nec auctor magna. Nullam tempor ligula nisl, in ultricies nisl commodo et.</p>
                            </details>
                        </div>
                    </div>
                    <aside>
                        <div>
                            <img src="images/FB Icon Button.svg" alt="">
                            <img src="images/youtubeIcon.svg" alt="">
                            <img src="images/IG Icon Button.svg" alt="">
                            <img src="images/Linkedin Icon Button.svg" alt="">
                        </div>
                        <article>
                            <h5>\u0433\u0438\u0448\u04AF\u04AF\u0434 \u0442\u04E9\u0433\u0441\u04E9\u0433\u0447\u0438\u0434</h5>
                            <img src="images/Shape.svg" alt="">
                        </article>
                    </aside>
                </article>

                <section id="Uil-ajillagaa">
                    <h2>\u04AE\u0439\u043B \u0430\u0436\u0438\u043B\u043B\u0430\u0433\u0430\u0430</h2>
                    <div>
                        <p>Tech meetup</p>
                        <p>Work shop</p>
                        <p>Knowledge day</p>
                        <p>Hackathon</p>
                        <p>Pitch nigth</p>
                        <p>Quiz night</p>
                    </div>
                </section>

                <section class="gishuun-elseh">
                    <h2>\u0413\u0438\u0448\u04AF\u04AF\u043D\u044D\u044D\u0440 \u044D\u043B\u0441\u044D\u0445</h2>
                    <details>
                        <summary>\u0448\u0430\u043B\u0433\u0443\u0443\u0440\u0443\u0443\u0434</summary>
                        <p>zuunnayaas deesh undurtei biyiin zuv galbirtai urt huruutai uhaantai geh zergeer</p>
                    </details>
                    <button>\u0413\u0438\u0448\u04AF\u04AF\u043D\u044D\u044D\u0440 \u044D\u043B\u0441\u044D\u0445</button>
                </section>

                <section class="events">
                    <h2>\u042D\u0432\u0435\u043D\u0442\u04AF\u04AF\u0434</h2>
                    <p>\u0422\u0430\u043D\u044C\u0434 \u0441\u0430\u043D\u0430\u043B \u0431\u043E\u043B\u0433\u043E\u0445</p>
                    <div>
                        <nc-Cevent-card></nc-Cevent-card>
                        <nc-Cevent-card></nc-Cevent-card>
                        <nc-Cevent-card></nc-Cevent-card>
                    </div>
                </section>

                <section class="comment">
                    <h2>\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B</h2>
                    <p>\u0422\u04E9\u0433\u0441\u04E9\u0433\u0447\u0438\u0434 \u04AF\u043B\u0434\u044D\u044D\u0441\u044D\u043D \u0441\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B</p>
                    <div class="comment-cards">
                        <nc-Cfeed-Back></nc-Cfeed-Back>
                        <nc-Cfeed-Back></nc-Cfeed-Back>
                        <nc-Cfeed-Back></nc-Cfeed-Back>
                        <nc-Cfeed-Back></nc-Cfeed-Back>
                        <nc-Cfeed-Back></nc-Cfeed-Back>
                        <nc-Cfeed-Back></nc-Cfeed-Back>
                    </div>
                </section>
            </main>
        `;
    }
  };
  window.customElements.define("nc-club-profile-page", NcClubProfilePage);

  // js/nc-clubcard.js
  var NcClubcard = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      const clubname = this.getAttribute("cname") || "Club name";
      const description = this.getAttribute("desc") || "\u041C\u044D\u0434\u044D\u044D\u043B\u043B\u0438\u0439\u043D \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439\u043D \u0447\u0438\u0433\u043B\u044D\u043B\u044D\u044D\u0440 \u04AF\u0439\u043B \u0430\u0436\u0438\u043B\u043B\u0430\u0433\u0430\u0430 \u044F\u0432\u0443\u0443\u043B\u0434\u0430\u0433 \u0431\u04E9\u0433\u04E9\u04E9\u0434 \u043E\u044E\u0443\u0442\u043D\u0443\u0443\u0434\u044B\u043D \u043C\u044D\u0434\u043B\u044D\u0433\u0438\u0439\u0433 \u0434\u044D\u044D\u0448\u043B\u04AF\u04AF\u043B\u044D\u0445, \u043F\u0440\u0430\u043A\u0442\u0438\u043A \u0443\u0440 \u0447\u0430\u0434\u0432\u0430\u0440 \u043E\u043B\u0433\u043E\u0445, \u0438\u043D\u043D\u043E\u0432\u0430\u0446 \u0431\u04AF\u0442\u044D\u044D\u0445\u044D\u0434 \u0447\u0438\u0433\u043B\u044D\u0441\u044D\u043D \u04AF\u0439\u043B \u0430\u0436\u0438\u043B\u043B\u0430\u0433\u0430\u0430 \u044F\u0432\u0443\u0443\u043B\u0434\u0430\u0433";
      const button1 = this.getAttribute("btn1") || "\u042D\u043B\u0441\u044D\u0445";
      const button2 = this.getAttribute("btn2") || "\u0414\u044D\u043B\u0433\u044D\u0440\u044D\u043D\u0433\u04AF\u0439";
      const imgSrc = this.getAttribute("img") || this.getAttribute("logo") || "images/event.png";
      const imgAlt = this.getAttribute("img-alt") || clubname;
      const clubId = this.getAttribute("club-id") || this.getAttribute("data-index") || "1";
      this.innerHTML = `
        <article class="club_card">
            <div class="club_name">
                <img src="${imgSrc}" alt="${imgAlt}" class="club-card-img" style="width:58px;height:58px;object-fit:cover;border:1px solid var(--color-gray);box-shadow:0px 4px 16px rgba(0,0,0,0.06);">
                <h3>${clubname}</h3>
            </div>
            <p class="desc">${description}</p>
            <div class="buttons">
                <button class="btn1" data-club-id="${clubId}">${button1}</button>
                <button class="btn2" data-club-id="${clubId}">${button2}</button>
            </div>
        </article>`;
      const btn2 = this.querySelector(".btn2");
      if (btn2) {
        btn2.addEventListener("click", (e) => {
          e.stopPropagation();
          const id = btn2.getAttribute("data-club-id");
          if (window.Router) {
            window.Router.navigate(`/club/${id}`);
          } else {
            window.location.hash = `#/club/${id}`;
          }
        });
      }
      const btn1 = this.querySelector(".btn1");
      if (btn1) {
        btn1.addEventListener("click", (e) => {
          e.stopPropagation();
          const id = btn1.getAttribute("data-club-id") || clubId || this.getAttribute("data-index") || "1";
          try {
            localStorage.setItem("register_club_id", id);
          } catch (err) {
          }
          if (window.Router) {
            window.Router.navigate("/registration");
          } else {
            window.location.hash = "#/registration";
          }
        });
      }
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(name, oldVal, newVal) {
    }
    adoptedCallback() {
    }
  };
  window.customElements.define("nc-clubcard", NcClubcard);

  // js/nc-form.js
  var NcForm = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      const id = this.getAttribute("id") || "1";
      const name = this.getAttribute("name") || "1";
      const label = this.getAttribute("label") || "\u0427\u0438\u0433\u043B\u044D\u043B";
      const type = this.getAttribute("type") || "checkbox";
      this.innerHTML = `
        <label>${label}
            <input type="${type}" value="${id}">
        </label>`;
    }
  };
  window.customElements.define("nc-form", NcForm);

  // js/nc-eventcard.js
  var ncEventcard = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      const eventname = this.getAttribute("ename") || "Event name";
      const datetime = this.getAttribute("date") || "2025.10.01 19:00";
      const description = this.getAttribute("desc") || "\u042D\u0432\u0435\u043D\u0442\u0438\u0439\u043D \u0442\u0443\u0445\u0430\u0439 \u043C\u044D\u0434\u044D\u044D\u043B\u043B\u0438\u0439\u0433 \u0434\u044D\u043B\u0433\u044D\u0440\u044D\u043D\u0433\u04AF\u0439\u0433\u044D\u044D\u0440 \u0442\u0430\u0439\u043B\u0431\u0430\u0440\u043B\u0430\u0436 \u04E9\u0433\u0447 \u0431\u043E\u043B\u043D\u043E";
      const price = this.getAttribute("price") || "\u20AE10,000";
      const button1 = this.getAttribute("btn1");
      const button2 = this.getAttribute("btn2") || "\u0414\u044D\u043B\u0433\u044D\u0440\u044D\u043D\u0433\u04AF\u0439";
      this.innerHTML = `
        <div class="event_card">
            <img src="images/event.png" width=flex alt="Event Image"/>
            <div class="club_name">
                <img src="images/club_logo.svg" width="24" height="24" alt="Club Icon"/>
                <h4>Hackum students club</h4>
            </div>
            <h2>${eventname}</h2>
            <p>${datetime}</p>
            <aside class="line">
                <p class="desc">${description}</p>
            </aside>
            <h4>${price}</h4>
            <div class="btn1">${button1 != null ? `<button class="login">${button1}</button>` : ``}    
            <button class="btn2">${button2}</button>
            </div>
        </div>`;
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(name, oldVal, newVal) {
    }
    adoptedCallback() {
    }
    set button1(val) {
      if (val) this.setAttribute("button1", "");
      else this.removeAttribute("button1");
    }
    get button1() {
      return this.hasAttribute("button1");
    }
  };
  window.customElements.define("nc-eventcard", ncEventcard);

  // js/nc-clubrequestcard.js
  var NcClubRequestCard = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      const clubname = this.getAttribute("cname") || "Club name";
      const button1 = this.getAttribute("btn1") || "\u042D\u043B\u0441\u044D\u0445";
      const button2 = this.getAttribute("btn2") || "\u0414\u044D\u043B\u0433\u044D\u0440\u044D\u043D\u0433\u04AF\u0439";
      const description = this.getAttribute("desc") || "\u0422\u0430\u043D\u044B \u044D\u043B\u0441\u044D\u0445 \u0445\u04AF\u0441\u044D\u043B\u0442\u0438\u0439\u0433 \u0445\u04AF\u043B\u044D\u044D\u0436 \u0430\u0432\u0441\u0430\u043D \u0431\u0430\u0439\u043D\u0430.";
      this.innerHTML = `
        <article class="request_card">
                    <div class="club_header">
                        <img src="images/club_logo.svg" width="58" height="58" alt="Club Icon"/>
                        <h3>${clubname}</h3>
                    </div>
                    <p class="desc">${description}</p>
                    <button class="btn2">${button2}</button>
                </article>`;
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(name, oldVal, newVal) {
    }
    adoptedCallback() {
    }
  };
  window.customElements.define("nc-clubrequestcard", NcClubRequestCard);

  // js/nc-usercard.js
  var NcUsercard = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      const username = this.getAttribute("uname") || "User Name";
      const userrole = this.getAttribute("urole") || "Member";
      const userbio = this.getAttribute("ubio") || "\u042D\u043D\u0434 \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0438\u0439\u043D \u0442\u043E\u0432\u0447 \u0442\u0430\u043D\u0438\u043B\u0446\u0443\u0443\u043B\u0433\u0430 \u0431\u0438\u0447\u0438\u0433\u0434\u044D\u043D\u044D.";
      this.innerHTML = `
        <div class="user_card">
            <div class="profile_picture">
            <img src="images/user_profile.svg" alt="User Profile Image"/>
            </div>
            
            <div class="info">
                <h1><span class="highlight">\u0413\u0430\u043D\u0442\u0443\u043B\u0433\u0430</span> \u042D\u043D\u0445\u0436\u0438\u043D</h1>
                <div class="user_identity">
                    <div class="border">
                        <img src="images/Book.svg" width="16" height="16" alt="Book Icon"/>
                        <p class="border">\u041C\u0422\u042D\u0421-\u041C\u041A\u0423\u0422</p>
                    </div>
                    <div class="border">
                        <img src="images/Briefcase.svg" width="16" height="16" alt="Briefcase Icon"/>
                        <p class="border">\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u044B\u043D \u0423\u0445\u0430\u0430\u043D</p>
                    </div>
                    <div class="border">
                        <img src="images/Briefcase.svg" width="16" height="16" alt="Briefcase Icon"/>
                        <p class="border">3-\u0440 \u0442\u04AF\u0432\u0448\u0438\u043D</p>
                    </div>
                    <div class="border">
                        <img src="images/Phone.svg" width="16" height="16" alt="Phone Icon"/>
                        <p class="border">\u041C\u0422\u042D\u0421-\u041C\u041A\u0423\u0422</p>
                    </div>
                </div>
                <div class="registered_clubs">
                    <div class="club_name">
                        <img src="images/club_logo.svg" width="24" height="24" alt="Club Icon"/>
                        <h4>Hackum students club</h4>
                    </div>
                    <div class="club_name">
                        <img src="images/club_logo.svg" width="24" height="24" alt="Club Icon"/>
                        <h4>Hackum students club</h4>   
                    </div>
                </div> 
                <p class="desc">\u041C\u044D\u0434\u044D\u044D\u043B\u043B\u0438\u0439\u043D \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439\u043D \u0447\u0438\u0433\u043B\u044D\u043B\u044D\u044D\u0440 \u04AF\u0439\u043B \u0430\u0436\u0438\u043B\u043B\u0430\u0433\u0430\u0430 \u044F\u0432\u0443\u0443\u043B\u0434\u0430\u0433 \u0431\u04E9\u0433\u04E9\u04E9\u0434 \u043E\u044E\u0443\u0442\u043D\u0443\u0443\u0434\u044B\u043D \u043C\u044D\u0434\u043B\u044D\u0433\u0438\u0439\u0433 \u0434\u044D\u044D\u0448\u043B\u04AF\u04AF\u043B\u044D\u0445, \u043F\u0440\u0430\u043A\u0442\u0438\u043A \u0443\u0440 \u0447\u0430\u0434\u0432\u0430\u0440 \u043E\u043B\u0433\u043E\u0445, \u0438\u043D\u043D\u043E\u0432\u0430\u0446 \u0431\u04AF\u0442\u044D\u044D\u0445\u044D\u0434 \u0447\u0438\u0433\u043B\u044D\u0441\u044D\u043D \u04AF\u0439\u043B \u0430\u0436\u0438\u043B\u043B\u0430\u0433\u0430\u0430 \u044F\u0432\u0443\u0443\u043B\u0434\u0430\u0433</p> 
                <details>
                    <summary>
                        \u0414\u044D\u043B\u0433\u044D\u0440\u044D\u043D\u0433\u04AF\u0439
                    </summary>
                    <p class="desc">
                        \u0411\u04AF\u04AF\u0440 \u0434\u044D\u043B\u0433\u044D\u0440\u044D\u043D\u0433\u04AF\u0439 \u0431\u0438\u043E
                    </p>
                </details>
            </div>
            <div class="url">
                <a href ="https://www.facebook.com/enhjinn.g" target="_blank"><img src="images/FB Icon Button.svg" width="36" height="36" alt="facebook Icon"/></a>
                <a href ="https://www.facebook.com/enhjinn.g" target="_blank"><img src="images/IG Icon Button.svg" width="36" height="36" alt="instagram Icon"/></a>
                <a href ="https://www.facebook.com/enhjinn.g" target="_blank"><img src="images/Linkedin Icon Button.svg" width="36" height="36" alt="linkedin Icon"/></a>
            </div> 
        </div> `;
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(name, oldVal, newVal) {
    }
    adoptedCallback() {
    }
  };
  window.customElements.define("nc-usercard", NcUsercard);

  // js/clb-event-card.js
  var ClbEventCard = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      const eventname = this.getAttribute("en") || "-";
      this.innerHTML = `
        <arcticle class="event-card">
                <div class="event-image">\u{1F3B5}</div>
                <div class="event-content">
                    <h3>${eventname}</h3>
                    <p>2025.8.15 16:00-20:00</p>
                </div>
        </arcticle>`;
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(name, oldVal, newVal) {
    }
    adoptedCallback() {
    }
  };
  window.customElements.define("clb-event-card", ClbEventCard);

  // js/nc-Cevent-card.js
  var NcCeventCard = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.innerHTML = `<article class="event-card">
                    <img src="images/event.png" alt="">
                    <header>
                        <label><img src="images/club_logo.svg" alt=""><h4>Hackumx student club</h4></label>
                    </header>
                    <p>\u042D\u0432\u0435\u043D\u0442\u0438\u0439\u043D \u043D\u044D\u0440</p>
                    <p>2025.10.23 18.40</p>
                    <p>\u042D\u0432\u0435\u043D\u0442\u0438\u0439\u043D \u0442\u0443\u0445\u0430\u0439 \u043C\u044D\u0434\u044D\u044D\u043B\u043B\u0438\u0439\u0433 \u0434\u044D\u043B\u0433\u044D\u0440\u044D\u043D\u0433\u04AF\u0439\u0433\u044D\u044D\u0440 \u0442\u0430\u0432\u044C\u0436 \u04E9\u0433\u0447 \u0431\u043E\u043B\u043D\u043E.</p>
                    <p>$1000</p>
                    <button>\u0414\u044D\u043B\u0433\u044D\u0440\u044D\u043D\u0433\u04AF\u0439</button>
                </article>`;
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(name, oldVal, newVal) {
    }
    adoptedCallback() {
    }
  };
  window.customElements.define("nc-cevent-card", NcCeventCard);

  // js/nc-Cfeed-Back.js
  var NcCfeedBack = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.innerHTML = `<article>
                    <img src="images/Rating.svg" alt="">
                    <div id="review">
                        <h3>Review title</h3>
                        <p>Review body</p>
                    </div>
                    <div id="comment-tt">
                        <div><img src="images/comIMG.svg" alt=""></div>
                        <div>
                            <h5>Hackum student club</h5>
                            <p>\u042D.\u0427\u0438\u043D\u0431\u0430\u044F\u0440</p>
                        </div>
                    </div>
                </article>`;
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(name, oldVal, newVal) {
    }
    adoptedCallback() {
    }
  };
  window.customElements.define("nc-cfeed-back", NcCfeedBack);

  // js/theme-toggle.js
  var ThemeToggle = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      const savedTheme = localStorage.getItem("theme") || this.getSystemTheme();
      this.setTheme(savedTheme);
      this.render();
      this.shadowRoot.querySelector("button").addEventListener("click", () => this.toggleTheme());
    }
    getSystemTheme() {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
      return "light";
    }
    toggleTheme() {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      this.setTheme(newTheme);
    }
    setTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
    render() {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const isDark = currentTheme === "dark";
      this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --accent: --var(--border-color);
                }

                button {
                    background: none;
                    border: 1px solid var(--border-color, #e0e0e0);
                    padding: 6px 12px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    transition: all 0.3s ease;
                    color: var(--text-primary, #333);
                }

                button:hover {
                    border-color: var(--accent);
                    color: var(--accent);
                }

                svg {
                    width: 18px;
                    height: 18px;
                    stroke-width: 2;
                }
            </style>

            <button aria-label="Toggle dark/light mode" title="${isDark ? "Light mode" : "Dark mode"}">
                ${isDark ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'}
            </button>
        `;
    }
  };
  if (!customElements.get("theme-toggle")) {
    customElements.define("theme-toggle", ThemeToggle);
  }

  // js/nc-navbar.js
  window.AuthState = {
    isLoggedIn: false,
    currentUser: null,
    init() {
      const saved = localStorage.getItem("user_session");
      if (saved) {
        try {
          const data = JSON.parse(saved);
          this.isLoggedIn = data.isLoggedIn || false;
          this.currentUser = data.currentUser || null;
        } catch (err) {
          console.error("Error parsing user_session:", err);
        }
      }
    },
    login(email) {
      this.isLoggedIn = true;
      this.currentUser = email;
      localStorage.setItem("user_session", JSON.stringify({
        isLoggedIn: true,
        currentUser: email
      }));
      this.notifyListeners();
    },
    logout() {
      this.isLoggedIn = false;
      this.currentUser = null;
      localStorage.removeItem("user_session");
      this.notifyListeners();
    },
    listeners: [],
    subscribe(callback) {
      this.listeners.push(callback);
    },
    notifyListeners() {
      this.listeners.forEach((callback) => callback());
    }
  };
  window.AuthState.init();
  var NcNavbar = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.render();
      window.AuthState.subscribe(() => this.render());
    }
    render() {
      const { isLoggedIn, currentUser } = window.AuthState;
      this.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                nav {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                a.btn, button.btn1, button.btn2 {
                    padding: 8px 12px;
                    border: none;
                    background: transparent;
                    color: var(--text-primary, #000);
                    cursor: pointer;
                    text-decoration: none;
                    font-size: 14px;
                    border-radius: 6px;
                    transition: background 0.2s ease;
                }
                a.btn:hover, button.btn1:hover, button.btn2:hover {
                    background: var(--hover-bg, #f0f0f0);
                }
                button.btn2 {
                    background: var(--primary-color, #007bff);
                    color: white;
                }
                button.btn2:hover {
                    background: var(--primary-hover, #0056b3);
                }
                .user-menu {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .user-email {
                    font-size: 14px;
                    color: var(--text-secondary, #666);
                }
            </style>

            <nav>
                <a class="btn" href="#/clubs">\u041A\u043B\u0443\u0431</a>
                <a class="btn" href="#/events">\u042D\u0432\u0435\u043D\u0442</a>
                <theme-toggle></theme-toggle>

                ${isLoggedIn ? `
                    <div class="user-menu">
                        <span class="user-email">${currentUser}</span>
                        <button class="btn1" onclick="window.AuthState.logout(); window.Router.navigate('/');">\u0413\u0430\u0440\u0430\u0445</button>
                    </div>
                ` : `
                    <button class="btn1" onclick="window.location.hash='#/login'">\u041D\u044D\u0432\u0442\u0440\u044D\u0445</button>
                    <button class="btn2" onclick="window.location.hash='#/register'">\u0411\u04AF\u0440\u0442\u0433\u04AF\u04AF\u043B\u044D\u0445</button>
                `}
            </nav>
        `;
    }
  };
  customElements.define("nc-navbar", NcNavbar);

  // js/nc-login.js
  var NcLogin = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.innerHTML = `
            <style>
                :host { 
                    display: block; 
                    padding: 40px; 
                }
                .login-card{ 
                    max-width: 420px; 
                    margin: 0 auto; 
                    margin-top: 100px;
                    margin-bottom: 100px;
                    allign-items: center;
                    background: var(--card-bg, #fff); 
                    padding: 24px; border-radius: 8px; 
                    box-shadow: 0 6px 18px rgba(0,0,0,0.06); 
                }
                .login-card h2{ 
                    margin: 0 0 16px; 
                    font-size: 20px; 
                    color: var(--text-primary); 
                }
                .login-card label{ 
                    display:block; 
                    margin-bottom:8px; 
                    color: var(--text-secondary); 
                }
                .login-card input{ 
                    width:100%; 
                    padding:10px 12px; 
                    margin-bottom:12px; 
                    border:8px solid var(--border-color); 
                    border-radius:6px; 
                    background: var(--input-bg); 
                    color: var(--input-text); 
                }
                .form-field {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    margin-bottom: 16px;
                    }

                .form-field label {
                    font-size: 14px;
                    font-weight: 500;
                    color: #374151; /* neutral gray */
                }
                .form-field input {
                    height: 36px;
                    width: 90%;
                    padding: 0 12px;
                    font-size: 14px;
                    border-radius: 8px;
                    border: 1px solid #d1d5db;
                    outline: none;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }
                .login-card button{ 
                    width:100%; 
                    padding:10px 12px; 
                    border:none; 
                    background: --var(); 
                    color:white; 
                    border-radius:6px; 
                    cursor:pointer; 
                }
            </style>
            <div class="login-card">
                <h2>\u041D\u044D\u0432\u0442\u0440\u044D\u0445</h2>
                <form id="loginForm">
                    <div class="form-field">
                        <label for="email">\u0418-\u043C\u044D\u0439\u043B</label>
                        <input id="email" name="email" type="email" required />
                    </div>
                    <div class="form-field">
                        <label for="password">\u041D\u0443\u0443\u0446 \u04AF\u0433</label>
                        <input id="password" name="password" type="password" required />
                    </div>
                    <button type="submit">\u041D\u044D\u0432\u0442\u0440\u044D\u0445</button>
                </form>
            </div>
        `;
      this.querySelector("#loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const email = this.querySelector("#email").value;
        if (window.AuthState) {
          window.AuthState.login(email);
        }
        if (window.Router) window.Router.navigate("/");
      });
    }
  };
  if (!customElements.get("nc-login")) {
    customElements.define("nc-login", NcLogin);
  }

  // js/apiclient.js
  var getClubs = async () => {
    try {
      const result = await fetch("http://127.0.0.1:3000/api/clubs");
      if (!result.ok) {
        return { code: 500, data: [] };
      }
      const data = await result.json();
      return { code: 200, data };
    } catch (error) {
      return { code: 500, data: [] };
    }
  };

  // js/nc-clubs-list.js
  var NcClubsList = class extends HTMLElement {
    constructor() {
      super();
      this.items = [];
      this.filters = null;
    }
    async connectedCallback() {
      const result = await getClubs();
      this.items = result && result.data && result.data.clubs ? result.data.clubs : [];
      this.render();
    }
    filter(filters) {
      this.filters = filters;
      this.render();
    }
    render() {
      let clubsToShow = this.items;
      const activeDirections = [];
      const activeSchools = [];
      if (this.filters) {
        this.filters.directions.forEach((checked, id) => {
          if (checked) activeDirections.push(id);
        });
        this.filters.surguuli.forEach((checked, id) => {
          if (checked) activeSchools.push(id);
        });
      }
      if (activeDirections.length > 0) {
        clubsToShow = clubsToShow.filter((club) => {
          const directions = club.directions || [];
          return directions.some((dir) => activeDirections.includes(dir));
        });
      }
      if (activeSchools.length > 0) {
        clubsToShow = clubsToShow.filter((club) => {
          return activeSchools.includes(club.school);
        });
      }
      const container = document.createElement("div");
      container.className = "clubs";
      clubsToShow.forEach((club, idx) => {
        const el = document.createElement("nc-clubcard");
        const name = club.cname || club.name || club.shortName || "Club name";
        const desc = club.desc || club.description || "";
        const img = club.img || club.logo || "";
        const clubId = club.id || String(idx + 1);
        el.setAttribute("cname", name);
        if (desc) el.setAttribute("desc", desc);
        if (img) el.setAttribute("img", img);
        el.setAttribute("club-id", clubId);
        el.setAttribute("data-index", String(idx));
        el.setAttribute("tabindex", "0");
        el.addEventListener("click", () => {
          const detail = { index: idx, cname: name, id: club.id || null };
          this.dispatchEvent(new CustomEvent("club-select", { detail, bubbles: true }));
        });
        el.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("club-select", { detail: { index: idx, cname: name, id: club.id || null }, bubbles: true }));
          }
        });
        container.appendChild(el);
      });
      this.innerHTML = "";
      this.appendChild(container);
    }
  };
  if (!customElements.get("nc-clubs-list")) {
    customElements.define("nc-clubs-list", NcClubsList);
  }

  // js/nc-reg-page.js
  var NcRegistrationPage = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      const clubId = localStorage.getItem("register_club_id") || "1";
      const clubNames = {
        "1": "Hackum",
        "2": "AI Innovators",
        "3": "Web Dev Club",
        "4": "Mobile Club",
        "5": "Data Science",
        "6": "Game Dev",
        "7": "Robotics",
        "8": "Cloud Computing",
        "9": "Cybersecurity"
      };
      const selectedClubName = clubNames[clubId] || "Hackum students club";
      this.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 20px;
                }
                article h2 {
                    text-align: right;
                }
                header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .main {
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                    margin-left: 100px;
                    margin-right: 100px;
                }
                .question {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .question label {
                    font-weight: 500;
                    color: var(--text-primary, #000);
                }
                .question input {
                    padding: 10px 12px;
                    border: 1px solid var(--border-color, #ddd);
                    border-radius: 6px;
                    background: var(--input-bg, #fff);
                    color: var(--input-text, #000);
                    font-size: 14px;
                }
                input[type="submit"] {
                    padding: 12px 20px;
                    background: var(--primary-color, #007bff);
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 500;
                }
                input[type="submit"]:hover {
                    background: var(--primary-hover, #0056b3);
                }
                ol {
                    list-style: decimal;
                    padding-left: 20px;
                }
                li {
                    margin-bottom: 24px;
                }
            </style>

            
        <div class="main">
            <h2>\u042D\u043B\u0441\u044D\u043B\u0442\u0438\u0439\u043D \u0444\u043E\u0440\u043C</h2>
            <h3>${selectedClubName} students club</h3>
            <form id="registrationForm">
                <ol>
                    <li>
                        <section class="question">
                            <label for="email">\u0422\u0430\u043D\u044B \u043C\u044D\u0439\u043B \u0445\u0430\u044F\u0433 (\u04E9\u0434\u04E9\u0440 \u0442\u0443\u0442\u0430\u043C \u0430\u0448\u0438\u0433\u043B\u0430\u0434\u0430\u0433)?</label>
                            <input type="email" name="email" id="email" placeholder="example@email.com" required>
                        </section>
                    </li>
                    <li>
                        <section class="question">
                            <label for="phone">\u0422\u0430\u043D\u044B \u0443\u0442\u0430\u0441\u043D\u044B \u0434\u0443\u0433\u0430\u0430\u0440?</label>
                            <input type="tel" name="phone" id="phone" placeholder="+976 ..." required>
                        </section>
                    </li>
                    <li>
                        <section class="question">
                            <label for="reason">\u0422\u0430 \u044F\u0430\u0433\u0430\u0430\u0434 ${selectedClubName} \u043A\u043B\u0443\u0431\u0442 \u044D\u043B\u0441\u044D\u0445\u0438\u0439\u0433 \u0445\u04AF\u0441\u044D\u0436 \u0431\u0430\u0439\u043D\u0430 \u0432\u044D?</label>
                            <input type="text" name="reason" id="reason" placeholder="\u0425\u0430\u0440\u0438\u0443\u043B\u0442\u0430\u0430 \u043E\u0440\u0443\u0443\u043B\u043D\u0430 \u0443\u0443" required>
                        </section>
                    </li>
                    <li>
                        <section class="question">
                            <label for="impact">\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439\u043D \u043A\u043B\u0443\u0431\u0442 \u043E\u0440\u0441\u043D\u043E\u043E\u0440\u043E\u043E \u0442\u0430\u043D\u044B \u0430\u043C\u044C\u0434\u0440\u0430\u043B, \u043A\u0430\u0440\u044C\u0435\u0440\u0442 \u044F\u043C\u0430\u0440 \u04E9\u04E9\u0440\u0447\u043B\u04E9\u043B\u0442 \u0430\u0432\u0447\u0438\u0440\u043D\u0430 \u0433\u044D\u0436 \u0442\u04E9\u0441\u04E9\u04E9\u043B\u0436 \u0431\u0430\u0439\u0433\u0430\u0430 \u0432\u044D?</label>
                            <input type="text" name="impact" id="impact" placeholder="\u0425\u0430\u0440\u0438\u0443\u043B\u0442\u0430\u0430 \u043E\u0440\u0443\u0443\u043B\u043D\u0430 \u0443\u0443" required>
                        </section>
                    </li>
                    <li>
                        <section class="question">
                            <label for="description">\u04E8\u04E9\u0440\u0438\u0439\u0433\u04E9\u04E9 3 \u04AF\u0433\u044D\u044D\u0440 \u0438\u043B\u044D\u0440\u0445\u0438\u0439\u043B \u0433\u044D\u0432\u044D\u043B?</label>
                            <input type="text" name="description" id="description" placeholder="\u04AE\u0433 1, \u04AE\u0433 2, \u04AE\u0433 3" required>
                        </section>
                    </li>
                </ol>
                <input type="submit" value="\u0418\u043B\u0433\u044D\u044D\u0445">
            </form>
        </div>
        `;
      this.querySelector("#registrationForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = {
          clubId,
          email: this.querySelector("#email").value,
          phone: this.querySelector("#phone").value,
          reason: this.querySelector("#reason").value,
          impact: this.querySelector("#impact").value,
          description: this.querySelector("#description").value
        };
        console.log("Registration submitted:", formData);
        alert("\u042D\u043B\u0441\u044D\u043B\u0442\u044D\u044D \u0430\u043C\u0436\u0438\u043B\u0442\u0430\u0439 \u0438\u043B\u0433\u044D\u044D\u0441\u044D\u043D \u0431\u043E\u043B\u043D\u043E. \u0411\u0430\u044F\u0440\u043B\u0430\u043B\u0430\u0430!");
        localStorage.removeItem("register_club_id");
        if (window.Router) window.Router.navigate("/");
      });
    }
  };
  window.customElements.define("nc-reg-page", NcRegistrationPage);

  // js/nc-club-filter.js
  var NcClubFilter = class extends HTMLElement {
    constructor() {
      super();
      this.filters = { directions: /* @__PURE__ */ new Map(), surguuli: /* @__PURE__ */ new Map() };
    }
    connectedCallback() {
      this.innerHTML = `
                <div class="sidebar">
                    <h2>\u041A\u043B\u0443\u0431\u0438\u0439\u043D \u0447\u0438\u0433\u043B\u044D\u043B</h2>
                    <form class="directions">
                        <h4>\u0427\u04E9\u043B\u04E9\u04E9\u0442</h4>
                        <nc-form id="volunteer" label="\u0421\u0430\u0439\u043D \u0434\u0443\u0440\u044B\u043D"></nc-form>
                        <nc-form id="sport" label="\u0421\u043F\u043E\u0440\u0442"></nc-form>
                        <nc-form id="art" label="\u0423\u0440\u043B\u0430\u0433"></nc-form>
                        <nc-form id="humanitarian" label="\u0427\u04E9\u043B\u04E9\u04E9\u0442"></nc-form>
                        <nc-form id="photo" label="\u0424\u043E\u0442\u043E \u0437\u0443\u0440\u0430\u0433"></nc-form>
                        <nc-form id="science" label="\u0428\u0438\u043D\u0436\u043B\u044D\u0445 \u0443\u0445\u0430\u0430\u043D"></nc-form>
                        <nc-form id="it" label="\u041C\u044D\u0434\u044D\u044D\u043B\u043B\u0438\u0439\u043D \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438"></nc-form>
                        <nc-form id="language" label="\u0425\u044D\u043B \u0441\u0443\u0434\u043B\u0430\u043B"></nc-form>
                    </form>
                    <form class="schools">
                        <h4>\u0421\u0443\u0440\u0433\u0443\u0443\u043B\u044C</h4>
                        <nc-form id="bs" name="business" label="\u0411\u0421"></nc-form>
                        <nc-form id="its" name="its" label="\u0418\u0422\u0421"></nc-form>
                        <nc-form id="mtes" name="mtes" label="\u041C\u0422\u042D\u0421"></nc-form>
                        <nc-form id="uts" name="olonuls" label="\u0423\u0422\u0421\u041E\u0423\u0425\u041D\u0423\u0421"></nc-form>
                        <nc-form id="khs" name="huuli" label="\u0425\u0417\u0421"></nc-form>
                        <nc-form id="shus" name="shus" label="\u0428\u0423\u0421"></nc-form>
                    </form>
                </div>`;
      this.querySelectorAll('form[class="directions"] nc-form').forEach((fe) => {
        fe.addEventListener("change", (ev) => {
          const id = fe.getAttribute("id");
          const checked = ev.target.checked;
          this.filters.directions.set(id, checked);
          this.inform();
        });
      });
      this.querySelectorAll('form[class="schools"] nc-form').forEach((fe) => {
        fe.addEventListener("change", (ev) => {
          const id = fe.getAttribute("id");
          const checked = ev.target.checked;
          this.filters.surguuli.set(id, checked);
          this.inform();
        });
      });
    }
    inform() {
      const list = document.querySelector("nc-clubs-list");
      if (list && typeof list.filter === "function") {
        list.filter(this.filters);
      }
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(name, oldVal, newVal) {
    }
    adoptedCallback() {
    }
  };
  window.customElements.define("nc-club-filter", NcClubFilter);
})();

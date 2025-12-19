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
                        <div class="pagination-previous">
                            <img src="images/Arrow Left.svg" alt="Previous" />
                            \u04E8\u043C\u043D\u04E9\u0445
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
                            \u0414\u0430\u0440\u0430\u0430\u0433\u0438\u0439\u043D
                            <img src="images/Arrow Right.svg" alt="Next" />
                        </div>
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
    async connectedCallback() {
      await this.loadAndRender();
    }
    async loadAndRender() {
      let clubs = [];
      try {
        const response = await fetch("http://127.0.0.1:3000/api/clubs");
        if (response.ok) {
          const data = await response.json();
          clubs = data.clubs || [];
        }
      } catch (error) {
        console.error("Failed to load clubs from API:", error);
      }
      if (clubs.length === 0) {
        try {
          const response = await fetch("/json/Club.json");
          if (response.ok) {
            const data = await response.json();
            clubs = data.clubs || [];
          }
        } catch (error) {
          console.error("Failed to load clubs from JSON:", error);
        }
      }
      const displayClubs = clubs.slice(0, 6);
      this.render(displayClubs);
    }
    render(clubs) {
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

                <div class="clubs-grid" id="clubsGrid">
                    ${clubs
                      .map(
                        (club) => `
                        <div class="club-card" data-club-id="${club.id}">
                            <button class="club-favorite">\u2661</button>
                            <div class="club-header">
                                <div class="club-icon">\u{1F4DA}</div>
                                <div class="club-info">
                                    <h3>${club.name || club.shortName}</h3>
                                    <p class="club-category">${club.school || "\u041A\u043B\u0443\u0431"}</p>
                                </div>
                            </div>
                            <p class="club-description">${club.description || "\u041A\u043B\u0443\u0431\u044B\u043D \u0442\u0430\u0439\u043B\u0431\u0430\u0440 \u0431\u0430\u0439\u0445\u0433\u04AF\u0439"}</p>
                            <button class="btn-join" onclick="window.location.hash='#/club/${club.id}'">\u0414\u042D\u041B\u0413\u042D\u0420\u042D\u041D\u0413\u04AE\u0419</button>
                        </div>
                    `,
                      )
                      .join("")}
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
    async connectedCallback() {
      const clubId = this.getAttribute("id") || "1";
      await this.loadAndRender(clubId);
    }
    async loadAndRender(clubId) {
      let club = null;
      try {
        const response = await fetch("http://127.0.0.1:3000/api/clubs");
        if (response.ok) {
          const data = await response.json();
          const clubs = data.clubs || [];
          const foundClub = clubs.find((c) => c.id == clubId);
          if (foundClub) {
            club = {
              name:
                foundClub.name ||
                foundClub.shortName ||
                "\u041A\u043B\u0443\u0431",
              logo: foundClub.logo || "images/club_logo.svg",
              tags: foundClub.directions || [],
              email: foundClub.email || "club@num.edu.mn",
              phone: foundClub.phone || "66191111",
              goal:
                foundClub.description ||
                "\u041A\u043B\u0443\u0431\u044B\u043D \u0442\u0430\u0439\u043B\u0431\u0430\u0440 \u0431\u0430\u0439\u0445\u0433\u04AF\u0439",
              vision:
                foundClub.vision ||
                "\u041A\u043B\u0443\u0431\u044B\u043D \u0430\u043B\u0441\u044B\u043D \u0445\u0430\u0440\u0430\u0430",
              category: foundClub.school || "\u0411\u0443\u0441\u0430\u0434",
              memberCount: foundClub.members ? `${foundClub.members}+` : "50+",
            };
          }
        }
      } catch (error) {
        console.error("Failed to load club data from API:", error);
      }
      if (!club) {
        try {
          const response = await fetch("/json/Club.json");
          if (response.ok) {
            const data = await response.json();
            const clubs = data.clubs || [];
            const foundClub = clubs.find((c) => c.id == clubId);
            if (foundClub) {
              club = {
                name:
                  foundClub.name ||
                  foundClub.shortName ||
                  "\u041A\u043B\u0443\u0431",
                logo: foundClub.logo || "images/club_logo.svg",
                tags: foundClub.directions || [],
                email: foundClub.email || "club@num.edu.mn",
                phone: foundClub.phone || "66191111",
                goal:
                  foundClub.description ||
                  "\u041A\u043B\u0443\u0431\u044B\u043D \u0442\u0430\u0439\u043B\u0431\u0430\u0440 \u0431\u0430\u0439\u0445\u0433\u04AF\u0439",
                vision:
                  foundClub.vision ||
                  "\u041A\u043B\u0443\u0431\u044B\u043D \u0430\u043B\u0441\u044B\u043D \u0445\u0430\u0440\u0430\u0430",
                category: foundClub.school || "\u0411\u0443\u0441\u0430\u0434",
                memberCount: foundClub.members
                  ? `${foundClub.members}+`
                  : "50+",
              };
            }
          }
        } catch (error) {
          console.error("Failed to load club data from JSON:", error);
        }
      }
      if (!club) {
        club = {
          name: "\u041A\u043B\u0443\u0431",
          logo: "images/club_logo.svg",
          tags: ["NUM"],
          email: "club@num.edu.mn",
          phone: "66191111",
          goal: "\u041A\u043B\u0443\u0431\u044B\u043D \u0442\u0430\u0439\u043B\u0431\u0430\u0440 \u0431\u0430\u0439\u0445\u0433\u04AF\u0439",
          vision:
            "\u041A\u043B\u0443\u0431\u044B\u043D \u0430\u043B\u0441\u044B\u043D \u0445\u0430\u0440\u0430\u0430",
          category: "\u0411\u0443\u0441\u0430\u0434",
          memberCount: "50+",
        };
      }
      this.render(club, clubId);
    }
    render(club, clubId) {
      this.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                
                .page-product {
                    background-color: white;
                    padding: 64px 100px;
                }
                
                .section {
                    display: flex;
                    gap: 64px;
                    align-items: flex-start;
                }
                
                .image img {
                    width: 250px;
                    height: 250px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 1px solid var(--border-color, #e5e7eb);
                }
                
                .column {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }
                
                .full-name {
                    font-size: 48px;
                    font-weight: 700;
                    color: var(--text-primary, #1e1e1e);
                    margin-bottom: 16px;
                }
                
                .frame {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                
                .tag-toggle {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 8px;
                    background-color: #2c2c2c;
                    color: white;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    border: 1px solid black;
                }
                
                .tag-toggle img {
                    width: 16px;
                    height: 16px;
                }
                
                .accordion {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    margin-top: 25px;
                }
                
                .accordion-item,
                .accordion-title-wrapper {
                    border: 1px solid #D9D9D9;
                    border-radius: 8px;
                    background-color: #F5F5F5;
                    min-height: 54px;
                }
                
                .accordion-item[open] {
                    background-color: white;
                }
                
                .accordion-title,
                .accordion-title-2 {
                    padding: 16px;
                    font-weight: 600;
                    font-size: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                }
                
                .accordion-title img,
                .accordion-title-2 img {
                    transition: transform 0.3s ease;
                }
                
                .accordion-item[open] .accordion-title img {
                    transform: rotate(180deg);
                }
                
                .accordion-content {
                    padding: 0 16px 16px 16px;
                    color: var(--text-secondary, #6b7280);
                    font-size: 16px;
                    line-height: 1.6;
                }
                
                .frame-2 {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }
                
                .frame-3 {
                    display: flex;
                    gap: 12px;
                }
                
                .frame-3 div {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid var(--border-color, #e5e7eb);
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                }
                
                .frame-3 div:hover {
                    background-color: var(--bg-secondary, #f5f5f5);
                }
                
                .frame-3 img {
                    width: 20px;
                    height: 20px;
                }
                
                .frame-4 {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                .text-content-heading .heading {
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--text-secondary, #6b7280);
                    margin-bottom: 8px;
                }
                
                .frame-5 {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .avatar,
                .avatar-2,
                .avatar-3,
                .avatar-4 {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: #e5e7eb;
                    border: 2px solid white;
                }
                
                .div-2 {
                    display: flex;
                    margin-left: -12px;
                }
                
                .div-2 .avatar-2,
                .div-2 .avatar-3,
                .div-2 .avatar-4 {
                    margin-left: -12px;
                }
                
                .overflow {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: #2c2c2c;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: 600;
                    margin-left: -12px;
                    border: 2px solid white;
                }
                
                /* Activities Section */
                .card-grid-content {
                    padding: 64px 100px;
                    background-color: var(--bg-secondary, #f5f5f5);
                }
                
                .card-grid-content .heading-2 {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 24px;
                }
                
                .frame-6 {
                    display: flex;
                    gap: 25px;
                    flex-wrap: wrap;
                }
                
                .card,
                .frame-wrapper,
                .div-wrapper,
                .card-2,
                .card-3,
                .card-4 {
                    border: 1px solid #D9D9D9;
                    background-color: white;
                    width: 340.33px;
                    height: 32px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    padding: 24px;
                    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
                }
                
                .text-wrapper-3 {
                    font-size: 16px;
                    font-weight: 600;
                }
                
                /* Join Section */
                .card-grid {
                    padding: 64px 100px;
                    background-color: white;
                }
                
                .card-grid .heading-3 {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 10px;
                }
                
                .card-grid .subheading,
                .card-grid .subheading-2 {
                    font-size: 16px;
                    color: #757575;
                    margin-bottom: 24px;
                }
                
                .button {
                    width: 98%;
                    height: 40px;
                    border-radius: 8px;
                    color: white;
                    background-color: #1e1e1e;
                    border: none;
                    cursor: pointer;
                    margin-top: 24px;
                    font-size: 16px;
                    transition: background-color 0.2s ease;
                }
                
                .button:hover {
                    background-color: #2a2a2a;
                }
                
                /* Events Section */
                .card-grid-content-2 {
                    padding: 64px 100px;
                    background-color: white;
                }
                
                .card-grid-content-2 .heading-3 {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 0;
                }
                
                .frame-7 {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 24px;
                    margin-top: 24px;
                }
                
                /* Review Section */
                .card-grid-2 {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 24px;
                    margin-top: 48px;
                }
                
                .review-card,
                .review-card-wrapper,
                .review-card-3,
                .review-card-4,
                .review-card-5,
                .review-card-6 {
                    padding: 24px;
                    background-color: white;
                    border: 1px solid #D9D9D9;
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                .review-card-2 {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                .review-card img.img-4 {
                    width: 116px;
                    height: 20px;
                }
                
                .review-card-2 .div-2 {
                    display: flex;
                    gap: 4px;
                }
                
                .review-card-2 .div-2 img {
                    width: 20px;
                    height: 20px;
                }
                
                .review-body {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                .text-heading,
                .text-heading-2 {
                    font-size: 24px;
                    font-weight: 600;
                    margin: 0;
                }
                
                .review-body .text {
                    color: var(--text-secondary, #6b7280);
                }
                
                .avatar-block {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .shape-wrapper,
                .avatar-5,
                .avatar-6,
                .avatar-7,
                .avatar-8,
                .avatar-9 {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background-color: #e5e7eb;
                    border: 1px solid #D9D9D9;
                    overflow: hidden;
                }
                
                .shape-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .info {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }
                
                .title-6 {
                    font-size: 14px;
                    font-weight: 600;
                    color: #757575;
                    margin: 0;
                }
                
                .description,
                .description-2 {
                    font-size: 12px;
                    color: #B3B3B3;
                    margin: 0;
                }
                
                @media (max-width: 1024px) {
                    .page-product,
                    .card-grid-content,
                    .card-grid,
                    .card-grid-content-2 {
                        padding: 48px 32px;
                    }
                    
                    .section {
                        flex-direction: column;
                        gap: 32px;
                    }
                    
                    .frame-7,
                    .card-grid-2 {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                }
                
                @media (max-width: 640px) {
                    .page-product,
                    .card-grid-content,
                    .card-grid,
                    .card-grid-content-2 {
                        padding: 32px 16px;
                    }
                    
                    .image img {
                        width: 150px;
                        height: 150px;
                    }
                    
                    .full-name {
                        font-size: 32px;
                    }
                    
                    .frame-7,
                    .card-grid-2 {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <div class="page-product">
                <div class="section">
                    <div class="image">
                        <img src="${club.logo}" alt="${club.name} Logo">
                    </div>
                    <div class="column">
                        <div>
                            <div class="full-name">${club.name} students club</div>
                            <div class="frame">
                                ${club.tags
                                  .map(
                                    (tag) => `
                                    <div class="tag-toggle">
                                        <img src="images/Book.svg" alt="">
                                        <div class="title-2">${tag}</div>
                                    </div>
                                `,
                                  )
                                  .join("")}
                                <div class="tag-toggle">
                                    <img src="images/mail.svg" alt="">
                                    <div class="title-2">${club.email}</div>
                                </div>
                                <div class="tag-toggle">
                                    <img src="images/phone.svg" alt="">
                                    <div class="title-2">${club.phone}</div>
                                </div>
                            </div>
                        </div>
                        <div class="accordion">
                            <details class="accordion-item" open>
                                <summary class="accordion-title">
                                    <div class="title-4">\u0417\u043E\u0440\u0438\u043B\u0433\u043E</div>
                                    <img src="images/Chevron up.svg" alt="">
                                </summary>
                                <div class="accordion-content">
                                    <p class="body">${club.goal}</p>
                                </div>
                            </details>
                            <div class="accordion-title-wrapper">
                                <div class="accordion-title-2" onclick="this.parentElement.querySelector('details') ? null : (this.parentElement.innerHTML = '<details class=\\'accordion-item\\'><summary class=\\'accordion-title\\'><div>\u0410\u043B\u0441\u044B\u043D \u0445\u0430\u0440\u0430\u0430</div><img src=\\'images/Chevron up.svg\\'></summary><div class=\\'accordion-content\\'><p>${club.vision}</p></div></details>')">
                                    <div class="title-5">\u0410\u043B\u0441\u044B\u043D \u0445\u0430\u0440\u0430\u0430</div>
                                    <img src="images/Chevron up.svg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="frame-2">
                        <div class="frame-3">
                            <div class="facebook-wrapper"><img src="images/FB Icon Button.svg" alt="Facebook"></div>
                            <div class="instagram-wrapper"><img src="images/IG Icon Button.svg" alt="Instagram"></div>
                            <div class="youtube-wrapper"><img src="images/youtubeIcon.svg" alt="YouTube"></div>
                            <div class="globe-wrapper"><img src="images/Linkedin Icon Button.svg" alt="Website"></div>
                        </div>
                        <div class="frame-4">
                            <div class="text-content-heading"><div class="heading">\u0413\u0438\u0448\u04AF\u04AF\u0434, \u0442\u04E9\u0433\u0441\u04E9\u0433\u0447\u0438\u0434</div></div>
                            <div class="frame-5">
                                <div class="avatar"></div>
                                <div class="div-2">
                                    <div class="avatar-2"></div>
                                    <div class="avatar-3"></div>
                                    <div class="avatar-4"></div>
                                    <div class="overflow"><div class="initials">+1</div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-grid-content">
                <div class="text-content-heading"><div class="heading-2">\u04AE\u0439\u043B \u0430\u0436\u0438\u043B\u043B\u0430\u0433\u0430\u0430</div></div>
                <div class="frame-6">
                    <div class="card">
                        <div class="frame-5"><div class="text-wrapper-3">Tech Meetup</div></div>
                    </div>
                    <div class="frame-wrapper">
                        <div class="frame-5"><div class="text-wrapper-3">Workshop</div></div>
                    </div>
                    <div class="div-wrapper">
                        <div class="frame-5"><div class="text-wrapper-3">Knowledge Day</div></div>
                    </div>
                    <div class="card-2">
                        <div class="frame-5"><div class="text-wrapper-3">Hackathon</div></div>
                    </div>
                    <div class="card-3">
                        <div class="frame-5"><div class="text-wrapper-3">Pitch Night</div></div>
                    </div>
                    <div class="card-4">
                        <div class="frame-5"><div class="text-wrapper-3">Quiz Night</div></div>
                    </div>
                </div>
            </div>

            <div class="card-grid">
                <div class="text-content-heading">
                    <div class="heading-3">\u0413\u0438\u0448\u04AF\u04AF\u043D\u044D\u044D\u0440 \u044D\u043B\u0441\u044D\u0445</div>
                    <div class="subheading">\u0428\u0430\u043B\u0433\u0443\u0443\u0440\u0443\u0443\u0434</div>
                </div>
                <button class="button" onclick="window.location.hash='#/registration'; localStorage.setItem('register_club_id', '${clubId}');">
                    <div class="button-2">\u0413\u0438\u0448\u04AF\u04AF\u043D\u044D\u044D\u0440 \u044D\u043B\u0441\u044D\u0445</div>
                </button>
            </div>

            <div class="card-grid-content-2">
                <div class="text-content-heading">
                    <div class="heading-3">\u042D\u0432\u0435\u043D\u0442\u04AF\u04AF\u0434</div>
                    <div class="subheading-2">\u0422\u0430\u043D\u0434 \u0441\u0430\u043D\u0430\u043B \u0431\u043E\u043B\u0433\u043E\u0445</div>
                </div>
                <div class="frame-7">
                    <nc-eventcard></nc-eventcard>
                    <nc-eventcard></nc-eventcard>
                    <nc-eventcard></nc-eventcard>
                </div>
            </div>

            <div class="card-grid">
                <div class="text-content-heading">
                    <div class="heading-3">\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B</div>
                    <div class="subheading-2">\u0422\u04E9\u0433\u0441\u04E9\u0433\u0447\u0438\u0434\u0438\u0439\u043D \u04AF\u043B\u0434\u044D\u044D\u0441\u044D\u043D \u0441\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B</div>
                </div>
                <div class="card-grid-2">
                    <div class="review-card">
                        <div class="review-card-2">
                            <img class="img-4" src="images/Rating.svg" alt="Rating">
                            <div class="review-body">
                                <div class="div-wrapper-2"><div class="text-heading">Review title</div></div>
                                <div class="text"><div class="text-5">Review body</div></div>
                            </div>
                            <div class="avatar-block">
                                <div class="shape-wrapper"><img class="shape" src="images/club_logo.svg" alt="Avatar"></div>
                                <div class="info">
                                    <p class="title-6">${club.name} students club</p>
                                    <div class="description">\u0413. \u042D\u043D\u0445\u0436\u0438\u043D</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="review-card-wrapper">
                        <div class="review-card-2">
                            <div class="div-2">
                                <img src="images/Star.svg" alt="Star">
                                <img src="images/Star.svg" alt="Star">
                                <img src="images/Star.svg" alt="Star">
                                <img src="images/Star.svg" alt="Star">
                                <img src="images/Star.svg" alt="Star">
                            </div>
                            <div class="review-body">
                                <div class="div-wrapper-2"><div class="text-heading-2">Review title</div></div>
                                <div class="text"><div class="text-5">Review body</div></div>
                            </div>
                            <div class="avatar-block">
                                <div class="avatar-5"></div>
                                <div class="info">
                                    <div class="title-6">${club.name} students club</div>
                                    <div class="description-2">\u0413. \u042D\u043D\u0445\u0436\u0438\u043D</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="review-card-3">
                        <div class="review-card-2">
                            <div class="div-2">
                                <img src="images/Star.svg" alt="Star">
                                <img src="images/Star.svg" alt="Star">
                                <img src="images/Star.svg" alt="Star">
                                <img src="images/Star.svg" alt="Star">
                                <img src="images/Star.svg" alt="Star">
                            </div>
                            <div class="review-body">
                                <div class="div-wrapper-2"><div class="text-heading-2">Review title</div></div>
                                <div class="text"><div class="text-5">Review body</div></div>
                            </div>
                            <div class="avatar-block">
                                <div class="avatar-6"></div>
                                <div class="info">
                                    <div class="title-6">${club.name} students club</div>
                                    <div class="description-2">\u0413. \u042D\u043D\u0445\u0436\u0438\u043D</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="review-card-4">
                        <div class="review-card-2">
                            <div class="div-2">
                                <img src="images/Star.svg" alt="Star">
                                <img src="images/Star.svg" alt="Star">
                                <img src="images/Star.svg" alt="Star">
                                <img src="images/Star.svg" alt="Star">
                                <img src="images/Star.svg" alt="Star">
                            </div>
                            <div class="review-body">
                                <div class="div-wrapper-2"><div class="text-heading-2">Review title</div></div>
                                <div class="text"><div class="text-5">Review body</div></div>
                            </div>
                            <div class="avatar-block">
                                <div class="avatar-7"></div>
                                <div class="info">
                                    <div class="title-6">${club.name} students club</div>
                                    <div class="description-2">\u0413. \u042D\u043D\u0445\u0436\u0438\u043D</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="review-card-5">
                        <div class="review-card-2">
                            <div class="div-2">
                                <img src="images/Star.svg" alt="Star">
                                <img src="images/Star.svg" alt="Star">
                                <img src="images/Star.svg" alt="Star">
                                <img src="images/Star.svg" alt="Star">
                                <img src="images/Star.svg" alt="Star">
                            </div>
                            <div class="review-body">
                                <div class="div-wrapper-2"><div class="text-heading-2">Review title</div></div>
                                <div class="text"><div class="text-5">Review body</div></div>
                            </div>
                            <div class="avatar-block">
                                <div class="avatar-8"></div>
                                <div class="info">
                                    <div class="title-6">${club.name} students club</div>
                                    <div class="description-2">\u0413. \u042D\u043D\u0445\u0436\u0438\u043D</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="review-card-6">
                        <div class="review-card-2">
                            <div class="div-2">
                                <img src="images/Star.svg" alt="Star">
                                <img src="images/Star.svg" alt="Star">
                                <img src="images/Star.svg" alt="Star">
                                <img src="images/Star.svg" alt="Star">
                                <img src="images/Star.svg" alt="Star">
                            </div>
                            <div class="review-body">
                                <div class="div-wrapper-2"><div class="text-heading-2">Review title</div></div>
                                <div class="text"><div class="text-5">Review body</div></div>
                            </div>
                            <div class="avatar-block">
                                <div class="avatar-9"></div>
                                <div class="info">
                                    <div class="title-6">${club.name} students club</div>
                                    <div class="description-2">\u0413. \u042D\u043D\u0445\u0436\u0438\u043D</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
      const description =
        this.getAttribute("desc") ||
        "\u041C\u044D\u0434\u044D\u044D\u043B\u043B\u0438\u0439\u043D \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439\u043D \u0447\u0438\u0433\u043B\u044D\u043B\u044D\u044D\u0440 \u04AF\u0439\u043B \u0430\u0436\u0438\u043B\u043B\u0430\u0433\u0430\u0430 \u044F\u0432\u0443\u0443\u043B\u0434\u0430\u0433 \u0431\u04E9\u0433\u04E9\u04E9\u0434 \u043E\u044E\u0443\u0442\u043D\u0443\u0443\u0434\u044B\u043D \u043C\u044D\u0434\u043B\u044D\u0433\u0438\u0439\u0433 \u0434\u044D\u044D\u0448\u043B\u04AF\u04AF\u043B\u044D\u0445, \u043F\u0440\u0430\u043A\u0442\u0438\u043A \u0443\u0440 \u0447\u0430\u0434\u0432\u0430\u0440 \u043E\u043B\u0433\u043E\u0445, \u0438\u043D\u043D\u043E\u0432\u0430\u0446 \u0431\u04AF\u0442\u044D\u044D\u0445\u044D\u0434 \u0447\u0438\u0433\u043B\u044D\u0441\u044D\u043D \u04AF\u0439\u043B \u0430\u0436\u0438\u043B\u043B\u0430\u0433\u0430\u0430 \u044F\u0432\u0443\u0443\u043B\u0434\u0430\u0433";
      const button1 =
        this.getAttribute("btn1") || "\u042D\u043B\u0441\u044D\u0445";
      const button2 =
        this.getAttribute("btn2") ||
        "\u0414\u044D\u043B\u0433\u044D\u0440\u044D\u043D\u0433\u04AF\u0439";
      const imgSrc =
        this.getAttribute("img") ||
        this.getAttribute("logo") ||
        "images/event.png";
      const imgAlt = this.getAttribute("img-alt") || clubname;
      const clubId =
        this.getAttribute("club-id") || this.getAttribute("data-index") || "1";
      this.innerHTML = `
        <article class="club_card">
            <div class="club_name">
                <img src="${imgSrc}" alt="${imgAlt}" class="club-card-img" style="width:58px;height:58px;object-fit:cover;border:1px solid var(--color-gray);box-shadow:0px 4px 16px rgba(0,0,0,0.06);cursor:pointer;">
                <h3>${clubname}</h3>
            </div>
            <p class="desc">${description}</p>
            <div class="buttons">
                <button class="btn1" data-club-id="${clubId}">${button1}</button>
                <button class="btn2" data-club-id="${clubId}">${button2}</button>
            </div>
        </article>`;
      const img = this.querySelector(".club-card-img");
      if (img) {
        img.addEventListener("click", (e) => {
          e.stopPropagation();
          try {
            const clubInfo = {
              id: clubId,
              name: clubname,
              logo: imgSrc,
              description,
            };
            localStorage.setItem("current_club_data", JSON.stringify(clubInfo));
          } catch (err) {
            console.error("Failed to store club data:", err);
          }
          if (window.Router) {
            window.Router.navigate(`/club/${clubId}`);
          } else {
            window.location.hash = `#/club/${clubId}`;
          }
        });
      }
      const btn2 = this.querySelector(".btn2");
      if (btn2) {
        btn2.addEventListener("click", (e) => {
          e.stopPropagation();
          const id = btn2.getAttribute("data-club-id");
          try {
            const clubInfo = {
              id,
              name: clubname,
              logo: imgSrc,
              description,
            };
            localStorage.setItem("current_club_data", JSON.stringify(clubInfo));
          } catch (err) {
            console.error("Failed to store club data:", err);
          }
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
          const id =
            btn1.getAttribute("data-club-id") ||
            clubId ||
            this.getAttribute("data-index") ||
            "1";
          try {
            localStorage.setItem("register_club_id", id);
            localStorage.setItem("register_club_name", clubname);
          } catch (err) {}
          if (window.Router) {
            window.Router.navigate("/registration");
          } else {
            window.location.hash = "#/registration";
          }
        });
      }
    }
    disconnectedCallback() {}
    attributeChangedCallback(name, oldVal, newVal) {}
    adoptedCallback() {}
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
      const label =
        this.getAttribute("label") || "\u0427\u0438\u0433\u043B\u044D\u043B";
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
      const description =
        this.getAttribute("desc") ||
        "\u042D\u0432\u0435\u043D\u0442\u0438\u0439\u043D \u0442\u0443\u0445\u0430\u0439 \u043C\u044D\u0434\u044D\u044D\u043B\u043B\u0438\u0439\u0433 \u0434\u044D\u043B\u0433\u044D\u0440\u044D\u043D\u0433\u04AF\u0439\u0433\u044D\u044D\u0440 \u0442\u0430\u0439\u043B\u0431\u0430\u0440\u043B\u0430\u0436 \u04E9\u0433\u0447 \u0431\u043E\u043B\u043D\u043E";
      const price = this.getAttribute("price") || "\u20AE10,000";
      const button1 = this.getAttribute("btn1");
      const button2 =
        this.getAttribute("btn2") ||
        "\u0414\u044D\u043B\u0433\u044D\u0440\u044D\u043D\u0433\u04AF\u0439";
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
            <div class="buttons ${button1 ? "both" : "single"}">
                ${button1 ? `<button class="btn1">${button1}</button>` : ""}    
                <button class="btn2">${button2}</button>
            </div>
        </div>`;
    }
    disconnectedCallback() {}
    attributeChangedCallback(name, oldVal, newVal) {}
    adoptedCallback() {}
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
      const button1 =
        this.getAttribute("btn1") || "\u042D\u043B\u0441\u044D\u0445";
      const button2 =
        this.getAttribute("btn2") ||
        "\u0414\u044D\u043B\u0433\u044D\u0440\u044D\u043D\u0433\u04AF\u0439";
      const description =
        this.getAttribute("desc") ||
        "\u0422\u0430\u043D\u044B \u044D\u043B\u0441\u044D\u0445 \u0445\u04AF\u0441\u044D\u043B\u0442\u0438\u0439\u0433 \u0445\u04AF\u043B\u044D\u044D\u0436 \u0430\u0432\u0441\u0430\u043D \u0431\u0430\u0439\u043D\u0430.";
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
    disconnectedCallback() {}
    attributeChangedCallback(name, oldVal, newVal) {}
    adoptedCallback() {}
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
      const userbio =
        this.getAttribute("ubio") ||
        "\u042D\u043D\u0434 \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447\u0438\u0439\u043D \u0442\u043E\u0432\u0447 \u0442\u0430\u043D\u0438\u043B\u0446\u0443\u0443\u043B\u0433\u0430 \u0431\u0438\u0447\u0438\u0433\u0434\u044D\u043D\u044D.";
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
    disconnectedCallback() {}
    attributeChangedCallback(name, oldVal, newVal) {}
    adoptedCallback() {}
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
    disconnectedCallback() {}
    attributeChangedCallback(name, oldVal, newVal) {}
    adoptedCallback() {}
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
    disconnectedCallback() {}
    attributeChangedCallback(name, oldVal, newVal) {}
    adoptedCallback() {}
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
    disconnectedCallback() {}
    attributeChangedCallback(name, oldVal, newVal) {}
    adoptedCallback() {}
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
      this.shadowRoot
        .querySelector("button")
        .addEventListener("click", () => this.toggleTheme());
    }
    getSystemTheme() {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return "dark";
      }
      return "light";
    }
    toggleTheme() {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      this.setTheme(newTheme);
    }
    setTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
    render() {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light";
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

  // js/nc-header.js
  var NcHeader = class extends HTMLElement {
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
  };
  customElements.define("nc-header", NcHeader);

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
      localStorage.setItem(
        "user_session",
        JSON.stringify({
          isLoggedIn: true,
          currentUser: email,
        }),
      );
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
    },
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
                    border: 1px solid var(--border-color);
                    background: transparent;
                    color: var(--text-primary, #000);
                    cursor: pointer;
                    text-decoration: none;
                    font-size: 14px;
                    border-radius: 6px;
                    transition: background 0.2s ease;
                    white-space: nowrap;
                    min-width: fit-content;
                    box-sizing: border-box;
                }
                a.btn {
                    border: none;
                }
                a.btn:hover, button.btn1:hover {
                    background: var(--color-gray, #f0f0f0);
                }
                button.btn2 {
                    background: #1e1e1e;
                    color: white;
                    border-color: #1e1e1e;
                }
                button.btn2:hover {
                    background: var(--color-secondary);
                }
                .user-menu {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .user-profile-icon {
                    width: 32px;
                    height: 32px;
                    cursor: pointer;
                    border-radius: 50%;
                    transition: opacity 0.2s ease;
                }
                .user-profile-icon:hover {
                    opacity: 0.8;
                }
            </style>

            <nav>
                <a class="btn" href="#/clubs">\u041A\u043B\u0443\u0431</a>
                <a class="btn" href="#/events">\u042D\u0432\u0435\u043D\u0442</a>
                <!-- <theme-toggle></theme-toggle> -->

                ${
                  isLoggedIn
                    ? `
                    <div class="user-menu">
                        <img src="images/userprofile.svg" alt="User Profile" class="user-profile-icon" onclick="window.location.hash='#/user-profile'">
                        <button class="btn1" onclick="window.AuthState.logout(); window.Router.navigate('/');">\u0413\u0430\u0440\u0430\u0445</button>
                    </div>
                `
                    : `
                    <button class="btn1" onclick="window.location.hash='#/login'">\u041D\u044D\u0432\u0442\u0440\u044D\u0445</button>
                    <button class="btn2" onclick="window.location.hash='#/register'">\u0411\u04AF\u0440\u0442\u0433\u04AF\u04AF\u043B\u044D\u0445</button>
                `
                }
            </nav>
        `;
    }
  };
  customElements.define("nc-navbar", NcNavbar);

  // js/nc-footer.js
  var NcFooter = class extends HTMLElement {
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
                <p>\u0425\u043E\u043B\u0431\u043E\u0433\u0434\u043E\u0445 \u0434\u0443\u0433\u0430\u0430\u0440: +976 9999 9999</p>
            </footer>
        `;
    }
  };
  customElements.define("nc-footer", NcFooter);

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
    }
    async connectedCallback() {
      let items = [];
      const result = await getClubs();
      items = result.data.clubs;
      console.log(items);
      const container = document.createElement("div");
      container.className = "clubs";
      items.forEach((it, idx) => {
        console.log("===========================================", it, idx);
        const el = document.createElement("nc-clubcard");
        if (it.cname) el.setAttribute("cname", it.cname);
        if (it.desc) el.setAttribute("desc", it.desc);
        if (it.img) el.setAttribute("img", it.img);
        const clubId = it.id || String(idx + 1);
        el.setAttribute("club-id", clubId);
        el.setAttribute("data-index", String(idx));
        el.setAttribute("tabindex", "0");
        el.addEventListener("click", () => {
          const detail = {
            index: idx,
            cname: it.cname || null,
            id: it.id || null,
          };
          this.dispatchEvent(
            new CustomEvent("club-select", { detail, bubbles: true }),
          );
        });
        el.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.dispatchEvent(
              new CustomEvent("club-select", {
                detail: {
                  index: idx,
                  cname: it.cname || null,
                  id: it.id || null,
                },
                bubbles: true,
              }),
            );
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
    async connectedCallback() {
      const clubId = localStorage.getItem("register_club_id") || "1";
      await this.loadAndRender(clubId);
    }
    async loadAndRender(clubId) {
      let selectedClubName = "\u041A\u043B\u0443\u0431";
      try {
        const response = await fetch("http://127.0.0.1:3000/api/clubs");
        if (response.ok) {
          const data = await response.json();
          const clubs = data.clubs || [];
          const foundClub = clubs.find((c) => c.id == clubId);
          if (foundClub) {
            selectedClubName =
              foundClub.name ||
              foundClub.shortName ||
              "\u041A\u043B\u0443\u0431";
          }
        }
      } catch (error) {
        console.error("Failed to load club data from API:", error);
      }
      if (selectedClubName === "\u041A\u043B\u0443\u0431") {
        try {
          const response = await fetch("/json/Club.json");
          if (response.ok) {
            const data = await response.json();
            const clubs = data.clubs || [];
            const foundClub = clubs.find((c) => c.id == clubId);
            if (foundClub) {
              selectedClubName =
                foundClub.name ||
                foundClub.shortName ||
                "\u041A\u043B\u0443\u0431";
            }
          }
        } catch (error) {
          console.error("Failed to load club data from JSON:", error);
        }
      }
      this.render(clubId, selectedClubName);
    }
    render(clubId, selectedClubName) {
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
      this.querySelector("#registrationForm").addEventListener(
        "submit",
        (e) => {
          e.preventDefault();
          const formData = {
            clubId,
            email: this.querySelector("#email").value,
            phone: this.querySelector("#phone").value,
            reason: this.querySelector("#reason").value,
            impact: this.querySelector("#impact").value,
            description: this.querySelector("#description").value,
          };
          console.log("Registration submitted:", formData);
          alert(
            "\u042D\u043B\u0441\u044D\u043B\u0442\u044D\u044D \u0430\u043C\u0436\u0438\u043B\u0442\u0430\u0439 \u0438\u043B\u0433\u044D\u044D\u0441\u044D\u043D \u0431\u043E\u043B\u043D\u043E. \u0411\u0430\u044F\u0440\u043B\u0430\u043B\u0430\u0430!",
          );
          localStorage.removeItem("register_club_id");
          localStorage.removeItem("register_club_name");
          if (window.Router) window.Router.navigate("/");
        },
      );
    }
  };
  window.customElements.define("nc-reg-page", NcRegistrationPage);

  // js/nc-club-filter.js
  var NcClubFilter = class extends HTMLElement {
    constructor() {
      super();
      this.filters = {
        directions: /* @__PURE__ */ new Map(),
        surguuli: /* @__PURE__ */ new Map(),
      };
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
      this.querySelectorAll('form[class="directions"] nc-form').forEach(
        (fe) => {
          fe.addEventListener("change", (ev) => {
            const id = fe.getAttribute("id");
            const checked = ev.target.checked;
            this.filters.directions.set(id, checked);
            this.inform();
          });
        },
      );
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
      document.querySelector("nc-club-list").filter(this.filters);
    }
    disconnectedCallback() {}
    attributeChangedCallback(name, oldVal, newVal) {}
    adoptedCallback() {}
  };
  window.customElements.define("nc-club-filter", NcClubFilter);

  // js/nc-clubs-sidebar.js
  var NcClubsSidebar = class extends HTMLElement {
    constructor() {
      super();
    }
    async connectedCallback() {
      await this.loadAndRender();
    }
    async loadAndRender() {
      let filters = { directions: [], schools: [] };
      try {
        const response = await fetch("/json/Club.json");
        if (response.ok) {
          const data = await response.json();
          filters = data.filters || filters;
        }
      } catch (error) {
        console.error("Failed to load filters:", error);
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
                <h2>\u041A\u043B\u0443\u0431\u0438\u0439\u043D \u0447\u0438\u0433\u043B\u044D\u043B</h2>
                <form class="chiglel">
                    <h4>\u0427\u04E9\u043B\u04E9\u04E9\u0442</h4>
                    ${filters.directions
                      .map(
                        (dir) =>
                          `<nc-form id="${dir.id}" name="${dir.id}" label="${dir.label}"></nc-form>`,
                      )
                      .join("")}
                </form>
                <form class="surguuli">
                    <h4>\u0421\u0443\u0440\u0433\u0443\u0443\u043B\u044C</h4>
                    ${filters.schools
                      .map(
                        (school) =>
                          `<nc-form id="${school.id}" name="${school.id}" label="${school.label}"></nc-form>`,
                      )
                      .join("")}
                </form>
            </div>
        `;
    }
  };
  window.customElements.define("nc-clubs-sidebar", NcClubsSidebar);
})();

class NcMainPage extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        await this.loadAndRender();
    }

    async loadAndRender() {
        // Load clubs from API or JSON
        let clubs = [];
        try {
            const response = await fetch('http://127.0.0.1:3000/api/clubs');
            if (response.ok) {
                const data = await response.json();
                clubs = data.clubs || [];
            }
        } catch (error) {
            console.error('Failed to load clubs from API:', error);
        }

        // Fallback to JSON file if API fails
        if (clubs.length === 0) {
            try {
                const response = await fetch('/json/Club.json');
                if (response.ok) {
                    const data = await response.json();
                    clubs = data.clubs || [];
                }
            } catch (error) {
                console.error('Failed to load clubs from JSON:', error);
            }
        }

        // Take first 6 clubs for display
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
                    <input type="text" class="search-input" placeholder="хайх...">
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
                    ${clubs.map(club => `
                        <div class="club-card" data-club-id="${club.id}">
                            <button class="club-favorite">♡</button>
                            <div class="club-header">
                                <div class="club-icon">📚</div>
                                <div class="club-info">
                                    <h3>${club.name || club.shortName}</h3>
                                    <p class="club-category">${club.school || 'Клуб'}</p>
                                </div>
                            </div>
                            <p class="club-description">${club.description || 'Клубын тайлбар байхгүй'}</p>
                            <button class="btn-join" onclick="window.location.hash='#/club/${club.id}'">ДЭЛГЭРЭНГҮЙ</button>
                        </div>
                    `).join('')}
                </div>

                <h2 class="section-title">Сэтгэгдэл</h2>
                <p style="color: #666; margin-bottom: 2rem; padding-left: 20px;">Гишүүдийн сэтгэгдэл болон туршлага</p>

                <div class="comments-grid">
                    <div class="comment-card">
                        <div class="comment-header">
                            <div class="comment-avatar"></div>
                            <div>
                                <div class="comment-author">"Quote"</div>
                                <div style="font-size: 0.8rem; color: #999;">Hasbun students club</div>
                            </div>
                        </div>
                        <p class="comment-text">Маш сайхан туршлага байлаа. Олон шинэ зүйл сурч, найзуудтай болсон.</p>
                    </div>

                    <div class="comment-card">
                        <div class="comment-header">
                            <div class="comment-avatar"></div>
                            <div>
                                <div class="comment-author">"Quote"</div>
                                <div style="font-size: 0.8rem; color: #999;">Hasbun students club</div>
                            </div>
                        </div>
                        <p class="comment-text">Клубт элссэнээсээ хойш бид маш их хөгжсөн. Санал болгож байна.</p>
                    </div>

                    <div class="comment-card">
                        <div class="comment-header">
                            <div class="comment-avatar"></div>
                            <div>
                                <div class="comment-author">"Quote"</div>
                                <div style="font-size: 0.8rem; color: #999;">Hasbun students club</div>
                            </div>
                        </div>
                        <p class="comment-text">Гайхалтай хамт олон, олон боломж. Өөрийгөө илэрхийлэх сайхан орчин.</p>
                    </div>

                    <div class="comment-card">
                        <div class="comment-header">
                            <div class="comment-avatar"></div>
                            <div>
                                <div class="comment-author">"Quote"</div>
                                <div style="font-size: 0.8rem; color: #999;">Hasbun students club</div>
                            </div>
                        </div>
                        <p class="comment-text">Их сургуулийн амьдрал сонирхолтой болсон. Баярлалаа!</p>
                    </div>

                    <div class="comment-card">
                        <div class="comment-header">
                            <div class="comment-avatar"></div>
                            <div>
                                <div class="comment-author">"Quote"</div>
                                <div style="font-size: 0.8rem; color: #999;">Hasbun students club</div>
                            </div>
                        </div>
                        <p class="comment-text">Маш их зүйл сурч авсан. Хамт олон нь гайхалтай дэмжлэг үзүүлдэг.</p>
                    </div>

                    <div class="comment-card">
                        <div class="comment-header">
                            <div class="comment-avatar"></div>
                            <div>
                                <div class="comment-author">"Quote"</div>
                                <div style="font-size: 0.8rem; color: #999;">Hasbun students club</div>
                            </div>
                        </div>
                        <p class="comment-text">Бүх зүйл маш зохион байгуулалттай. Өндөр чанартай арга хэмжээнүүд.</p>
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
            </script>
        `;
    }
}

window.customElements.define('nc-main-page', NcMainPage);

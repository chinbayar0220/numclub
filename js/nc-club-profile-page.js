class NcClubProfilePage extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const clubId = this.getAttribute('id') || '';
        const demoData = {
            '5': {
                name: 'Hackum students club',
                email: 'Hackum@gmail.com',
                category: 'Мэдээллийн технологи',
                tags: ['МТЭС-МКУТ', 'Мэргэжлийн']
            }
        };
        const club = (clubId && demoData[clubId]) ? demoData[clubId] : (clubId ? { name: `Club ${clubId}`, email: '', category: '', tags: [] } : demoData['5']);

        this.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                main {
                    font-family: 'Inter', sans-serif;
                }
                article {
                    display: flex;
                    gap: 20px;
                    padding: 40px;
                }
                .club-logo {
                    flex: 0 0 200px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .club-logo img {
                    max-width: 100%;
                    height: auto;
                }
                .hero {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .hero h1 {
                    font-size: 36px;
                    margin: 0;
                    font-weight: 600;
                }
                .hero-card {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    background: #f5f5f5;
                    padding: 20px;
                    border-radius: 8px;
                }
                .hero-card p {
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .hero-card span {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 12px;
                    background: white;
                    border-radius: 4px;
                }
                .hero-card img {
                    width: 16px;
                    height: 16px;
                }
                .details {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                details {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 12px;
                }
                summary {
                    cursor: pointer;
                    font-weight: 500;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                details p {
                    margin: 12px 0 0;
                    color: #666;
                    font-size: 14px;
                    line-height: 1.5;
                }
                aside {
                    flex: 0 0 150px;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                aside > div {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }
                aside img {
                    width: 36px;
                    height: 36px;
                    cursor: pointer;
                }
                aside article {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    align-items: center;
                }
                aside h5 {
                    margin: 0;
                    font-size: 14px;
                    font-weight: 500;
                    text-align: center;
                }
                #Uil-ajillagaa {
                    padding: 40px;
                    background: #f9f9f9;
                }
                #Uil-ajillagaa h2 {
                    margin-top: 0;
                    font-size: 28px;
                }
                #Uil-ajillagaa > div {
                    display: flex;
                    gap: 16px;
                    flex-wrap: wrap;
                }
                #Uil-ajillagaa p {
                    background: white;
                    padding: 12px 20px;
                    border-radius: 8px;
                    border: 1px solid #ddd;
                    margin: 0;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                #Uil-ajillagaa p:hover {
                    background: #f5f5f5;
                    border-color: #2c2c2c;
                }
                .gishuun-elseh {
                    padding: 40px;
                }
                .gishuun-elseh h2 {
                    font-size: 28px;
                    margin-top: 0;
                }
                .gishuun-elseh details {
                    margin-bottom: 20px;
                }
                .gishuun-elseh button {
                    padding: 12px 32px;
                    background: #2c2c2c;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 500;
                    transition: background 0.3s;
                }
                .gishuun-elseh button:hover {
                    background: #000;
                }
                .events {
                    padding: 40px;
                    background: #f9f9f9;
                }
                .events h2 {
                    font-size: 28px;
                    margin-top: 0;
                }
                .events > p {
                    color: #666;
                    font-size: 14px;
                    margin: 10px 0 20px;
                }
                .events > div {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px;
                }
                .comment {
                    padding: 40px;
                }
                .comment h2 {
                    font-size: 28px;
                    margin-top: 0;
                }
                .comment > p {
                    color: #666;
                    font-size: 14px;
                    margin: 10px 0 20px;
                }
                .comment-cards {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px;
                }
                footer {
                    background: #2c2c2c;
                    color: white;
                    padding: 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                footer img {
                    max-width: 60px;
                    height: auto;
                }
                footer > div {
                    display: flex;
                    gap: 16px;
                }
                footer img[src*="white"] {
                    width: 24px;
                    height: 24px;
                    cursor: pointer;
                }
            </style>

            <main>
                <article>
                    <div class="club-logo">
                        <img src="images/club_logo.svg" alt="clubs logo">
                    </div>
                    <div class="hero">
                        <section>
                            <h1>${club.name}${clubId ? ` <span style="font-size:14px;color:var(--text-secondary,#888);font-weight:400;">#${clubId}</span>` : ''}</h1>
                            <article class="hero-card">
                                ${club.tags.map(t => `<p><span><img src="images/Book.svg" alt="">${t}</span></p>`).join('')}
                                <p><span><img src="images/Book.svg" alt="">${club.category}</span></p>
                                <p><span><img src="images/Book.svg" alt="">${club.email}</span></p>
                            </article>
                        </section>
                        <div class="details">
                            <details>
                                <summary>Зорилго <img src="images/Chevron up.svg" alt=""></summary>
                                <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet laoreet ipsum. Quisque pulvinar turpis vel lobortis efficitur. Duis nec auctor magna. Nullam tempor ligula nisl, in ultricies nisl commodo et.</p>
                            </details>
                            <details>
                                <summary>Алсын караа <img src="images/Chevron up.svg" alt=""></summary>
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
                            <h5>гишүүд төгсөгчид</h5>
                            <img src="images/Shape.svg" alt="">
                        </article>
                    </aside>
                </article>

                <section id="Uil-ajillagaa">
                    <h2>Үйл ажиллагаа</h2>
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
                    <h2>Гишүүнээр элсэх</h2>
                    <details>
                        <summary>шалгуурууд</summary>
                        <p>zuunnayaas deesh undurtei biyiin zuv galbirtai urt huruutai uhaantai geh zergeer</p>
                    </details>
                    <button>Гишүүнээр элсэх</button>
                </section>

                <section class="events">
                    <h2>Эвентүүд</h2>
                    <p>Таньд санал болгох</p>
                    <div>
                        <nc-Cevent-card></nc-Cevent-card>
                        <nc-Cevent-card></nc-Cevent-card>
                        <nc-Cevent-card></nc-Cevent-card>
                    </div>
                </section>

                <section class="comment">
                    <h2>Сэтгэгдэл</h2>
                    <p>Төгсөгчид үлдээсэн сэтгэгдэл</p>
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
}

window.customElements.define('nc-club-profile-page', NcClubProfilePage);

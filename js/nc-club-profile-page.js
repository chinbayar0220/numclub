class NcClubProfilePage extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const clubId = this.getAttribute('id') || '1';
        await this.loadAndRender(clubId);
    }
    //avsan datag mongol ru orchuulna
    translateSchool(school) {
        const schoolMap = {
            'bs': 'БС',
            'its': 'ИТС',
            'mtes': 'МТЭС',
            'uts': 'УТСОХУС',
            'khs': 'ХУС',
            'shus': 'ШУС'
        };
        return schoolMap[school?.toLowerCase()] || school;
    }

    translateDirection(direction) {
        const directionMap = {
            'volunteer': 'Сайн дурын',
            'sport': 'Спорт',
            'art': 'Урлаг',
            'open': 'Чөлөөт',
            'photo': 'Фото зураг',
            'science': 'Шинжлэх ухаан',
            'it': 'Мэдээллийн технологи',
            'language': 'Хэл судлал'
        };
        return directionMap[direction?.toLowerCase()] || direction;
    }

    async loadAndRender(clubId) {
        let club = null;
        
        // Try to load from API first
        try {
            const response = await fetch('http://127.0.0.1:3000/api/clubs');
            if (response.ok) {
                const data = await response.json();
                const clubs = data.clubs || [];
                const foundClub = clubs.find(c => c.id == clubId);
                
                if (foundClub) {
                    club = {
                        name: foundClub.name || foundClub.shortName || 'Клуб',
                        logo: foundClub.logo || 'images/club_logo.svg',
                        tags: (foundClub.directions || []).map(dir => this.translateDirection(dir)),
                        email: foundClub.email || 'club@num.edu.mn',
                        phone: foundClub.phone || '66191111',
                        goal: foundClub.description || 'Клубын тайлбар байхгүй',
                        vision: foundClub.vision || 'Клубын алсын хараа',
                        category: this.translateSchool(foundClub.school) || 'Бусад',
                        memberCount: foundClub.members ? `${foundClub.members}+` : '50+'
                    };
                }
            }
        } catch (error) {
            console.error('Failed to load club data from API:', error);
        }

        // Ultimate fallback
        if (!club) {
            club = {
                name: 'Клуб',
                logo: 'images/club_logo.svg',
                tags: ['NUM'],
                email: 'club@num.edu.mn',
                phone: '66191111',
                goal: 'Клубын тайлбар байхгүй',
                vision: 'Клубын алсын хараа',
                category: 'Бусад',
                memberCount: '50+'
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
                    background-color: var(--card-bg);
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
                    background-color: var(--color-default);
                    color: white;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    border: 1px solid var(--color-default);
                }
                
                .tag-toggle img {
                    width: 16px;
                    height: 16px;
                    filter: brightness(0) invert(1);
                }
                
                .accordion img,
                .frame-3 img {
                    filter: var(--img-filter);
                }
                
                .accordion {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                .accordion-item {
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    background-color: var(--bg-secondary);
                }
                
                .accordion-item[open] {
                    background-color: var(--card-bg);
                }
                
                .accordion-title {
                    padding: 16px;
                    font-weight: 600;
                    font-size: 16px;
                    list-style: none;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    color: var(--text-primary);
                }
                
                .accordion-title::-webkit-details-marker {
                    display: none;
                }
                
                .accordion-title img {
                    transition: transform 0.3s ease;
                }
                
                .accordion-item[open] .accordion-title img {
                    transform: rotate(180deg);
                }
                
                .accordion-content {
                    padding: 0 16px 16px 16px;
                }
                
                .accordion-content p {
                    margin: 0;
                    color: var(--text-secondary);
                }
                
                .accordion-title-wrapper {
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    background-color: var(--bg-secondary);
                }
                
                .accordion-title-2 {
                    padding: 16px;
                    font-weight: 600;
                    font-size: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    color: var(--text-primary);
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
                
                .join-button-section {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                
                .join-button-section .heading-3 {
                    font-size: 24px;
                    font-weight: 600;
                    margin: 0;
                }
                
                .join-button-section .subheading {
                    font-size: 14px;
                    color: var(--text-secondary);
                    margin-top: 4px;
                }
                
                .join-button-section .button {
                    width: 100%;
                    height: 48px;
                    border-radius: 8px;
                    color: var(--text-primary);
                    background-color: var(--color-white);
                    border: 1px solid var(--border-color);
                    cursor: pointer;
                    font-size: 16px;
                    transition: background-color 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .join-button-section .button:hover {
                    background-color: var(--bg-secondary);
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
                    background-color: var(--border-color);
                    border: 2px solid var(--card-bg);
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
                    background-color: var(--color-default);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: 600;
                    margin-left: -12px;
                    border: 2px solid var(--card-bg);
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
                    border: 1px solid var(--border-color);
                    background-color: var(--card-bg);
                    width: 340.33px;
                    height: 32px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    padding: 24px;
                    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
                }
                
                .text-wrapper-3 {
                    font-size: 16px;
                    font-weight: 600;
                }
                
                /* Join Section */
                .card-grid {
                    padding: 64px 100px;
                    background-color: var(--card-bg);
                }
                
                .card-grid .heading-3 {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 10px;
                }
                
                .card-grid .subheading,
                .card-grid .subheading-2 {
                    font-size: 16px;
                    color: var(--text-secondary);
                    margin-bottom: 24px;
                }
                
                .button {
                    width: 98%;
                    height: 40px;
                    border-radius: 8px;
                    color: var(--text-primary);
                    background-color: var(--color-white);
                    border: 1px solid var(--border-color);
                    cursor: pointer;
                    margin-top: 24px;
                    font-size: 16px;
                    transition: background-color 0.2s ease;
                }
                
                .button:hover {
                    background-color: var(--bg-secondary);
                }
                
                /* Events Section */
                .card-grid-content-2 {
                    padding: 64px 100px;
                    background-color: var(--card-bg);
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
                    background-color: var(--card-bg);
                    border: 1px solid var(--border-color);
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
                    background-color: var(--border-color);
                    border: 1px solid var(--border-color);
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
                                ${club.tags.map(tag => `
                                    <div class="tag-toggle">
                                        <img src="images/Book.svg" alt="">
                                        <div class="title-2">${tag}</div>
                                    </div>
                                `).join('')}
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
                                    <div class="title-4">Зорилго</div>
                                    <img src="images/Chevron up.svg" alt="">
                                </summary>
                                <div class="accordion-content">
                                    <p class="body">${club.goal}</p>
                                </div>
                            </details>
                            <div class="accordion-title-wrapper">
                                <div class="accordion-title-2" onclick="this.parentElement.querySelector('details') ? null : (this.parentElement.innerHTML = '<details class=\\'accordion-item\\'><summary class=\\'accordion-title\\'><div>Алсын хараа</div><img src=\\'images/Chevron up.svg\\'></summary><div class=\\'accordion-content\\'><p>${club.vision}</p></div></details>')">
                                    <div class="title-5">Алсын хараа</div>
                                    <img src="images/Chevron up.svg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="frame-2">
                        <div class="url">
                            <a href ="https://www.facebook.com/enhjinn.g" target="_blank"><img src="images/fb_icon.svg" width="36" height="36" alt="facebook Icon"/></a>
                            <a href ="https://www.facebook.com/enhjinn.g" target="_blank"><img src="images/ig_icon.svg" width="36" height="36" alt="instagram Icon"/></a>
                            <a href ="https://www.facebook.com/enhjinn.g" target="_blank"><img src="images/yt_icon.svg" width="36" height="36" alt="youtube Icon"/></a>
                            <a href ="https://www.facebook.com/enhjinn.g" target="_blank"><img src="images/web_icon.svg" width="36" height="36" alt="web Icon"/></a>
                        </div> 
                        <div class="join-button-section">
                            <button class="button" onclick="window.location.hash='#/registration'; localStorage.setItem('register_club_id', '${clubId}');">
                                <div class="button-2">Гишүүнээр элсэх</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-grid-content">
                <div class="text-content-heading"><div class="heading-2">Үйл ажиллагаа</div></div>
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

            <div class="card-grid-content-2">
                <div class="text-content-heading">
                    <div class="heading-3">Эвентүүд</div>
                    <div class="subheading-2">Танд санал болгох</div>
                </div>
                <div class="frame-7">
                    <nc-eventcard></nc-eventcard>
                    <nc-eventcard></nc-eventcard>
                    <nc-eventcard></nc-eventcard>
                </div>
            </div>

            <div class="card-grid">
                <div class="text-content-heading">
                    <div class="heading-3">Сэтгэгдэл</div>
                    <div class="subheading-2">Төгсөгчидийн үлдээсэн сэтгэгдэл</div>
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
                                    <div class="description">Г. Энхжин</div>
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
                                    <div class="description-2">Г. Энхжин</div>
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
                                    <div class="description-2">Г. Энхжин</div>
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
                                    <div class="description-2">Г. Энхжин</div>
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
                                    <div class="description-2">Г. Энхжин</div>
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
                                    <div class="description-2">Г. Энхжин</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

window.customElements.define('nc-club-profile-page', NcClubProfilePage);

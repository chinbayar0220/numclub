import { getClubRequests, getReviews, submitReview } from "./apiclient.js";

const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (ch) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
    })[ch]);

class NcClubProfilePage extends HTMLElement {
    constructor() {
        super();
        this.canSubmitReview = false;
    }

    async connectedCallback() {
        const clubId = this.getAttribute('id') || '1';
        await this.loadAndRender(clubId);
    }
    //avsan datag mongol ru orchuulna
        translateSchool(school) {
        const schoolMap = {
            'bs': '\u0411\u0421',
            'its': '\u0418\u0422\u0421',
            'mtes': '\u041C\u0422\u042D\u0421',
            'uts': '\u0423\u0422\u0421',
            'khs': '\u0425\u0417\u0421',
            'shus': '\u0428\u0423\u0421'
        };
        return schoolMap[school?.toLowerCase()] || school;
    }

        translateDirection(direction) {
        const directionMap = {
            'volunteer': '\u0421\u0430\u0439\u043D \u0434\u0443\u0440\u044B\u043D',
            'sport': '\u0421\u043F\u043E\u0440\u0442',
            'art': '\u0423\u0440\u043B\u0430\u0433',
            'open': '\u0427\u04E9\u043B\u04E9\u04E9\u0442',
            'photo': '\u0424\u043E\u0442\u043E \u0437\u0443\u0440\u0430\u0433',
            'science': '\u0428\u0438\u043D\u0436\u043B\u044D\u0445 \u0443\u0445\u0430\u0430\u043D',
            'it': '\u041C\u044D\u0434\u044D\u044D\u043B\u043B\u0438\u0439\u043D \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438',
            'language': '\u0413\u0430\u0434\u0430\u0430\u0434 \u0445\u044D\u043B'
        };
        return directionMap[direction?.toLowerCase()] || direction;
    }

        async loadAndRender(clubId) {
        this.currentClubId = clubId;
        let club = null;
        let events = [];
        let reviews = [];
        
        // Try detail endpoint first
        try {
            const detailResponse = await fetch(`http://127.0.0.1:3000/api/clubs/${clubId}`);
            if (detailResponse.ok) {
                const data = await detailResponse.json();
                const foundClub = data.club;
                if (foundClub) {
                    club = {
                        name: foundClub.name || foundClub.shortName || '\u041A\u043B\u0443\u0431',
                        logo: foundClub.logo || 'images/club_logo.svg',
                        tags: (foundClub.directions || []).map(dir => this.translateDirection(dir)),
                        email: foundClub.email || 'club@num.edu.mn',
                        phone: foundClub.phone || '66191111',
                        goal: foundClub.goal || foundClub.description || '\u041A\u043B\u0443\u0431\u044B\u043D \u0437\u043E\u0440\u0438\u043B\u0433\u043E',
                        vision: foundClub.vision || '\u041A\u043B\u0443\u0431\u044B\u043D \u0430\u043B\u0441\u044B\u043D \u0445\u0430\u0440\u0430\u0430',
                        category: this.translateSchool(foundClub.school) || '\u0421\u0443\u0440\u0433\u0443\u0443\u043B\u044C',
                        memberCount: foundClub.members ? `${foundClub.members}+` : '50+'
                    };
                    events = Array.isArray(data.events) ? data.events : [];
                    reviews = Array.isArray(data.reviews) ? data.reviews : [];
                }
            }
        } catch (error) {
            console.error('Failed to load club detail from API:', error);
        }

        // Fallback to list endpoint
        if (!club) {
            try {
                const response = await fetch('http://127.0.0.1:3000/api/clubs');
                if (response.ok) {
                    const data = await response.json();
                    const clubs = data.clubs || [];
                    const foundClub = clubs.find(c => c.id == clubId);
                    
                    if (foundClub) {
                        club = {
                            name: foundClub.name || foundClub.shortName || '\u041A\u043B\u0443\u0431',
                            logo: foundClub.logo || 'images/club_logo.svg',
                            tags: (foundClub.directions || []).map(dir => this.translateDirection(dir)),
                            email: foundClub.email || 'club@num.edu.mn',
                            phone: foundClub.phone || '66191111',
                            goal: foundClub.goal || foundClub.description || '\u041A\u043B\u0443\u0431\u044B\u043D \u0437\u043E\u0440\u0438\u043B\u0433\u043E',
                            vision: foundClub.vision || '\u041A\u043B\u0443\u0431\u044B\u043D \u0430\u043B\u0441\u044B\u043D \u0445\u0430\u0440\u0430\u0430',
                            category: this.translateSchool(foundClub.school) || '\u0421\u0443\u0440\u0433\u0443\u0443\u043B\u044C',
                            memberCount: foundClub.members ? `${foundClub.members}+` : '50+'
                        };
                    }
                }
            } catch (error) {
                console.error('Failed to load club data from API:', error);
            }
        }

        // Ultimate fallback
        if (!club) {
            club = {
                name: '\u041A\u043B\u0443\u0431',
                logo: 'images/club_logo.svg',
                tags: ['NUM'],
                email: 'club@num.edu.mn',
                phone: '66191111',
                goal: '\u041A\u043B\u0443\u0431\u044B\u043D \u0437\u043E\u0440\u0438\u043B\u0433\u043E',
                vision: '\u041A\u043B\u0443\u0431\u044B\u043D \u0430\u043B\u0441\u044B\u043D \u0445\u0430\u0440\u0430\u0430',
                category: '\u0421\u0443\u0440\u0433\u0443\u0443\u043B\u044C',
                memberCount: '50+'
            };
        }

        this.currentClub = club;
        this.render(club, clubId, events, reviews);
        this.bindReviewForm();
        this.refreshReviews(clubId);
    }

        render(club, clubId, events = [], reviews = []) {
        const activityClasses = [
            "card",
            "frame-wrapper",
            "div-wrapper",
            "card-2",
            "card-3",
            "card-4"
        ];
        const activityItems = (events || []).slice(0, activityClasses.length).map((event, idx) => {
            const title = event.title || "\u042D\u0432\u0435\u043D\u0442\u0438\u0439\u043D \u043D\u044D\u0440";
            const className = activityClasses[idx] || "card";
            return `
                    <div class="${className}">
                        <div class="frame-5"><div class="text-wrapper-3">${title}</div></div>
                    </div>
                `;
        });
        const activitiesHtml = activityItems.length > 0
            ? activityItems.join("")
            : `
                    <div class="card">
                        <div class="frame-5"><div class="text-wrapper-3">\u041E\u0434\u043E\u043E\u0433\u043E\u043E\u0440 \u044D\u0432\u0435\u043D\u0442 \u0431\u0430\u0439\u0445\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430.</div></div>
                    </div>
                `;
        const formatEventDate = (value) => {
            if (!value) return "";
            const date = new Date(value);
            if (Number.isNaN(date.getTime())) return "";
            const datePart = date.toLocaleDateString("en-GB");
            const timePart = date.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit"
            });
            return `${datePart} ${timePart}`;
        };

        const clubName = club?.shortName || club?.name || "";
        const clubLogo = club?.logo || "images/club_logo.svg";
        const clubEventsHtml = (events || []).map((event) => {
            const eventId = event.id ?? "";
            const title = escapeHtml(event.title || "\u042D\u0432\u0435\u043D\u0442\u0438\u0439\u043D \u043D\u044D\u0440");
            const description = escapeHtml(event.description || "");
            const dateLabel = formatEventDate(event.startsAt) || "";
            const location = event.location || "";
            const metaLine = [dateLabel, location].filter(Boolean).join(" | ");
            const imageSrc = escapeHtml(event.imageUrl || "images/event.png");
            const registerText = "\u0411\u04AF\u0440\u0442\u0433\u04AF\u04AF\u043B\u044D\u0445";
            const detailsText = "\u0414\u044D\u043B\u0433\u044D\u0440\u044D\u043D\u0433\u04AF\u0439";

            return `
                <nc-eventcard
                    data-event-id="${escapeHtml(eventId)}"
                    ename="${title}"
                    date="${escapeHtml(metaLine)}"
                    desc="${description}"
                    price=""
                    club-name="${escapeHtml(clubName)}"
                    club-logo="${escapeHtml(clubLogo)}"
                    event-image="${imageSrc}"
                    btn1="${registerText}"
                    btn2="${detailsText}">
                </nc-eventcard>
            `;
        }).join("");

        const clubEventsEmpty = clubEventsHtml
            ? ""
            : `<div class="club-events-empty">\u041E\u0434\u043E\u043E\u0433\u043E\u043E\u0440 \u044D\u0432\u0435\u043D\u0442 \u0431\u0430\u0439\u0445\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430.</div>`;

        const reviewCardsHtml = this.buildReviewCards(reviews, club);
        const reviewEmptyStyle = reviewCardsHtml ? "display:none;" : "";
        const currentEmail = window.AuthState?.currentUser || "";
        const reviewEmailValue = escapeHtml(currentEmail);
        const reviewEmailDisabled = currentEmail ? "disabled" : "";
        const reviewEmailHint = currentEmail
            ? "\u0418-\u043C\u044D\u0439\u043B \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0430\u0430\u0440 \u0431\u04AF\u0433\u043B\u04E9\u0433\u0434\u0441\u04E9\u043D."
            : "\u0418-\u043C\u044D\u0439\u043B \u0445\u0430\u044F\u0433\u0430\u0430 \u043E\u0440\u0443\u0443\u043B\u043D\u0430 \u0443\u0443.";

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
                
                
                .club-events-empty {
                    color: var(--text-secondary, #6b7280);
                    font-size: 14px;
                }/* Review Section */
                .card-grid-2 {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 24px;
                    margin-top: 48px;
                }

                .review-form {
                    margin-top: 20px;
                    padding: 20px;
                    border: 1px solid var(--border-color);
                    border-radius: 12px;
                    background-color: var(--card-bg);
                }

                .review-form.is-hidden {
                    display: none;
                }

                .review-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                }

                .review-edit-toggle {
                    height: 48px;
                    border-radius: 8px;
                    border: 1px solid var(--border-color, #d1d5db);
                    background: var(--color-white, #fff);
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-primary, #111827);
                    cursor: pointer;
                    padding: 0 20px;
                    font-size: 16px;
                    transition: background-color 0.2s ease, border-color 0.2s ease;
                }

                .review-edit-toggle.is-active {
                    background: var(--bg-secondary, #f5f5f5);
                    border-color: var(--border-color, #d1d5db);
                }
                
                .review-form-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 12px 16px;
                }
                
                .review-form .form-field {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                
                .review-form .form-field label {
                    font-size: 14px;
                    color: var(--text-secondary, #6b7280);
                }
                
                .review-form input,
                .review-form select,
                .review-form textarea {
                    padding: 8px 10px;
                    border-radius: 8px;
                    border: 1px solid var(--border-color, #d1d5db);
                    background: var(--input-bg, #fff);
                    color: var(--input-text, #111827);
                    font-size: 14px;
                }
                
                .review-form textarea {
                    resize: vertical;
                    min-height: 90px;
                }

                .review-form-hint {
                    margin-top: 4px;
                    font-size: 12px;
                    color: var(--text-secondary, #6b7280);
                }
                
                .review-form-actions {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-top: 12px;
                }
                
                .review-form-actions button {
                    padding: 10px 16px;
                    border-radius: 8px;
                    border: 1px solid var(--border-color, #d1d5db);
                    background: #111827;
                    color: #fff;
                    cursor: pointer;
                }
                
                .review-form-actions button:disabled {
                    background: #9ca3af;
                    border-color: #9ca3af;
                    cursor: not-allowed;
                }
                
                .review-form-message {
                    font-size: 14px;
                }
                
                .review-form-message.success {
                    color: #107d4e;
                }
                
                .review-form-message.error {
                    color: #b42318;
                }
                
                .review-empty {
                    color: var(--text-secondary, #6b7280);
                    margin-top: 12px;
                }
                
                .review-card,
                .review-card-wrapper,
                .review-card-3,
                .review-card-4,
                .review-card-5,
                .review-card-6 {
                    padding: 24px;
                    background-color: var(--color-white);
                    border: 1px solid var(--border-color);
                    border-radius: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
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
                
                .review-card-2 .div-2 img.is-empty {
                    opacity: 0.3;
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
                            <div class="full-name">${club.name} \u043E\u044E\u0443\u0442\u043D\u044B \u043A\u043B\u0443\u0431</div>
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
                        <div class="url">
                            <a href ="https://www.facebook.com/enhjinn.g" target="_blank"><img src="images/fb_icon.svg" width="36" height="36" alt="facebook Icon"/></a>
                            <a href ="https://www.facebook.com/enhjinn.g" target="_blank"><img src="images/ig_icon.svg" width="36" height="36" alt="instagram Icon"/></a>
                            <a href ="https://www.facebook.com/enhjinn.g" target="_blank"><img src="images/yt_icon.svg" width="36" height="36" alt="youtube Icon"/></a>
                            <a href ="https://www.facebook.com/enhjinn.g" target="_blank"><img src="images/web_icon.svg" width="36" height="36" alt="web Icon"/></a>
                        </div> 
                        <div class="join-button-section">
                            <button class="button" onclick="window.location.hash='#/register'; localStorage.setItem('register_club_id', '${clubId}');">
                                <div class="button-2">\u0413\u0438\u0448\u04AF\u04AF\u043D\u044D\u044D\u0440 \u044D\u043B\u0441\u044D\u0445</div>
                            </button>
                        </div>
                    </div>  
                </div>
            </div>

                        <div class="card-grid-content">
                <div class="text-content-heading"><div class="heading-2">\u04AE\u0439\u043B \u0430\u0436\u0438\u043B\u043B\u0430\u0433\u0430\u0430</div></div>
                <div class="frame-6">
                    ${activitiesHtml}
                </div>
            </div>

            <div class="card-grid-content-2">
                <div class="text-content-heading">
                    <div class="heading-3">\u042D\u0432\u0435\u043D\u0442\u04AF\u04AF\u0434</div>
                    <div class="subheading-2">\u041A\u043B\u0443\u0431\u044B\u043D \u044D\u0432\u0435\u043D\u0442\u04AF\u04AF\u0434</div>
                </div>
                <div class="frame-7">
                    ${clubEventsHtml || clubEventsEmpty}
                </div>
            </div>

            <div class="card-grid">
                <div class="review-header">
                    <div class="text-content-heading">
                        <div class="heading-3">\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B</div>
                        <div class="subheading-2">\u041A\u043B\u0443\u0431\u044B\u043D \u0442\u0430\u043B\u0430\u0430\u0440\u0445\u0438 \u0441\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B\u04AF\u04AF\u0434</div>
                    </div>
                    <button class="review-edit-toggle" id="reviewOpenBtn" type="button" title="\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B \u04E9\u0433\u04E9\u0445" aria-label="\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B \u04E9\u0433\u04E9\u0445">\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B \u04E9\u0433\u04E9\u0445</button>
                </div>
                <div class="review-form is-hidden" id="reviewFormSection">
                    <form id="reviewForm">
                        <div class="review-form-grid">
                            <div class="form-field">
                                <label for="reviewRating">\u04AE\u043D\u044D\u043B\u0433\u044D\u044D</label>
                                <select id="reviewRating" name="reviewRating" required>
                                    <option value="5">5 - \u041C\u0430\u0448 \u0441\u0430\u0439\u043D</option>
                                    <option value="4">4 - \u0421\u0430\u0439\u043D</option>
                                    <option value="3">3 - \u0414\u0443\u043D\u0434\u0430\u0436</option>
                                    <option value="2">2 - \u0421\u0443\u043B</option>
                                    <option value="1">1 - \u041C\u0443\u0443</option>
                                </select>
                            </div>
                            <div class="form-field">
                                <label for="reviewTitle">\u0413\u0430\u0440\u0447\u0438\u0433</label>
                                <input id="reviewTitle" name="reviewTitle" type="text" placeholder="\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B\u0438\u0439\u043D \u0433\u0430\u0440\u0447\u0438\u0433" />
                            </div>
                            <div class="form-field">
                                <label for="reviewEmail">\u0418-\u043C\u044D\u0439\u043B</label>
                                <input id="reviewEmail" name="reviewEmail" type="email" value="${reviewEmailValue}" ${reviewEmailDisabled} />
                                <div class="review-form-hint">${reviewEmailHint}</div>
                            </div>
                        </div>
                        <div class="form-field">
                            <label for="reviewBody">\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B</label>
                            <textarea id="reviewBody" name="reviewBody" placeholder="\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B\u043B\u044D\u044D \u044D\u043D\u0434 \u0431\u0438\u0447\u043D\u044D \u04AF\u04AF." required></textarea>
                        </div>
                        <div class="review-form-actions">
                            <button type="submit">\u0418\u043B\u0433\u044D\u044D\u0445</button>
                            <span id="reviewFormMessage" class="review-form-message"></span>
                        </div>
                    </form>
                </div>
                <div class="card-grid-2" id="reviewList">
                    ${reviewCardsHtml}
                </div>
                <p class="review-empty" id="reviewEmpty" style="${reviewEmptyStyle}">\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B \u0445\u0430\u0440\u0430\u0430\u0445\u0430\u043D \u0430\u043B\u0433\u0430.</p>
                
            </div>
        `;
    }

    buildReviewCards(reviews, club) {
        if (!Array.isArray(reviews) || reviews.length === 0) {
            return "";
        }
        const clubLogo = club?.logo || "images/club_logo.svg";
        return reviews.map((review) => {
            const rating = Number(review.rating) || 0;
            const title = review.title || "\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B";
            const body = review.body || "";
            const userName = review.userName || review.userEmail || "\u0417\u043E\u0447\u0438\u043D";
            const dateText = this.formatReviewDate(review.createdAt);
            const starsHtml = this.renderStars(rating);
            return `
                <div class="review-card">
                    <div class="review-card-2">
                        <div class="div-2">
                            ${starsHtml}
                        </div>
                        <div class="review-body">
                            <div class="div-wrapper-2"><div class="text-heading-2">${escapeHtml(title)}</div></div>
                            <div class="text"><div class="text-5">${escapeHtml(body)}</div></div>
                        </div>
                        <div class="avatar-block">
                            <div class="shape-wrapper"><img class="shape" src="${escapeHtml(clubLogo)}" alt="Avatar"></div>
                            <div class="info">
                                <div class="title-6">${escapeHtml(userName)}</div>
                                <div class="description-2">${escapeHtml(dateText)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    }

    renderStars(rating) {
        const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));
        let stars = "";
        for (let i = 1; i <= 5; i++) {
            const emptyClass = i <= safeRating ? "" : " is-empty";
            stars += `<img src="images/Star.svg" class="${emptyClass}" alt="Star">`;
        }
        return stars;
    }

    formatReviewDate(value) {
        if (!value) return "";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "";
        return date.toLocaleDateString("mn-MN");
    }

    setReviewFormMessage(text, type) {
        const message = this.querySelector("#reviewFormMessage");
        if (!message) return;
        message.textContent = text || "";
        message.classList.remove("success", "error");
        if (type) {
            message.classList.add(type);
        }
    }

    bindReviewForm() {
        const form = this.querySelector("#reviewForm");
        if (!form) return;
        const openButton = this.querySelector("#reviewOpenBtn");
        if (openButton) {
            openButton.addEventListener("click", () => {
                this.toggleReviewForm();
                this.updateReviewEligibility();
            });
        }

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            this.setReviewFormMessage("");
            const rating = parseInt(this.querySelector("#reviewRating")?.value, 10);
            const title = this.querySelector("#reviewTitle")?.value.trim() || "";
            const body = this.querySelector("#reviewBody")?.value.trim() || "";
            const emailInput = this.querySelector("#reviewEmail");
            const email = (window.AuthState?.currentUser || emailInput?.value.trim() || "").trim();
            const submitButton = form.querySelector("button[type='submit']");

            if (!this.canSubmitReview) {
                this.setReviewFormMessage("\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B \u04AF\u043B\u0434\u044D\u044D\u0445\u0438\u0439\u043D \u0442\u0443\u043B\u0434 \u043A\u043B\u0443\u0431\u0442 \u0433\u0438\u0448\u04AF\u04AF\u043D\u044D\u044D\u0440 \u044D\u043B\u0441\u0441\u044D\u043D \u0431\u0430\u0439\u0445 \u0448\u0430\u0430\u0440\u0434\u043B\u0430\u0433\u0430\u0442\u0430\u0439.", "error");
                return;
            }

            if (!rating || rating < 1 || rating > 5) {
                this.setReviewFormMessage("\u04AE\u043D\u044D\u043B\u0433\u044D\u044D \u0441\u043E\u043D\u0433\u043E\u043D\u043E \u0443\u0443.", "error");
                return;
            }
            if (!body) {
                this.setReviewFormMessage("\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B\u043B\u044D\u044D \u0431\u0438\u0447\u043D\u044D \u04AF\u04AF.", "error");
                return;
            }

            if (submitButton) submitButton.disabled = true;
            const payload = {
                clubId: Number(this.currentClubId || 0),
                rating,
                title,
                body,
                email: email || null
            };

            const result = await submitReview(payload);
            if (submitButton) submitButton.disabled = false;
            if (result.code !== 200) {
                this.setReviewFormMessage("\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B \u0445\u0430\u0434\u0433\u0430\u043B\u0430\u0445 \u04AF\u0435\u0434 \u0430\u043B\u0434\u0430\u0430 \u0433\u0430\u0440\u043B\u0430\u0430.", "error");
                return;
            }

            this.setReviewFormMessage("\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B \u0430\u043C\u0436\u0438\u043B\u0442\u0442\u0430\u0439 \u0445\u0430\u0434\u0433\u0430\u043B\u0430\u0433\u0434\u043B\u0430\u0430.", "success");
            form.reset();
            if (emailInput && window.AuthState?.currentUser) {
                emailInput.value = window.AuthState.currentUser;
            }
            await this.refreshReviews(this.currentClubId);
        });
    }

    async updateReviewEligibility() {
        const submitButton = this.querySelector("#reviewForm button[type='submit']");
        if (!submitButton) return;
        const email = window.AuthState?.currentUser;
        this.canSubmitReview = false;

        if (!email) {
            submitButton.disabled = true;
            this.setReviewFormMessage("\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B \u04AF\u043B\u0434\u044D\u044D\u0445\u0438\u0439\u043D \u0442\u0443\u043B\u0434 \u043D\u044D\u0432\u0442\u044D\u0440\u043D\u044D \u04AF\u04AF.", "error");
            return;
        }

        const result = await getClubRequests({
            clubId: this.currentClubId,
            email,
            status: "approved"
        });
        const approved = result.code === 200 && (result.data?.requests || []).length > 0;
        if (!approved) {
            submitButton.disabled = true;
            this.setReviewFormMessage("\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B \u04AF\u043B\u0434\u044D\u044D\u0445\u0438\u0439\u043D \u0442\u0443\u043B\u0434 \u043A\u043B\u0443\u0431\u044B\u043D \u044D\u043B\u0441\u044D\u043B\u0442 \u0431\u0430\u0442\u0430\u043B\u0433\u0430\u0430\u0436\u0441\u0430\u043D \u0431\u0430\u0439\u0445 \u0448\u0430\u0430\u0440\u0434\u043B\u0430\u0433\u0430\u0442\u0430\u0439.", "error");
            return;
        }

        submitButton.disabled = false;
        this.canSubmitReview = true;
        this.setReviewFormMessage("");
    }

        setReviewFormOpen(isOpen) {
        const section = this.querySelector("#reviewFormSection");
        const toggle = this.querySelector("#reviewOpenBtn");
        if (!section || !toggle) return;
        section.classList.toggle("is-hidden", !isOpen);
        toggle.classList.toggle("is-active", isOpen);
        toggle.setAttribute("aria-pressed", isOpen ? "true" : "false");
        toggle.title = isOpen ? "\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B \u0445\u0430\u0430\u0445" : "\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B \u04E9\u0433\u04E9\u0445";
        toggle.textContent = isOpen ? "\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B \u0445\u0430\u0430\u0445" : "\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B \u04E9\u0433\u04E9\u0445";
        if (isOpen) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
            this.updateReviewEligibility();
        }
    }

toggleReviewForm() {
        const section = this.querySelector("#reviewFormSection");
        if (!section) return;
        const shouldOpen = section.classList.contains("is-hidden");
        this.setReviewFormOpen(shouldOpen);
    }

    async refreshReviews(clubId) {
        const list = this.querySelector("#reviewList");
        const empty = this.querySelector("#reviewEmpty");
        if (!list || !empty) return;

        const result = await getReviews(clubId);
        if (result.code !== 200 || !result.data) {
            list.innerHTML = "";
            empty.textContent = "\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B \u0430\u0447\u0430\u0430\u043B\u043B\u0430\u0445\u0430\u0434 \u0430\u043B\u0434\u0430\u0430 \u0433\u0430\u0440\u043B\u0430\u0430.";
            empty.style.display = "block";
            return;
        }

        const reviews = result.data.reviews || [];
        this.updateReviewList(reviews);
    }

    updateReviewList(reviews) {
        const list = this.querySelector("#reviewList");
        const empty = this.querySelector("#reviewEmpty");
        if (!list || !empty) return;

        if (!reviews || reviews.length === 0) {
            list.innerHTML = "";
            empty.textContent = "\u0421\u044D\u0442\u0433\u044D\u0433\u0434\u044D\u043B \u0445\u0430\u0440\u0430\u0430\u0445\u0430\u043D \u0430\u043B\u0433\u0430.";
            empty.style.display = "block";
            return;
        }

        empty.style.display = "none";
        list.innerHTML = this.buildReviewCards(reviews, this.currentClub);
    }
}

window.customElements.define('nc-club-profile-page', NcClubProfilePage);













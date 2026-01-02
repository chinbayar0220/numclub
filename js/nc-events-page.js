import { getClubs, getEvents, getSavedEvents, saveEvent } from "./apiclient.js";

const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (ch) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
    })[ch]);

const UI_TEXT = {
    title: "&#1069;&#1074;&#1077;&#1085;&#1090;&#1199;&#1199;&#1076;",
    loading: "&#1069;&#1074;&#1077;&#1085;&#1090;&#1199;&#1199;&#1076; &#1072;&#1095;&#1072;&#1072;&#1083;&#1078; &#1073;&#1072;&#1081;&#1085;&#1072;...",
    empty: "&#1054;&#1076;&#1086;&#1086;&#1075;&#1086;&#1086;&#1088; &#1101;&#1074;&#1077;&#1085;&#1090; &#1073;&#1072;&#1081;&#1093;&#1075;&#1199;&#1081; &#1073;&#1072;&#1081;&#1085;&#1072;.",
    register: "&#1041;&#1199;&#1088;&#1090;&#1075;&#1199;&#1199;&#1083;&#1101;&#1093;",
    details: "&#1044;&#1101;&#1083;&#1075;&#1101;&#1088;&#1101;&#1085;&#1075;&#1199;&#1081;",
    seats: "&#1057;&#1091;&#1091;&#1076;&#1083;&#1099;&#1085; &#1090;&#1086;&#1086;:",
    save: "&#1061;&#1072;&#1076;&#1075;&#1072;&#1083;&#1072;&#1093;",
    saved: "&#1061;&#1072;&#1076;&#1075;&#1072;&#1083;&#1089;&#1072;&#1085;"
};

const formatDateTime = (value) => {
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

class NcEventsPage extends HTMLElement {
    async connectedCallback() {
        this.currentPage = 1;
        this.renderLoading();
        await this.loadAndRender();
    }

    renderLoading() {
        this.innerHTML = `
            <style>
                :host { display: block; }
                .events-page { padding: 28px 90px 48px; }
                .events-page .title { font-size: 24px; margin: 0 0 12px; }
                .events-page .muted { color: var(--text-secondary, #666); }
                @media (max-width: 700px) { .events-page { padding: 24px; } }
            </style>
            <div class="events-page">
                <h2 class="title">${UI_TEXT.title}</h2>
                <div class="muted">${UI_TEXT.loading}</div>
            </div>
        `;
    }

    async loadAndRender() {
        const [eventsResult, clubsResult] = await Promise.all([getEvents(), getClubs()]);
        this.events = eventsResult.code === 200 ? (eventsResult.data?.events || []) : [];
        const clubs = clubsResult.code === 200 ? (clubsResult.data?.clubs || []) : [];
        this.clubMap = new Map(clubs.map((club) => [String(club.id), club]));
        const email = window.AuthState?.currentUser || "";
        this.currentEmail = email;
        if (email) {
            const savedResult = await getSavedEvents(email);
            const savedEvents = savedResult.code === 200 ? (savedResult.data?.events || []) : [];
            this.savedEventIds = new Set(savedEvents.map((event) => String(event.id)));
        } else {
            this.savedEventIds = new Set();
        }
        this.render();
    }

    render() {
        const events = this.events || [];
        const clubMap = this.clubMap || new Map();
        const savedEventIds = this.savedEventIds || new Set();
        const perPage = 9;
        const totalPages = Math.max(1, Math.ceil(events.length / perPage));
        const page = Math.min(this.currentPage || 1, totalPages);
        const startIndex = (page - 1) * perPage;
        const pageEvents = events.slice(startIndex, startIndex + perPage);

        const cards = pageEvents.map((event) => {
            const eventId = event.id;
            const clubId = event.clubId || event.club_id;
            const club = clubMap.get(String(clubId));
            const clubName = club?.shortName || club?.name || "Unknown club";
            const clubLogo = club?.logo || "images/club_logo.svg";
            const title = escapeHtml(event.title || "Untitled event");
            const description = escapeHtml(event.description || "");
            const dateLabel = formatDateTime(event.startsAt) || "";
            const location = event.location ? escapeHtml(event.location) : "";
            const metaLine = [dateLabel, location].filter(Boolean).join(" | ");
            const seats = event.capacity ? `${UI_TEXT.seats} ${escapeHtml(event.capacity)}` : "";
            const imageSrc = escapeHtml(event.imageUrl || "images/event.png");
            const clubIdValue = clubId ? String(clubId) : "";
            const clubActionAttr = clubIdValue ? `data-action="club" data-club-id="${clubIdValue}"` : "disabled";
            const isSaved = savedEventIds.has(String(eventId));
            const saveTitle = isSaved ? UI_TEXT.saved : UI_TEXT.save;
            const saveClass = isSaved ? "save-btn is-saved" : "save-btn";

            return `
                <article class="event-card">
                    <div class="event-media" data-action="details" data-event-id="${eventId}">
                        <img src="${imageSrc}" alt="">
                        <button class="${saveClass}" type="button" data-action="save" data-event-id="${eventId}" title="${saveTitle}">
                            <img src="images/heart icon.svg" alt="">
                        </button>
                    </div>
                    <div class="event-body">
                        <button class="club-row" type="button" ${clubActionAttr}>
                            <img class="club-logo" src="${escapeHtml(clubLogo)}" alt="">
                            <span class="club-name">${escapeHtml(clubName)}</span>
                        </button>
                        <div class="event-title" data-action="details" data-event-id="${eventId}">${title}</div>
                        ${metaLine ? `<div class="event-meta">${escapeHtml(metaLine)}</div>` : ""}
                        ${seats ? `<div class="event-meta">${seats}</div>` : ""}
                        <p class="event-desc">${description || "&nbsp;"}</p>
                        <div class="buttons event-actions">
                            <button class="btn1" type="button" data-action="register" data-event-id="${eventId}">${UI_TEXT.register}</button>
                            <button class="btn2" type="button" data-action="details" data-event-id="${eventId}">${UI_TEXT.details}</button>
                        </div>
                    </div>
                </article>
            `;
        }).join("");

        const pagination = totalPages > 1
            ? `
                <div class="pagination">
                    <button class="page-btn nav" data-page="${Math.max(1, page - 1)}" ${page === 1 ? "disabled" : ""}>&lt;</button>
                    ${Array.from({ length: totalPages }).map((_, idx) => {
                        const pageNumber = idx + 1;
                        const activeClass = pageNumber === page ? "active" : "";
                        return `<button class="page-btn ${activeClass}" data-page="${pageNumber}">${pageNumber}</button>`;
                    }).join("")}
                    <button class="page-btn nav" data-page="${Math.min(totalPages, page + 1)}" ${page === totalPages ? "disabled" : ""}>&gt;</button>
                </div>
            `
            : "";

        this.innerHTML = `
            <style>
                :host { display: block; }
                *, *::before, *::after { box-sizing: border-box; }
                .events-page {
                    padding: 28px 90px 48px;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }
                .events-page .title {
                    font-size: 24px;
                    margin: 0;
                }
                .events-grid {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 24px;
                }
                .event-card {
                    display: flex;
                    flex-direction: column;
                    border: 1px solid var(--border-color, #d3d3d3);
                    border-radius: 8px;
                    background: var(--card-bg, #fff);
                    overflow: hidden;
                    min-height: 360px;
                }
                .event-media {
                    height: 170px;
                    background: #f3f4f6;
                    cursor: pointer;
                    position: relative;
                }
                .save-btn {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 32px;
                    height: 32px;
                    border-radius: 999px;
                    border: 1px solid rgba(255, 255, 255, 0.8);
                    background: rgba(255, 255, 255, 0.9);
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    padding: 0;
                }
                .save-btn img {
                    width: 16px;
                    height: 16px;
                }
                .save-btn.is-saved {
                    background: #111827;
                    border-color: #111827;
                }
                .save-btn.is-saved img {
                    filter: invert(1);
                }
                .save-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .event-media img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }
                .event-body {
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    flex: 1;
                }
                .club-row {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    border: none;
                    padding: 0;
                    background: transparent;
                    cursor: pointer;
                    text-align: left;
                }
                .club-logo {
                    width: 22px;
                    height: 22px;
                    border-radius: 4px;
                    border: 1px solid var(--border-color, #d3d3d3);
                    object-fit: cover;
                }
                .club-name {
                    font-size: 12px;
                    color: var(--text-secondary, #666);
                }
                .event-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: var(--text-primary, #1e1e1e);
                    cursor: pointer;
                }
                .event-meta {
                    font-size: 12px;
                    color: var(--text-secondary, #666);
                }
                .event-desc {
                    font-size: 13px;
                    color: var(--text-secondary, #666);
                    line-height: 1.4;
                    min-height: 48px;
                    margin: 4px 0 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .event-actions {
                    margin-top: auto;
                    gap: 12px;
                }
                .events-page .empty {
                    color: var(--text-secondary, #666);
                    font-size: 14px;
                }
                .pagination {
                    margin-top: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                }
                .page-btn {
                    width: 28px;
                    height: 28px;
                    border-radius: 6px;
                    border: 1px solid var(--border-color, #d3d3d3);
                    background: var(--color-white, #fff);
                    color: var(--text-primary, #1e1e1e);
                    font-size: 12px;
                    cursor: pointer;
                }
                .page-btn.active {
                    background: #2c2c2c;
                    border-color: #2c2c2c;
                    color: #fff;
                }
                .page-btn:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }
                @media (max-width: 1024px) {
                    .events-page { padding: 24px 32px 40px; }
                    .events-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                }
                @media (max-width: 700px) {
                    .events-page { padding: 24px; }
                    .events-grid { grid-template-columns: 1fr; }
                }
            </style>
            <div class="events-page">
                <h2 class="title">${UI_TEXT.title}</h2>
                ${events.length === 0 ? `<div class="empty">${UI_TEXT.empty}</div>` : `<div class="events-grid">${cards}</div>`}
                ${pagination}
            </div>
        `;

        this.bindActions();
        this.bindPagination();
    }

    bindActions() {
        const grid = this.querySelector(".events-grid");
        if (!grid) return;
        grid.addEventListener("click", async (event) => {
            const target = event.target.closest("[data-action]");
            if (!target) return;
            const action = target.dataset.action;
            const eventId = target.dataset.eventId;
            const clubId = target.dataset.clubId;
            if (action === "details" && eventId) {
                if (window.Router) {
                    window.Router.navigate(`/event/${eventId}`);
                } else {
                    window.location.hash = `#/event/${eventId}`;
                }
            }
            if (action === "register" && eventId) {
                if (window.Router) {
                    window.Router.navigate(`/event/${eventId}/register`);
                } else {
                    window.location.hash = `#/event/${eventId}/register`;
                }
            }
            if (action === "club" && clubId) {
                if (window.Router) {
                    window.Router.navigate(`/club/${clubId}`);
                } else {
                    window.location.hash = `#/club/${clubId}`;
                }
            }
            if (action === "save" && eventId) {
                const email = this.currentEmail || window.AuthState?.currentUser;
                if (!email) {
                    alert("Login required.");
                    return;
                }
                const savedIds = this.savedEventIds || new Set();
                if (savedIds.has(String(eventId))) {
                    return;
                }
                target.disabled = true;
                const result = await saveEvent({ eventId, email });
                if (result.code !== 200) {
                    target.disabled = false;
                    alert("Save failed.");
                    return;
                }
                savedIds.add(String(eventId));
                this.savedEventIds = savedIds;
                this.render();
            }
        });
    }

    bindPagination() {
        const pagination = this.querySelector(".pagination");
        if (!pagination) return;
        pagination.addEventListener("click", (event) => {
            const target = event.target.closest("[data-page]");
            if (!target || target.disabled) return;
            const page = Number(target.dataset.page);
            if (Number.isNaN(page) || page === this.currentPage) return;
            this.currentPage = page;
            this.render();
        });
    }
}

if (!customElements.get("nc-events-page")) {
    customElements.define("nc-events-page", NcEventsPage);
}

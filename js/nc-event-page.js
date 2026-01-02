import { getClubs, getEventById } from "./apiclient.js";

const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (ch) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
    })[ch]);

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

const formatRange = (start, end) => {
    const startLabel = formatDateTime(start);
    const endLabel = formatDateTime(end);
    if (startLabel && endLabel) {
        return `${startLabel} - ${endLabel}`;
    }
    if (startLabel) return startLabel;
    if (endLabel) return endLabel;
    return "Time: TBD";
};

class NcEventPage extends HTMLElement {
    async connectedCallback() {
        const eventId = this.getAttribute("id");
        this.renderLoading();
        await this.loadAndRender(eventId);
    }

    renderLoading() {
        this.innerHTML = `
            <style>
                :host { display: block; }
                .page { padding: 32px 90px; }
                .muted { color: var(--text-secondary, #666); }
            </style>
            <div class="page">
                <div class="muted">Loading event...</div>
            </div>
        `;
    }

    async loadAndRender(eventId) {
        if (!eventId) {
            this.renderNotFound();
            return;
        }

        const [eventResult, clubsResult] = await Promise.all([
            getEventById(eventId),
            getClubs()
        ]);

        if (eventResult.code !== 200) {
            this.renderNotFound();
            return;
        }

        const event = eventResult.data?.event;
        if (!event) {
            this.renderNotFound();
            return;
        }

        const clubs = clubsResult.code === 200 ? (clubsResult.data?.clubs || []) : [];
        const clubId = event.clubId || event.club_id;
        const club = clubs.find((item) => String(item.id) === String(clubId));

        this.render(event, club);
    }

    renderNotFound() {
        this.innerHTML = `
            <style>
                :host { display: block; }
                .page { padding: 32px 90px; }
                .muted { color: var(--text-secondary, #666); }
                .action-link {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 8px 12px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-size: 14px;
                    border: 1px solid var(--border-color, #d3d3d3);
                    color: var(--text-primary, #1e1e1e);
                    background: var(--color-white, #fff);
                }
            </style>
            <div class="page">
                <h2>Event not found</h2>
                <p class="muted">The event you are looking for does not exist.</p>
                <a class="action-link" data-navigate="/events" href="#/events">Back to events</a>
            </div>
        `;
    }

    render(event, club) {
        const clubName = club?.shortName || club?.name || "Unknown club";
        const clubLink = club ? `<a class="club-link" data-navigate="/club/${club.id}" href="#/club/${club.id}">${escapeHtml(clubName)}</a>` : escapeHtml(clubName);
        const schedule = formatRange(event.startsAt, event.endsAt);
        const location = escapeHtml(event.location || "TBD");
        const capacity = event.capacity ? `Capacity: ${event.capacity}` : "Capacity: TBD";
        const description = escapeHtml(event.description || "");
        const eventId = event.id;

        this.innerHTML = `
            <style>
                :host { display: block; }
                .page { padding: 32px 90px; }
                .title {
                    font-size: 32px;
                    margin: 0 0 8px;
                }
                .meta {
                    color: var(--text-secondary, #666);
                    font-size: 14px;
                }
                .block {
                    margin-top: 20px;
                    padding: 16px;
                    border: 1px solid var(--border-color, #d3d3d3);
                    border-radius: 8px;
                    background: var(--card-bg, #fff);
                }
                .detail {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 12px;
                }
                .label {
                    font-weight: 600;
                    font-size: 14px;
                }
                .value {
                    font-size: 14px;
                    color: var(--text-secondary, #666);
                }
                .actions {
                    display: flex;
                    gap: 12px;
                    margin-top: 20px;
                    flex-wrap: wrap;
                }
                .btn {
                    padding: 8px 12px;
                    border-radius: 8px;
                    border: 1px solid var(--border-color, #d3d3d3);
                    font-size: 14px;
                    cursor: pointer;
                    background: var(--color-white, #fff);
                    color: var(--text-primary, #1e1e1e);
                }
                .btn.primary {
                    background: var(--color-default, #2c2c2c);
                    border-color: var(--color-default, #2c2c2c);
                    color: #fff;
                }
                .btn.primary:hover {
                    background: #3a3a3a;
                    border-color: #3a3a3a;
                }
                .club-link {
                    color: inherit;
                    text-decoration: none;
                }
                .club-link:hover {
                    text-decoration: underline;
                }
                @media (max-width: 700px) {
                    .page { padding: 24px; }
                }
            </style>
            <div class="page">
                <h2 class="title">${escapeHtml(event.title || "Untitled event")}</h2>
                <div class="meta">Club: ${clubLink}</div>

                <div class="block detail">
                    <div>
                        <div class="label">Schedule</div>
                        <div class="value">${escapeHtml(schedule)}</div>
                    </div>
                    <div>
                        <div class="label">Location</div>
                        <div class="value">${location}</div>
                    </div>
                    <div>
                        <div class="label">Capacity</div>
                        <div class="value">${escapeHtml(capacity)}</div>
                    </div>
                </div>

                <div class="block">
                    <div class="label">Description</div>
                    <div class="value">${description || "No description provided."}</div>
                </div>

                <div class="actions">
                    <button class="btn primary" id="registerBtn">Register</button>
                    <button class="btn" id="backBtn">Back to events</button>
                </div>
            </div>
        `;

        const registerBtn = this.querySelector("#registerBtn");
        const backBtn = this.querySelector("#backBtn");
        if (registerBtn) {
            registerBtn.addEventListener("click", () => {
                if (window.Router) {
                    window.Router.navigate(`/event/${eventId}/register`);
                } else {
                    window.location.hash = `#/event/${eventId}/register`;
                }
            });
        }
        if (backBtn) {
            backBtn.addEventListener("click", () => {
                if (window.Router) {
                    window.Router.navigate("/events");
                } else {
                    window.location.hash = "#/events";
                }
            });
        }
    }
}

if (!customElements.get("nc-event-page")) {
    customElements.define("nc-event-page", NcEventPage);
}

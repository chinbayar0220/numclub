import { getClubs, getEventById, registerEvent } from "./apiclient.js";

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

class NcEventRegistrationPage extends HTMLElement {
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
                <div class="muted">Loading registration...</div>
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
                <p class="muted">The event you are trying to register for does not exist.</p>
                <a class="action-link" data-navigate="/events" href="#/events">Back to events</a>
            </div>
        `;
    }

    render(event, club) {
        const clubName = club?.shortName || club?.name || "Unknown club";
        const schedule = formatRange(event.startsAt, event.endsAt);
        const eventId = event.id;
        const emailPrefill = window.AuthState?.currentUser || "";

        this.innerHTML = `
            <style>
                :host { display: block; }
                .page { padding: 32px 90px; }
                .card {
                    max-width: 520px;
                    margin: 0 auto;
                    border: 1px solid var(--border-color, #d3d3d3);
                    border-radius: 10px;
                    padding: 24px;
                    background: var(--card-bg, #fff);
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .title {
                    font-size: 24px;
                    margin: 0;
                }
                .meta {
                    color: var(--text-secondary, #666);
                    font-size: 14px;
                }
                .form-field {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .form-field label {
                    font-size: 14px;
                    font-weight: 500;
                }
                .form-field input {
                    height: 36px;
                    padding: 0 12px;
                    border-radius: 8px;
                    border: 1px solid #d1d5db;
                    font-size: 14px;
                    background: var(--input-bg, #fff);
                    color: var(--input-text, #000);
                }
                .actions {
                    display: flex;
                    gap: 12px;
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
                .status {
                    font-size: 14px;
                    color: var(--text-secondary, #666);
                }
                @media (max-width: 700px) {
                    .page { padding: 24px; }
                }
            </style>
            <div class="page">
                <div class="card">
                    <h2 class="title">Register for event</h2>
                    <div class="meta">${escapeHtml(event.title || "Untitled event")}</div>
                    <div class="meta">Club: ${escapeHtml(clubName)}</div>
                    <div class="meta">Schedule: ${escapeHtml(schedule)}</div>

                    <form id="registerForm">
                        <div class="form-field">
                            <label for="email">Email</label>
                            <input id="email" name="email" type="email" required value="${escapeHtml(emailPrefill)}" />
                        </div>
                        <div class="actions">
                            <button class="btn primary" type="submit">Submit registration</button>
                            <button class="btn" type="button" id="backBtn">Back</button>
                        </div>
                    </form>
                    <div class="status" id="status"></div>
                </div>
            </div>
        `;

        const form = this.querySelector("#registerForm");
        const emailInput = this.querySelector("#email");
        const statusEl = this.querySelector("#status");
        const backBtn = this.querySelector("#backBtn");

        if (backBtn) {
            backBtn.addEventListener("click", () => {
                if (window.Router) {
                    window.Router.navigate(`/event/${eventId}`);
                } else {
                    window.location.hash = `#/event/${eventId}`;
                }
            });
        }

        if (form) {
            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                const email = emailInput?.value.trim();
                if (!email) {
                    if (statusEl) statusEl.textContent = "Email is required.";
                    return;
                }
                if (statusEl) statusEl.textContent = "Submitting registration...";
                const result = await registerEvent({ eventId, email });
                if (result.code !== 200) {
                    if (statusEl) statusEl.textContent = "Registration failed. Please try again.";
                    return;
                }
                if (statusEl) statusEl.textContent = "Registered successfully.";
            });
        }
    }
}

if (!customElements.get("nc-event-registration-page")) {
    customElements.define("nc-event-registration-page", NcEventRegistrationPage);
}

import { getClubRequests, getSavedEvents, getUserProfile, saveUserProfile } from "./apiclient.js";

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

class NcUserProfilePage extends HTMLElement {
    constructor() {
        super();
        this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    connectedCallback() {
        this.render();
        this.bindEvents();
        this.loadProfile();
        this.loadRequests();
        this.loadSavedEvents();
    }

    render() {
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
                    gap: 32px;
                }
                .user_card {
                    display: flex;
                    flex-direction: row;
                    gap: 5%;
                    align-items: flex-start;
                    background-color: var(--color-white);
                    padding: 48px 90px;
                    width: flex;
                }
                .profile_picture{
                    flex-shrink: 0;
                }
                .profile_picture img {
                    width: 250px;
                    height: 250px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 1px solid var(--border-color);
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
                    width: auto;
                    flex-shrink: 0;
                    margin-left: auto;
                }
                .profile-edit-toggle {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border: 1px solid var(--border-color, #d1d5db);
                    background: var(--color-white, #fff);
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-primary, #111827);
                    cursor: pointer;
                    padding: 0;
                }
                .profile-edit-toggle svg {
                    width: 18px;
                    height: 18px;
                }
                .profile-edit-toggle.is-active {
                    background: #111827;
                    color: #fff;
                    border-color: #111827;
                }
                .profile-edit-toggle:disabled {
                    background: #f3f4f6;
                    color: #9ca3af;
                    border-color: #e5e7eb;
                    cursor: not-allowed;
                }
                .profile-edit {
                    margin: 0 90px;
                    padding: 24px 32px;
                    background: var(--color-white);
                    border: 1px solid var(--border-color, #e5e7eb);
                    border-radius: 12px;
                }
                .profile-edit.is-hidden {
                    display: none;
                }
                .profile-edit h2 {
                    margin: 0 0 8px 0;
                    font-size: 20px;
                }
                .profile-edit .hint {
                    margin: 0 0 16px 0;
                    color: var(--text-secondary, #6b7280);
                    font-size: 14px;
                }
                .profile-form {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .form-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 12px 16px;
                }
                .form-field {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .form-field label {
                    font-size: 14px;
                    color: var(--text-secondary, #6b7280);
                }
                .form-field input,
                .form-field textarea {
                    padding: 8px 10px;
                    border-radius: 8px;
                    border: 1px solid var(--border-color, #d1d5db);
                    background: var(--input-bg, #fff);
                    color: var(--input-text, #111827);
                    font-size: 14px;
                }
                .form-field textarea {
                    resize: vertical;
                    min-height: 90px;
                }
                .form-actions {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .form-actions button {
                    padding: 10px 16px;
                    border-radius: 8px;
                    border: 1px solid var(--border-color, #d1d5db);
                    background: #111827;
                    color: #fff;
                    cursor: pointer;
                }
                .form-actions button:disabled {
                    background: #9ca3af;
                    border-color: #9ca3af;
                    cursor: not-allowed;
                }
                .form-message {
                    font-size: 14px;
                }
                .form-message.success {
                    color: #107d4e;
                }
                .form-message.error {
                    color: #b42318;
                }
                .club_requests {
                    padding: 0 90px;
                }
                .events_section {
                    padding: 0 90px;
                }
            </style>

            <div class="main">
                <nc-usercard id="profileCard"></nc-usercard>

                <section class="profile-edit is-hidden" id="profileEditSection">
                    <h2>Профайл засах</h2>
                    <p class="hint" id="profileHint"></p>
                    <form id="profileForm" class="profile-form">
                        <div class="form-grid">
                            <div class="form-field">
                                <label for="profileName">Овог нэр</label>
                                <input id="profileName" name="profileName" type="text" />
                            </div>
                            <div class="form-field">
                                <label for="profileEmail">И-мэйл</label>
                                <input id="profileEmail" name="profileEmail" type="email" disabled />
                            </div>
                            <div class="form-field">
                                <label for="profileSchool">Сургууль</label>
                                <input id="profileSchool" name="profileSchool" type="text" />
                            </div>
                            <div class="form-field">
                                <label for="profileMajor">Мэргэжил</label>
                                <input id="profileMajor" name="profileMajor" type="text" />
                            </div>
                            <div class="form-field">
                                <label for="profileYear">Түвшин</label>
                                <input id="profileYear" name="profileYear" type="text" />
                            </div>
                            <div class="form-field">
                                <label for="profilePhone">Утас</label>
                                <input id="profilePhone" name="profilePhone" type="text" />
                            </div>
                            <div class="form-field">
                                <label for="profileAvatar">Зураг (URL)</label>
                                <input id="profileAvatar" name="profileAvatar" type="url" />
                            </div>
                        </div>
                        <div class="form-field">
                            <label for="profileBio">Танилцуулга</label>
                            <textarea id="profileBio" name="profileBio"></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="submit">Хадгалах</button>
                            <span id="profileMessage" class="form-message"></span>
                        </div>
                    </form>
                </section>

                <div class="club_requests" id="clubs">
                    <h2>Таны элсэх хүсэлт явуулсан клубууд</h2>
                    <div class="requests" id="userRequests"></div>
                    <p id="userRequestsEmpty" style="display:none; color: var(--text-secondary, #6b7280); margin-top: 12px;"></p>
                </div>
                <section class="events_section" id="savedEventsSection">
                    <h2>&#1061;&#1072;&#1076;&#1075;&#1072;&#1083;&#1089;&#1072;&#1085; &#1101;&#1074;&#1077;&#1085;&#1090;&#1199;&#1199;&#1076;</h2>
                    <section class="events" id="savedEventsList"></section>
                    <p id="savedEventsEmpty" style="display:none; color: var(--text-secondary, #6b7280); margin-top: 12px;"></p>
                </section>
            </div>
        `;
    }

    bindEvents() {
        const form = this.querySelector("#profileForm");
        if (form) {
            form.addEventListener("submit", this.handleProfileSubmit);
        }
        this.addEventListener("click", this.handleToggleClick);
    }

    handleToggleClick(event) {
        const button = event.target.closest(".profile-edit-toggle");
        if (!button || !this.contains(button) || button.disabled) {
            return;
        }
        this.toggleEditSection();
    }

    setEditSectionOpen(isOpen) {
        const section = this.querySelector("#profileEditSection");
        if (!section) return;
        section.classList.toggle("is-hidden", !isOpen);

        const button = this.querySelector(".profile-edit-toggle");
        if (button) {
            button.classList.toggle("is-active", isOpen);
            button.setAttribute("aria-pressed", isOpen ? "true" : "false");
            if (!button.disabled) {
                button.title = isOpen ? "Засвар хаах" : "Профайл засах";
            }
        }
    }

    toggleEditSection() {
        const section = this.querySelector("#profileEditSection");
        if (!section) return;
        const shouldOpen = section.classList.contains("is-hidden");
        this.setEditSectionOpen(shouldOpen);
        if (shouldOpen) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    syncEditButtonState(enabled) {
        const button = this.querySelector(".profile-edit-toggle");
        if (!button) return;
        button.disabled = !enabled;
        if (!enabled) {
            button.title = "Нэвтэрч орно уу";
            button.setAttribute("aria-pressed", "false");
            button.classList.remove("is-active");
        } else {
            const section = this.querySelector("#profileEditSection");
            const isOpen = section ? !section.classList.contains("is-hidden") : false;
            button.title = isOpen ? "Засвар хаах" : "Профайл засах";
            button.setAttribute("aria-pressed", isOpen ? "true" : "false");
            button.classList.toggle("is-active", isOpen);
        }
    }

    setProfileMessage(text, type) {
        const message = this.querySelector("#profileMessage");
        if (!message) return;
        message.textContent = text || "";
        message.classList.remove("success", "error");
        if (type) {
            message.classList.add(type);
        }
    }

    setFormDisabled(disabled) {
        const form = this.querySelector("#profileForm");
        if (!form) return;
        const elements = form.querySelectorAll("input, textarea, button");
        elements.forEach((el) => {
            if (el.id === "profileEmail") {
                el.disabled = true;
            } else {
                el.disabled = disabled;
            }
        });
    }

    setProfileCard(profile, email) {
        const card = this.querySelector("#profileCard");
        if (!card) return;
        const fallbackName = email ? email.split("@")[0] : "";
        const displayName = profile?.name || fallbackName || "Таны нэр";
        const avatarUrl = profile?.avatarUrl || profile?.avatar_url || "";

        const setOrRemove = (attr, value) => {
            if (value && String(value).trim()) {
                card.setAttribute(attr, String(value).trim());
            } else {
                card.removeAttribute(attr);
            }
        };

        card.setAttribute("uname", displayName);
        setOrRemove("school", profile?.school);
        setOrRemove("major", profile?.major);
        setOrRemove("year", profile?.year);
        setOrRemove("phone", profile?.phone);
        setOrRemove("bio", profile?.bio);
        setOrRemove("avatar", avatarUrl);

        this.syncEditButtonState(Boolean(email));
    }

    fillProfileForm(profile, email) {
        const setValue = (selector, value) => {
            const input = this.querySelector(selector);
            if (input) {
                input.value = value || "";
            }
        };

        setValue("#profileName", profile?.name || "");
        setValue("#profileEmail", email || "");
        setValue("#profileSchool", profile?.school || "");
        setValue("#profileMajor", profile?.major || "");
        setValue("#profileYear", profile?.year || "");
        setValue("#profilePhone", profile?.phone || "");
        setValue("#profileAvatar", profile?.avatarUrl || profile?.avatar_url || "");
        setValue("#profileBio", profile?.bio || "");
    }

    async loadProfile() {
        const email = window.AuthState?.currentUser;
        const hint = this.querySelector("#profileHint");
        this.setProfileMessage("");

        if (!email) {
            if (hint) {
                hint.textContent = "Профайл засахын тулд нэвтэрч орно уу.";
            }
            this.setEditSectionOpen(false);
            this.setFormDisabled(true);
            this.setProfileCard(null, null);
            return;
        }

        this.setFormDisabled(false);
        if (hint) {
            hint.textContent = "Мэдээллээ шинэчилж хадгалаарай.";
        }

        let profile = {};
        const result = await getUserProfile(email);
        if (result.code === 200 && result.data?.profile) {
            profile = result.data.profile;
        } else if (result.code !== 404) {
            this.setProfileMessage("Профайл ачаалж чадсангүй.", "error");
        }

        const fallbackName = email.split("@")[0] || email;
        if (!profile.name) {
            profile.name = fallbackName;
        }

        this.fillProfileForm(profile, email);
        this.setProfileCard(profile, email);
    }

    async handleProfileSubmit(event) {
        event.preventDefault();
        const email = window.AuthState?.currentUser;
        if (!email) {
            this.setProfileMessage("Нэвтэрч орно уу.", "error");
            return;
        }

        const getValue = (selector) => {
            const input = this.querySelector(selector);
            return input && input.value ? input.value.trim() : "";
        };

        const payload = {
            email,
            name: getValue("#profileName"),
            school: getValue("#profileSchool"),
            major: getValue("#profileMajor"),
            year: getValue("#profileYear"),
            phone: getValue("#profilePhone"),
            avatarUrl: getValue("#profileAvatar"),
            bio: getValue("#profileBio")
        };

        const result = await saveUserProfile(payload);
        if (result.code !== 200 || !result.data?.profile) {
            this.setProfileMessage("Хадгалах үед алдаа гарлаа.", "error");
            return;
        }

        this.setProfileMessage("Амжилттай хадгаллаа.", "success");
        this.fillProfileForm(result.data.profile, email);
        this.setProfileCard(result.data.profile, email);
    }
    buildEventCard(event, { showRegister = false } = {}) {
        const eventId = event.id ?? "";
        const title = escapeHtml(event.title || "\u042D\u0432\u0435\u043D\u0442\u0438\u0439\u043D \u043D\u044D\u0440");
        const description = escapeHtml(event.description || "");
        const dateLabel = formatDateTime(event.startsAt) || "";
        const location = event.location || "";
        const metaLine = [dateLabel, location].filter(Boolean).join(" | ");
        const clubName = event.clubShortName || event.clubName || "";
        const clubLogo = event.clubLogo || "images/club_logo.svg";
        const eventImage = event.imageUrl || "images/event.png";
        const priceValue = event.price != null ? String(event.price) : "";
        const registerText = "\u0411\u04AF\u0440\u0442\u0433\u04AF\u04AF\u043B\u044D\u0445";
        const detailsText = "\u0414\u044D\u043B\u0433\u044D\u0440\u044D\u043D\u0433\u04AF\u0439";

        return `
            <nc-eventcard
                data-event-id="${escapeHtml(eventId)}"
                ename="${title}"
                date="${escapeHtml(metaLine)}"
                desc="${description}"
                price="${escapeHtml(priceValue)}"
                club-name="${escapeHtml(clubName)}"
                club-logo="${escapeHtml(clubLogo)}"
                event-image="${escapeHtml(eventImage)}"
                ${showRegister ? `btn1=\"${registerText}\"` : ""}
                btn2="${detailsText}">
            </nc-eventcard>
        `;
    }

    async loadSavedEvents() {
        const list = this.querySelector("#savedEventsList");
        const empty = this.querySelector("#savedEventsEmpty");
        if (!list || !empty) return;

        const email = window.AuthState?.currentUser;
        if (!email) {
            list.innerHTML = "";
            empty.textContent = "\u041D\u044D\u0432\u0442\u044D\u0440\u0447 \u0431\u0430\u0439\u0436 \u0445\u0430\u0434\u0433\u0430\u043B\u0441\u0430\u043D \u044D\u0432\u0435\u043D\u0442\u04AF\u04AF\u0434\u044D\u044D \u0445\u0430\u0440\u043D\u0430.";
            empty.style.display = "block";
            return;
        }

        const result = await getSavedEvents(email);
        if (result.code !== 200 || !result.data) {
            list.innerHTML = "";
            empty.textContent = "\u0425\u0430\u0434\u0433\u0430\u043B\u0441\u0430\u043D \u044D\u0432\u0435\u043D\u0442\u04AF\u04AF\u0434\u0438\u0439\u0433 \u0430\u0447\u0430\u0430\u043B\u043B\u0430\u0445\u0430\u0434 \u0430\u043B\u0434\u0430\u0430 \u0433\u0430\u0440\u043B\u0430\u0430.";
            empty.style.display = "block";
            return;
        }

        const events = result.data.events || [];
        if (events.length === 0) {
            list.innerHTML = "";
            empty.textContent = "\u0425\u0430\u0434\u0433\u0430\u043B\u0441\u0430\u043D \u044D\u0432\u0435\u043D\u0442 \u0431\u0430\u0439\u0445\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430.";
            empty.style.display = "block";
            return;
        }

        empty.style.display = "none";
        list.innerHTML = events.map((event) => this.buildEventCard(event)).join("");
    }

    async loadRequests() {
        const list = this.querySelector("#userRequests");
        const empty = this.querySelector("#userRequestsEmpty");
        if (!list || !empty) return;

        const email = window.AuthState?.currentUser;
        if (!email) {
            list.innerHTML = "";
            empty.textContent = "Нэвтэрч орсны дараа таны хүсэлтүүд харагдана.";
            empty.style.display = "block";
            return;
        }

        const result = await getClubRequests({ email });
        if (result.code !== 200 || !result.data) {
            list.innerHTML = "";
            empty.textContent = "Хүсэлтүүдийг ачаалж чадсангүй.";
            empty.style.display = "block";
            return;
        }

        const requests = result.data.requests || [];
        if (requests.length === 0) {
            list.innerHTML = "";
            empty.textContent = "Одоогоор илгээсэн хүсэлт алга.";
            empty.style.display = "block";
            return;
        }

        empty.style.display = "none";
        list.innerHTML = "";

        requests.forEach((req) => {
            const card = document.createElement("nc-clubrequestcard");
            card.setAttribute("cname", req.clubName || `Клуб #${req.club_id}`);
            if (req.clubLogo) card.setAttribute("logo", req.clubLogo);
            if (req.status) card.setAttribute("status", req.status);
            list.appendChild(card);
        });
    }
}

window.customElements.define('nc-user-profile-page', NcUserProfilePage);




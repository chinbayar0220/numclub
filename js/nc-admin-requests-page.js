import { decideClubRequest, getClubRequests, getClubs } from "./apiclient.js";

const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (ch) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
    })[ch]);

class NcAdminRequestsPage extends HTMLElement {
    constructor() {
        super();
        this.loadRequests = this.loadRequests.bind(this);
    }

    connectedCallback() {
        if (window.AuthState?.currentRole !== "admin") {
            this.renderNoAccess();
            return;
        }
        this.render();
        this.bindEvents();
        this.loadClubs();
        this.loadRequests();
    }

    renderNoAccess() {
        this.innerHTML = `
            <style>
                :host { display: block; }
                .no-access {
                    padding: 64px 90px;
                    text-align: center;
                    color: var(--text-secondary, #6b7280);
                }
                .no-access h2 {
                    margin: 0 0 12px 0;
                    color: var(--text-primary, #111827);
                }
                .no-access button {
                    margin-top: 16px;
                    padding: 10px 16px;
                    border-radius: 8px;
                    border: 1px solid var(--border-color, #e5e7eb);
                    background: #111827;
                    color: #fff;
                    cursor: pointer;
                }
            </style>
            <div class="no-access">
                <h2>Админаар нэвтэрнэ үү</h2>
                <div>Энэ хуудас зөвхөн админ хэрэглэгчид зориулсан.</div>
                <button onclick="window.location.hash='#/login'">Нэвтрэх</button>
            </div>
        `;
    }

    render() {
        this.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .admin-wrap {
                    padding: 32px 90px 64px;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }
                .toolbar {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .toolbar h2 {
                    margin: 0;
                    font-size: 24px;
                }
                .filters {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                    align-items: center;
                }
                .filters label {
                    font-size: 14px;
                    color: var(--text-secondary, #6b7280);
                }
                select, button {
                    padding: 8px 10px;
                    border-radius: 8px;
                    border: 1px solid var(--border-color, #e5e7eb);
                    background: #fff;
                    font-size: 14px;
                }
                .requests {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .request-card {
                    border: 1px solid var(--border-color, #e5e7eb);
                    border-radius: 12px;
                    background: #fff;
                    padding: 16px 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .request-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    justify-content: space-between;
                }
                .club-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .club-info img {
                    width: 48px;
                    height: 48px;
                    border-radius: 10px;
                    object-fit: cover;
                    border: 1px solid var(--border-color, #e5e7eb);
                }
                .club-name {
                    font-weight: 600;
                }
                .meta {
                    font-size: 12px;
                    color: var(--text-secondary, #6b7280);
                }
                .status {
                    padding: 4px 8px;
                    border-radius: 999px;
                    font-size: 12px;
                    font-weight: 600;
                    background: #f3f4f6;
                    color: #374151;
                }
                .status.approved {
                    background: #e8f7ee;
                    color: #107d4e;
                }
                .status.rejected {
                    background: #fdecec;
                    color: #b42318;
                }
                .fields {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 12px;
                }
                .field span {
                    display: block;
                    font-size: 12px;
                    color: var(--text-secondary, #6b7280);
                    margin-bottom: 4px;
                }
                .field p {
                    margin: 0;
                    font-size: 14px;
                }
                .actions {
                    display: flex;
                    gap: 10px;
                }
                .btn-approve {
                    background: #111827;
                    color: #fff;
                    border-color: #111827;
                }
                .btn-reject {
                    background: #fff;
                }
                .empty {
                    color: var(--text-secondary, #6b7280);
                    font-size: 14px;
                }
            </style>

            <div class="admin-wrap">
                <div class="toolbar">
                    <h2>Клубын элсэлтийн хүсэлтүүд</h2>
                    <div class="filters">
                        <label for="clubFilter">Клуб</label>
                        <select id="clubFilter">
                            <option value="">Бүх клуб</option>
                        </select>
                        <label for="statusFilter">Төлөв</label>
                        <select id="statusFilter">
                            <option value="">Бүгд</option>
                            <option value="pending">Хүлээгдэж байна</option>
                            <option value="approved">Зөвшөөрсөн</option>
                            <option value="rejected">Татгалзсан</option>
                        </select>
                        <button id="refreshBtn">Дахин ачаалах</button>
                    </div>
                </div>

                <div class="requests" id="requestList">
                    <p class="empty">Ачаалж байна...</p>
                </div>
            </div>
        `;
    }

    bindEvents() {
        const clubFilter = this.querySelector("#clubFilter");
        const statusFilter = this.querySelector("#statusFilter");
        const refreshBtn = this.querySelector("#refreshBtn");
        const requestList = this.querySelector("#requestList");

        clubFilter?.addEventListener("change", this.loadRequests);
        statusFilter?.addEventListener("change", this.loadRequests);
        refreshBtn?.addEventListener("click", this.loadRequests);

        requestList?.addEventListener("click", async (event) => {
            const button = event.target.closest("button[data-action]");
            if (!button) return;
            const requestId = button.getAttribute("data-id");
            const action = button.getAttribute("data-action");
            if (!requestId || !action) return;

            button.disabled = true;
            const status = action === "approve" ? "approved" : "rejected";
            const decidedBy = window.AuthState?.currentUser || null;

            const result = await decideClubRequest(requestId, { status, decidedBy });
            if (result.code !== 200) {
                alert("Хүсэлтийг шинэчилж чадсангүй.");
            }
            await this.loadRequests();
        });
    }

    async loadClubs() {
        const clubFilter = this.querySelector("#clubFilter");
        if (!clubFilter) return;

        const result = await getClubs();
        const clubs = result.data?.clubs || [];
        const options = ['<option value="">Бүх клуб</option>'];
        clubs.forEach((club) => {
            const name = club.name || club.shortName || `Клуб ${club.id}`;
            options.push(`<option value="${club.id}">${name}</option>`);
        });
        clubFilter.innerHTML = options.join("");
    }

    async loadRequests() {
        const list = this.querySelector("#requestList");
        const clubFilter = this.querySelector("#clubFilter");
        const statusFilter = this.querySelector("#statusFilter");
        if (!list) return;

        const clubId = clubFilter?.value || "";
        const status = statusFilter?.value || "";
        const result = await getClubRequests({
            clubId: clubId || undefined,
            status: status || undefined
        });

        if (result.code !== 200 || !result.data) {
            list.innerHTML = `<p class="empty">Хүсэлтүүдийг ачаалж чадсангүй.</p>`;
            return;
        }

        const requests = result.data.requests || [];
        if (requests.length === 0) {
            list.innerHTML = `<p class="empty">Хүсэлт байхгүй байна.</p>`;
            return;
        }

        const statusLabels = {
            pending: "Хүлээгдэж байна",
            approved: "Зөвшөөрсөн",
            rejected: "Татгалзсан"
        };

        list.innerHTML = requests.map((req) => {
            const statusText = statusLabels[req.status] || req.status;
            const logo = req.clubLogo || "images/club_logo.svg";
            const clubName = escapeHtml(req.clubName || `Клуб #${req.club_id}`);
            const email = escapeHtml(req.email || "-");
            const phone = req.phone ? `· ${escapeHtml(req.phone)}` : "";
            const reason = escapeHtml(req.reason || "-");
            const impact = escapeHtml(req.impact || "-");
            const description = escapeHtml(req.description || "-");
            const disabled = req.status === "approved" || req.status === "rejected";
            return `
                <div class="request-card">
                    <div class="request-header">
                        <div class="club-info">
                            <img src="${logo}" alt="${clubName}">
                            <div>
                                <div class="club-name">${clubName}</div>
                                <div class="meta">${email} ${phone}</div>
                            </div>
                        </div>
                        <span class="status ${req.status}">${statusText}</span>
                    </div>
                    <div class="fields">
                        <div class="field">
                            <span>Шалтгаан</span>
                            <p>${reason}</p>
                        </div>
                        <div class="field">
                            <span>Нөлөө</span>
                            <p>${impact}</p>
                        </div>
                        <div class="field">
                            <span>Тайлбар</span>
                            <p>${description}</p>
                        </div>
                    </div>
                    <div class="actions">
                        <button class="btn-approve" data-action="approve" data-id="${req.id}" ${disabled ? "disabled" : ""}>Зөвшөөрөх</button>
                        <button class="btn-reject" data-action="reject" data-id="${req.id}" ${disabled ? "disabled" : ""}>Татгалзах</button>
                    </div>
                </div>
            `;
        }).join("");
    }
}

window.customElements.define("nc-admin-requests-page", NcAdminRequestsPage);

// Global auth state management
window.AuthState = {
    isLoggedIn: false,
    currentUser: null,
    currentRole: "user",

    init() {
        // Check if user is already logged in from localStorage
        const saved = localStorage.getItem('user_session');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.isLoggedIn = data.isLoggedIn || false;
                this.currentUser = data.currentUser || null;
                this.currentRole = data.currentRole || "user";
            } catch (err) {
                console.error('Error parsing user_session:', err);
            }
        }
    },

    login(email, role = "user") {
        this.isLoggedIn = true;
        this.currentUser = email;
        this.currentRole = role || "user";
        localStorage.setItem('user_session', JSON.stringify({
            isLoggedIn: true,
            currentUser: email,
            currentRole: this.currentRole
        }));
        this.notifyListeners();
    },

    logout() {
        this.isLoggedIn = false;
        this.currentUser = null;
        this.currentRole = null;
        localStorage.removeItem('user_session');
        this.notifyListeners();
    },

    listeners: [],

    subscribe(callback) {
        this.listeners.push(callback);
    },

    notifyListeners() {
        this.listeners.forEach(callback => callback());
    }
};

// Initialize on page load
window.AuthState.init();

class NcNavbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        // Subscribe to auth state changes
        window.AuthState.subscribe(() => this.render());
    }

    render() {
        const { isLoggedIn, currentUser, currentRole } = window.AuthState;
        const isAdminView = isLoggedIn && currentRole === 'admin';

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
                    background: transparent;
                    border: none;
                    color: var(--text-primary, #000);
                    cursor: pointer;
                    text-decoration: none;
                    font-size: 14px;
                    border-radius: 6px;
                    transition: background 0.2s ease;
                }
                a.btn:hover {
                    background: var(--hover-bg, #f0f0f0);
                }
                button.btn1 {
                    background: var(--color-white, #fff);
                    border: 1px solid var(--border-color, #d1d5db);
                    color: var(--text-primary, #000);
                }
                button.btn1:hover {
                    background: var(--bg-secondary, #f5f5f5);
                }
                button.btn2 {
                    background: #2c2c2c;
                    border: 1px solid #2c2c2c;
                    color: white;
                }
                button.btn2:hover {
                    background: #3a3a3a;
                    border-color: #3a3a3a;
                }
                .user-menu {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .user-email {
                    font-size: 14px;
                    color: var(--text-secondary, #666);
                }
                .user-icon {
                    width: 36px;
                    height: 36px;
                    cursor: pointer;
                    transition: opacity 0.2s ease;
                    flex-shrink: 0;
                }
                .user-icon:hover {
                    opacity: 0.7;
                }
                .user-icon img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            </style>
            <nav>
                ${isAdminView ? `
                    <button class="btn2" onclick="window.location.hash='#/admin/requests'">Элсэлтийн хүсэлтүүд</button>
                    <button class="btn1" onclick="window.AuthState.logout(); window.Router.navigate('/');">Гарах</button>
                ` : `
                    <a class="btn" href="#/clubs">Клуб</a>
                    <a class="btn" href="#/events">Эвент</a>
                    <theme-toggle></theme-toggle>

                    ${isLoggedIn ? `
                        <div class="user-menu">
                            <div class="user-icon" onclick="window.location.hash='#/user-profile'" title="${currentUser}">
                                <img src="images/user_icon.svg" alt="User Profile">
                            </div>
                            <button class="btn1" onclick="window.AuthState.logout(); window.Router.navigate('/');">Гарах</button>
                        </div>
                    ` : `
                        <button class="btn1" onclick="window.location.hash='#/login'">Нэвтрэх</button>
                        <button class="btn2" onclick="window.location.hash='#/signup'">Бүртгүүлэх</button>
                    `}
                `}
            </nav>
        `;
    }
}

customElements.define('nc-navbar', NcNavbar);

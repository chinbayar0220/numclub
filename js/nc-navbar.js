// Global auth state management
window.AuthState = {
    isLoggedIn: false,
    currentUser: null,

    init() {
        // Check if user is already logged in from localStorage
        const saved = localStorage.getItem('user_session');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.isLoggedIn = data.isLoggedIn || false;
                this.currentUser = data.currentUser || null;
            } catch (err) {
                console.error('Error parsing user_session:', err);
            }
        }
    },

    login(email) {
        this.isLoggedIn = true;
        this.currentUser = email;
        localStorage.setItem('user_session', JSON.stringify({
            isLoggedIn: true,
            currentUser: email
        }));
        this.notifyListeners();
    },

    logout() {
        this.isLoggedIn = false;
        this.currentUser = null;
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
        const { isLoggedIn, currentUser } = window.AuthState;

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
                    border: 1px solid var(--border-color);
                    background: transparent;
                    color: var(--text-primary, #000);
                    cursor: pointer;
                    text-decoration: none;
                    font-size: 14px;
                    border-radius: 6px;
                    transition: background 0.2s ease;
                    white-space: nowrap;
                    min-width: fit-content;
                    box-sizing: border-box;
                }
                a.btn {
                    border: none;
                }
                a.btn:hover, button.btn1:hover {
                    background: var(--color-gray, #f0f0f0);
                }
                button.btn2 {
                    background: #1e1e1e;
                    color: white;
                    border-color: #1e1e1e;
                }
                button.btn2:hover {
                    background: var(--color-secondary);
                }
                .user-menu {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .user-profile-icon {
                    width: 32px;
                    height: 32px;
                    cursor: pointer;
                    border-radius: 50%;
                    transition: opacity 0.2s ease;
                }
                .user-profile-icon:hover {
                    opacity: 0.8;
                }
            </style>

            <nav>
                <a class="btn" href="#/clubs">Клуб</a>
                <a class="btn" href="#/events">Эвент</a>
                <!-- <theme-toggle></theme-toggle> -->

                ${isLoggedIn ? `
                    <div class="user-menu">
                        <img src="images/userprofile.svg" alt="User Profile" class="user-profile-icon" onclick="window.location.hash='#/user-profile'">
                        <button class="btn1" onclick="window.AuthState.logout(); window.Router.navigate('/');">Гарах</button>
                    </div>
                ` : `
                    <button class="btn1" onclick="window.location.hash='#/login'">Нэвтрэх</button>
                    <button class="btn2" onclick="window.location.hash='#/register'">Бүртгүүлэх</button>
                `}
            </nav>
        `;
    }
}

customElements.define('nc-navbar', NcNavbar);

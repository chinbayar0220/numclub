class ThemeToggle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Initialize theme from localStorage or system preference
        const savedTheme = localStorage.getItem('theme') || this.getSystemTheme();
        this.setTheme(savedTheme);

        this.render();
        this.shadowRoot.querySelector('button').addEventListener('click', () => this.toggleTheme());
    }

    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    render() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const isDark = currentTheme === 'dark';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --accent: --var(--border-color);
                }

                button {
                    background: none;
                    border: 1px solid var(--border-color, #e0e0e0);
                    padding: 6px 12px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    transition: all 0.3s ease;
                    color: var(--text-primary, #333);
                }

                button:hover {
                    border-color: var(--accent);
                    color: var(--accent);
                }

                svg {
                    width: 18px;
                    height: 18px;
                    stroke-width: 2;
                }
            </style>

            <button aria-label="Toggle dark/light mode" title="${isDark ? 'Light mode' : 'Dark mode'}">
                ${isDark ? 
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>' :
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
                }
            </button>
        `;
    }
}

if (!customElements.get('theme-toggle')) {
    customElements.define('theme-toggle', ThemeToggle);
}

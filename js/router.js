class Router {
    constructor() {
        // Define route patterns and associated component tags
        // Use patterns with optional :param segments for dynamic routes
        this.routes = [
            { pattern: '/', component: 'nc-main-page' },
            { pattern: '/clubs', component: 'nc-clubs-page' },
            { pattern: '/events', component: 'nc-events-page' },
            { pattern: '/user-profile', component: 'nc-user-profile-page' },
            { pattern: '/admin/requests', component: 'nc-admin-requests-page' },
            { pattern: '/register', component: 'nc-reg-page' },
            { pattern: '/signup', component: 'nc-signup' },
            { pattern: '/login', component: 'nc-login' },
            { pattern: '/club/:id', component: 'nc-club-profile-page' },
            { pattern: '/event/:id', component: 'nc-event-page' },
            { pattern: '/event/:id/register', component: 'nc-event-registration-page' },
            { pattern: '/club/:id/request', component: 'nc-req-page' }
        ];

        this.currentComponent = null;
        this.container = null;
    }

    init(containerSelector = '#app') {
        this.container = document.querySelector(containerSelector);
        if (!this.container) {
            console.error(`Container ${containerSelector} not found`);
            return;
        }

        // Support both anchor clicks and hash changes
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-navigate]');
            if (link) {
                e.preventDefault();//html boliulj,spa
                const path = link.getAttribute('data-navigate');
                this.navigate(path);
            }
        });

        // When hash changes (e.g., location.hash = '#/login')
        window.addEventListener('hashchange', () => {
            this.loadFromLocation();
        });

        // Handle back/forward for history API
        window.addEventListener('popstate', () => {
            this.loadFromLocation();
        });

        // Load initial route
        this.loadFromLocation();
    }

    // normalize location: use hash if present, otherwise pathname
    getCurrentPath() {
        if (window.location.hash && window.location.hash.length > 0) {
            // remove leading '#'
            return window.location.hash.slice(1) || '/';
        }
        return window.location.pathname || '/';
    }

    navigate(path) {
        // If using hash-style, update hash, otherwise use history
        if (path.startsWith('#')) {
            window.location.hash = path;
        } else if (path.startsWith('/')) {
            // prefer hash navigation to keep static hosting simple
            window.location.hash = path;
        } else {
            window.location.hash = `/${path}`;
        }
        // loadFromLocation will be called by hashchange listener
    }

    loadFromLocation() {
        const path = this.getCurrentPath();
        this.loadPage(path);
    }

    // match a path against patterns like /club/:id
    matchRoute(path) {
        // normalize trailing slash
        const normalized = path.replace(/\/$/, '') || '/';

        for (const route of this.routes) {
            const pattern = route.pattern;
            if (pattern === normalized) {
                return{ component: route.component, params: {} };
            }

            // dynamic segment
            const patternParts = pattern.split('/').filter(Boolean);
            const pathParts = normalized.split('/').filter(Boolean);
            if (patternParts.length !== pathParts.length) continue;

            let matched = true;
            const params = {};
            for (let i = 0; i < patternParts.length; i++) {
                const p = patternParts[i];
                const pp = pathParts[i];//ehnii hesgiig avnaa
                if (p.startsWith(':')) {
                    const name = p.slice(1);// : avch id bolgono 
                    params[name] = decodeURIComponent(pp);
                } else if (p === pp) { //tuuniiig end jishne
                    continue;
                } else {
                    matched = false;//buhel route taarahgui 
                    break;
                }
            }

            if (matched) {
                return { component: route.component, params };
            }
        }

        return null;
    }

    loadPage(path) {
        if (window.AuthState?.currentRole === 'admin' && path !== '/admin/requests') {
            window.location.hash = '/admin/requests';
            return;
        }
        const match = this.matchRoute(path);
        if (!match) {
            // no match — go home
            if (this.getCurrentPath() !== '/') {
                window.location.hash = '/';
            }
            return;
        }

        const componentName = match.component;

        // Remove old component
        if (this.currentComponent) {
            this.currentComponent.remove();
            this.currentComponent = null;
        }

        // Create and insert new component
        const component = document.createElement(componentName);
        // attach params as attributes
        for (const [k, v] of Object.entries(match.params)) {
            component.setAttribute(k, v);
        }

        this.container.appendChild(component);
        this.currentComponent = component;

        window.scrollTo(0, 0);
    }
}

// Export for use in other modules
window.Router = new Router();

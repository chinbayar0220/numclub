class Router {
    constructor() {
        this.routes = {
            '/': 'nc-main-page',
            '/clubs': 'nc-clubs-page',
            '/user-profile': 'nc-user-profile-page',
            '/registration': 'nc-registration-page',
            '/club-profile': 'nc-club-profile-page'
        };
        this.currentComponent = null;
        this.container = null;
    }

    init(containerSelector = '#app') {
        this.container = document.querySelector(containerSelector);
        if (!this.container) {
            console.error(`Container ${containerSelector} not found`);
            return;
        }

        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-navigate]');
            if (link) {
                e.preventDefault();
                const path = link.getAttribute('data-navigate');
                this.navigate(path);
            }
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            this.loadPage(window.location.pathname);
        });

        // Load initial page
        this.loadPage(window.location.pathname);
    }

    navigate(path) {
        // Update URL without page reload
        window.history.pushState(null, '', path);
        this.loadPage(path);
    }

    loadPage(path) {
        // Default to home if path is root
        const route = path === '/' ? '/' : path;
        const componentName = this.routes[route];

        if (!componentName) {
            // Route not found, go to home
            this.navigate('/');
            return;
        }

        // Remove old component
        if (this.currentComponent) {
            this.currentComponent.remove();
        }

        // Create and insert new component
        const component = document.createElement(componentName);
        this.container.appendChild(component);
        this.currentComponent = component;

        // Scroll to top
        window.scrollTo(0, 0);
    }
}

// Export for use in other modules
window.Router = new Router();

class NcClubsPage extends HTMLElement {
    constructor() {
        super();
        this.currentPage = 1;
        this.totalPages = 1;
        this.filters = {
            search: '',
            direction: '',
            school: ''
        };
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .main {
                    display: flex;
                    flex-direction: row;
                    padding: 28px 90px;
                    gap: 5%;
                }
                .content {
                    display: flex;
                    flex-direction: column;
                    gap: 28px;
                    width: 75%;
                }
                
                @media (max-width: 768px) {
                    .main {
                        flex-direction: column;
                        padding: 20px;
                    }
                    .content {
                        width: 100%;
                    }
                }
                .search {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 16px;
                    width: 100%;
                    height: fit-content;
                }
                .search form {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    width: 100%;
                }
                .search input[type="search"] {
                    padding: 10px 16px;
                    border: 1px solid #d3d3d3;
                    border-radius: 20px;
                    width: 320px;
                    height: 40px;
                    font-size: medium;
                    max-width: 100%;
                }
                .radioff {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                    margin-left: 16px;
                }
                .radio {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .radio input[type="radio"] {
                    position: absolute;
                    opacity: 0;
                    width: 0;
                    height: 0;
                }
                .radio label {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 12px;
                    border: 1px solid var(--color-secondary);
                    border-radius: 8px;
                    cursor: pointer;
                    background: var(--color-white);
                    color: var(--color-secondary);
                    user-select: none;
                }
                .radio input[type="radio"]:checked + label {
                    background: var(--color-default);
                    color: #ffffff;
                    border-color: var(--color-default);
                }
                .radio label:hover {
                    background: var(--color-gray);
                }
                .clubs {
                    display: grid;
                    grid-template-rows: auto auto auto;
                    grid-template-columns: auto auto auto;
                    gap: 28px;
                    margin: auto;
                }
                .pagination {
                    display: none;
                    justify-content: center;
                    align-items: center;
                    gap: 12px;
                    padding: 32px 16px;
                }
                .pagination-previous,
                .pagination-next {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 12px;
                    height: fit-content;
                    border: 1px solid var(--border-color);
                    border-radius: 6px;
                    background-color: var(--card-bg);
                    color: var(--text-primary);
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    user-select: none;
                }
                .pagination-previous:hover,
                .pagination-next:hover {
                    background-color: var(--bg-secondary);
                }
                .pagination-previous.disabled,
                .pagination-next.disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    pointer-events: none;
                }
                .pagination-previous img,
                .pagination-next img {
                    width: 16px;
                    height: 12px;
                    filter: var(--img-filter, none);
                }
                .pagination-list {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .pagination-page,
                .element-wrapper {
                    min-width: 24px;
                    min-height: 24px;
                    height: fit-content;
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    background-color: var(--card-bg);
                    color: var(--text-primary);
                    font-size: 14px;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    padding: 4px 8px;
                }
                .pagination-page {
                    background-color: var(--color-default);
                    color: var(--color-white);
                    border-color: var(--color-default);
                }
                .element-wrapper:hover {
                    background-color: var(--bg-secondary);
                }
                .pagination-gap {
                    padding: 0 4px;
                    color: var(--text-secondary);
                    font-size: 14px;
                    user-select: none;
                }
            </style>

            <div class="main">
                <nc-clubs-sidebar></nc-clubs-sidebar>

                <div class="content">
                    <div class="search">
                        <form id="searchForm" action="#" method="get">
                            <input type="search" id="searchInput" placeholder="Хайх" name="search">
                            <div class="radioff" role="radiogroup" aria-label="Sort order">
                                <div class="radio">
                                    <input id="sort-az" type="radio" name="sortOrder" value="az">
                                    <label for="sort-az">A-Я</label>
                                </div>
                                <div class="radio">
                                    <input id="sort-za" type="radio" name="sortOrder" value="za">
                                    <label for="sort-za">Я-А</label>
                                </div>
                            </div>
                        </form>
                    </div>

                    <nc-clubs-list id="clubs"></nc-clubs-list>

                    <div class="pagination" id="pagination"></div>
                </div>
            </div>
        `;
        
        this.initializeEventListeners();
        this.loadClubs();
    }

    initializeEventListeners() {
        // Search form
        const searchForm = this.querySelector('#searchForm');
        const searchInput = this.querySelector('#searchInput');
        
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.filters.search = searchInput.value.trim();
                this.currentPage = 1;
                this.loadClubs();
            });
        }

        // Real-time search (optional - debounced)
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.filters.search = e.target.value.trim();
                    this.currentPage = 1;
                    this.loadClubs();
                }, 500);
            });
        }

        // Listen to filter changes from sidebar
        window.addEventListener('filter-changed', (e) => {
            this.filters = { ...this.filters, ...e.detail };
            this.currentPage = 1;
            this.loadClubs();
        });
    }

    async loadClubs() {
        try {
            const clubsList = this.querySelector('#clubs');
            if (clubsList) {
                clubsList.innerHTML = '<p style="text-align:center; padding:20px;">Ачааллаж байна...</p>';
            }

            // Import the API client
            const { getClubs } = await import('./apiclient.js');
            
            const params = {
                page: this.currentPage,
                limit: 9,
                ...this.filters
            };

            const response = await getClubs(params);
            
            if (response.code === 200) {
                this.totalPages = response.totalPages || 1;
                this.renderClubs(response.data);
                this.renderPagination();
            } else {
                if (clubsList) {
                    clubsList.innerHTML = '<p style="text-align:center; padding:20px; color:red;">Клубуудыг ачаалахад алдаа гарлаа</p>';
                }
            }
        } catch (error) {
            console.error('Load clubs error:', error);
            const clubsList = this.querySelector('#clubs');
            if (clubsList) {
                clubsList.innerHTML = '<p style="text-align:center; padding:20px; color:red;">Алдаа гарлаа</p>';
            }
        }
    }

    renderClubs(clubs) {
        const clubsList = this.querySelector('#clubs');
        if (!clubsList) return;

        if (clubs.length === 0) {
            clubsList.innerHTML = '<p style="text-align:center; padding:20px;">Клуб олдсонгүй</p>';
            return;
        }

        // Dispatch event with clubs data for nc-clubs-list component
        clubsList.setAttribute('data-clubs', JSON.stringify(clubs));
        const event = new CustomEvent('clubs-loaded', { detail: clubs });
        clubsList.dispatchEvent(event);
    }

    renderPagination() {
        const pagination = this.querySelector('#pagination');
        if (!pagination) return;

        if (this.totalPages <= 1) {
            pagination.style.display = 'none';
            return;
        }

        pagination.style.display = 'flex';
        
        let html = '';
        
        // Previous button
        html += `
            <div class="pagination-previous ${this.currentPage === 1 ? 'disabled' : ''}" 
                 data-page="${this.currentPage - 1}">
                <img src="images/Arrow Left.svg" alt="Previous" />
                Өмнөх
            </div>
            <div class="pagination-list">
        `;

        // Page numbers
        const maxVisible = 5;
        let startPage = Math.max(1, this.currentPage - 2);
        let endPage = Math.min(this.totalPages, startPage + maxVisible - 1);

        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        if (startPage > 1) {
            html += `<div class="element-wrapper" data-page="1">1</div>`;
            if (startPage > 2) {
                html += `<div class="pagination-gap">...</div>`;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            const className = i === this.currentPage ? 'pagination-page' : 'element-wrapper';
            html += `<div class="${className}" data-page="${i}">${i}</div>`;
        }

        if (endPage < this.totalPages) {
            if (endPage < this.totalPages - 1) {
                html += `<div class="pagination-gap">...</div>`;
            }
            html += `<div class="element-wrapper" data-page="${this.totalPages}">${this.totalPages}</div>`;
        }

        html += `
            </div>
            <div class="pagination-next ${this.currentPage === this.totalPages ? 'disabled' : ''}" 
                 data-page="${this.currentPage + 1}">
                Дараагийн
                <img src="images/Arrow Right.svg" alt="Next" />
            </div>
        `;

        pagination.innerHTML = html;

        // Add click event listeners
        pagination.querySelectorAll('[data-page]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = parseInt(e.currentTarget.getAttribute('data-page'));
                if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
                    this.currentPage = page;
                    this.loadClubs();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    }
}

window.customElements.define('nc-clubs-page', NcClubsPage);

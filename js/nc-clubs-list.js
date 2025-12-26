import { getClubs } from "./apiclient.js";
class NcClubsList extends HTMLElement {
    constructor(){
        super();
        this.clubsData = [];
    }

    async connectedCallback(){
        // Listen for clubs-loaded event from parent
        this.addEventListener('clubs-loaded', (e) => {
            if (e.detail && Array.isArray(e.detail)) {
                this.clubsData = e.detail;
                this.renderClubs();
            }
        });

        // Also fetch clubs if not provided by parent
        let items = [];
        const result = await getClubs();
        // Handle different response structures
        if (result.data && Array.isArray(result.data)) {
            items = result.data;
        } else if (result.data && result.data.clubs && Array.isArray(result.data.clubs)) {
            items = result.data.clubs;
        } else if (result.clubs && Array.isArray(result.clubs)) {
            items = result.clubs;
        }
        
        console.log('Clubs data:', items);
        
        if (items && items.length > 0) {
            this.clubsData = items;
            this.renderClubs();
        } else if (this.clubsData.length === 0) {
            this.innerHTML = '<p style="text-align:center; padding:20px;">Клуб олдсонгүй</p>';
        }
    }

    renderClubs() {
        const items = this.clubsData;
        
        if (!items || items.length === 0) {
            this.innerHTML = '<p style="text-align:center; padding:20px;">Клуб олдсонгүй</p>';
            return;
        }

        const container = document.createElement('div');
        container.className = 'clubs';

        items.forEach((it, idx) => {
            console.log("Club item:", it);
            const el = document.createElement('nc-clubcard');
            
            // Map database fields to component attributes
            const clubName = it.cname || it.name || '';
            const clubDesc = it.description || it.desc || '';
            const clubImg = it.logo || it.img || 'images/clubs/default.png';
            
            if (clubName) el.setAttribute('cname', clubName);
            if (clubDesc) el.setAttribute('desc', clubDesc);
            el.setAttribute('img', clubImg);
            
            const clubId = it._id || it.id || String(idx + 1);
            el.setAttribute('club-id', clubId);
            el.setAttribute('data-index', String(idx));
            el.setAttribute('tabindex', '0');
            
            el.addEventListener('click', () => {
                const detail = { index: idx, cname: clubName, id: clubId };
                this.dispatchEvent(new CustomEvent('club-select', { detail, bubbles: true }));
            });
            
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const detail = { index: idx, cname: clubName, id: clubId };
                    this.dispatchEvent(new CustomEvent('club-select', { detail, bubbles: true }));
                }
            });
            
            container.appendChild(el);
        });

        this.innerHTML = '';
        this.appendChild(container);
    }
}

if (!customElements.get('nc-clubs-list')) {
    customElements.define('nc-clubs-list', NcClubsList);
}

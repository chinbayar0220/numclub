class NcClubsPage extends HTMLElement {
    constructor() {
        super();
        this.clubsData = [];
        this.filteredClubs = [];
    }

    connectedCallback() {
        this.render();
        this.loadClub();
    }
    render(){
        this.innerHTML ={

        }
    }

    loadClub(){
        const data = fetch(('./json/Club.json'));
        this.clubsData = data.
    }
    

    disconnectedCallback() {
        
    }

    attributeChangedCallback(name, oldVal, newVal) {
        
    }

    adoptedCallback() {
        
    }

}

window.customElements.define('nc-clubs-page', NcClubsPage);
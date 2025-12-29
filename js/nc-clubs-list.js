import { getClubs } from "./apiclient.js";

class NcClubsList extends HTMLElement {
    constructor(){
        super();
        this.items = [];
        this.filters = null;
    }

    async connectedCallback(){
        const result = await getClubs();
        this.items = (result && result.data && result.data.clubs) ? result.data.clubs : [];
        this.render();
    }

    filter(filters){
        this.filters = filters;
        this.render();
    }

    render(){
        let clubsToShow = this.items;
        const activeDirections = [];
        const activeSchools = [];

        if (this.filters) {
            this.filters.directions.forEach((checked, id) => {
                if (checked) activeDirections.push(id);
            });
            this.filters.surguuli.forEach((checked, id) => {
                if (checked) activeSchools.push(id);
            });
        }

        if (activeDirections.length > 0) {
            clubsToShow = clubsToShow.filter((club) => {
                const directions = club.directions || [];
                return directions.some((dir) => activeDirections.includes(dir));
            });
        }
        if (activeSchools.length > 0) {
            clubsToShow = clubsToShow.filter((club) => {
                return activeSchools.includes(club.school);
            });
        }

        const container = document.createElement("div");
        container.className = "clubs";

        clubsToShow.forEach((club, idx) => {
            const el = document.createElement("nc-clubcard");
            const name = club.cname || club.name || club.shortName || "Club name";
            const desc = club.desc || club.description || "";
            const img = club.img || club.logo || "";
            const clubId = club.id || String(idx + 1);

            el.setAttribute("cname", name);
            if (desc) el.setAttribute("desc", desc);
            if (img) el.setAttribute("img", img);
            el.setAttribute("club-id", clubId);
            el.setAttribute("data-index", String(idx));
            el.setAttribute("tabindex", "0");
            el.addEventListener("click", () => {
                const detail = { index: idx, cname: name, id: club.id || null };
                this.dispatchEvent(new CustomEvent("club-select", { detail, bubbles: true }));
            });
            el.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    this.dispatchEvent(new CustomEvent("club-select", { detail: { index: idx, cname: name, id: club.id || null }, bubbles: true }));
                }
            });
            container.appendChild(el);
        });

        this.innerHTML = "";
        this.appendChild(container);
    }
}

if (!customElements.get("nc-clubs-list")) {
    customElements.define("nc-clubs-list", NcClubsList);
}

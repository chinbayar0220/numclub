const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (ch) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
    })[ch]);

const getAttrValue = (element, name) => {
    const value = element.getAttribute(name);
    return value && value.trim() ? value.trim() : "";
};

class NcUsercard extends HTMLElement {
    static get observedAttributes() {
        return ["uname", "name", "school", "major", "year", "phone", "bio", "ubio", "avatar"];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        if (this.isConnected) {
            this.render();
        }
    }

    render() {
        const rawName = getAttrValue(this, "uname") || getAttrValue(this, "name");
        const displayName = rawName || "Таны нэр";
        const nameParts = displayName.split(/\s+/);
        const primaryName = nameParts.shift() || displayName;
        const secondaryName = nameParts.join(" ");

        const school = getAttrValue(this, "school") || "Сургууль";
        const major = getAttrValue(this, "major") || "Мэргэжил";
        const year = getAttrValue(this, "year") || "Түвшин";
        const phone = getAttrValue(this, "phone") || "Утас";
        const bio = getAttrValue(this, "bio") || getAttrValue(this, "ubio") || "Профайл танилцуулга оруулаагүй байна.";
        const avatar = getAttrValue(this, "avatar") || "images/user_profile.png";

        const primaryHtml = escapeHtml(primaryName);
        const secondaryHtml = secondaryName ? ` ${escapeHtml(secondaryName)}` : "";

        this.innerHTML = `
        <div class="user_card">
            <div class="profile_picture">
                <img src="${escapeHtml(avatar)}" alt="Хэрэглэгчийн зураг"/>
            </div>

            <div class="info">
                <h1><span class="highlight">${primaryHtml}</span>${secondaryHtml}</h1>
                <div class="user_identity">
                    <div class="border">
                        <img src="images/Book.svg" width="16" height="16" alt="Book Icon"/>
                        <p class="border">${escapeHtml(school)}</p>
                    </div>
                    <div class="border">
                        <img src="images/Briefcase.svg" width="16" height="16" alt="Briefcase Icon"/>
                        <p class="border">${escapeHtml(major)}</p>
                    </div>
                    <div class="border">
                        <img src="images/Briefcase.svg" width="16" height="16" alt="Briefcase Icon"/>
                        <p class="border">${escapeHtml(year)}</p>
                    </div>
                    <div class="border">
                        <img src="images/Phone.svg" width="16" height="16" alt="Phone Icon"/>
                        <p class="border">${escapeHtml(phone)}</p>
                    </div>
                </div>
                <p class="desc">${escapeHtml(bio)}</p>
            </div>
            <div class="url">
                <button class="profile-edit-toggle" type="button" title="Профайл засах" aria-label="Профайл засах">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M4 16.5V20h3.5L18.8 8.7l-3.5-3.5L4 16.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path>
                        <path d="M14.7 5.2l3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
                    </svg>
                </button>
                <a href="https://www.facebook.com/enhjinn.g" target="_blank"><img src="images/fb_icon.svg" width="36" height="36" alt="facebook Icon"/></a>
                <a href="https://www.facebook.com/enhjinn.g" target="_blank"><img src="images/ig_icon.svg" width="36" height="36" alt="instagram Icon"/></a>
                <a href="https://www.facebook.com/enhjinn.g" target="_blank"><img src="images/linkedin_icon.svg" width="36" height="36" alt="linkedin Icon"/></a>
            </div>
        </div> `;
    }
}

window.customElements.define('nc-usercard', NcUsercard);

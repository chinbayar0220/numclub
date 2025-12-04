class NcForm extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const id = this.getAttribute('id') || '1';
        const name = this.getAttribute('name') || '1';
        const label = this.getAttribute('label') || 'Чиглэл';
        const type = this.getAttribute('type') || 'checkbox';
        
        this.innerHTML=`
        <label>${label}
            <input type="${type}" value="${id}">
        </label>`;
    }
}

window.customElements.define('nc-form', NcForm);
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
        <input type="${type}" id="option${id}" name="${name}" value="yes">
        <label for="${id}">${label}</label>`;
    }
}

window.customElements.define('nc-form', NcForm);
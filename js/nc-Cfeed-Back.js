class NcCfeedBack extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML=`<article>
                    <img src="images/Rating.svg" alt="">
                    <div id="review">
                        <h3>Review title</h3>
                        <p>Review body</p>
                    </div>
                    <div id="comment-tt">
                        <div><img src="images/comIMG.svg" alt=""></div>
                        <div>
                            <h5>Hackum student club</h5>
                            <p>Э.Чинбаяр</p>
                        </div>
                    </div>
                </article>`
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
    }

}

window.customElements.define('nc-cfeed-back', NcCfeedBack);
class NcUsercard extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {  
        const username = this.getAttribute('uname') || 'User Name';
        const userrole = this.getAttribute('urole') || 'Member';
        const userbio = this.getAttribute('ubio') || 'Энд хэрэглэгчийн товч танилцуулга бичигдэнэ.';


        this.innerHTML=`
        <div class="user_card">
            <img src="images/user_profile.svg" width="260" height="260" alt="User Profile Image" style="border-radius: 50%; border: 1px solid var(--color-gray); background-color: var(--color-gray)"/>
            <div class="info">
                <h1><span class="highlight">Гантулга</span> Энхжин</h1>
                <div class="user_identity">
                    <div class="border">
                        <img src="images/Book.svg" width="16" height="16" alt="Book Icon"/>
                        <p class="border">МТЭС-МКУТ</p>
                    </div>
                    <div class="border">
                        <img src="images/Briefcase.svg" width="16" height="16" alt="Briefcase Icon"/>
                        <p class="border">Компьютерын Ухаан</p>
                    </div>
                    <div class="border">
                        <img src="images/Briefcase.svg" width="16" height="16" alt="Briefcase Icon"/>
                        <p class="border">3-р түвшин</p>
                    </div>
                    <div class="border">
                        <img src="images/Phone.svg" width="16" height="16" alt="Phone Icon"/>
                        <p class="border">МТЭС-МКУТ</p>
                    </div>
                </div>
                <div class="registered_clubs">
                    <div class="club_name">
                        <img src="images/club_logo.svg" width="24" height="24" alt="Club Icon"/>
                        <h4>Hackum students club</h4>
                    </div>
                    <div class="club_name">
                        <img src="images/club_logo.svg" width="24" height="24" alt="Club Icon"/>
                        <h4>Hackum students club</h4>   
                    </div>
                </div> 
                <p class="desc">Мэдээллийн технологийн чиглэлээр үйл ажиллагаа явуулдаг бөгөөд оюутнуудын мэдлэгийг дээшлүүлэх, практик ур чадвар олгох, инновац бүтээхэд чиглэсэн үйл ажиллагаа явуулдаг</p> 
                <details>
                    <summary>
                        Дэлгэрэнгүй
                    </summary>
                    <p class="desc">
                        Бүүр дэлгэрэнгүй био
                    </p>
                </details>
            </div>
            <div class="url">
                <a href ="https://www.facebook.com/enhjinn.g" target="_blank"><img src="images/FB Icon Button.svg" width="36" height="36" alt="facebook Icon"/></a>
                <a href ="https://www.facebook.com/enhjinn.g" target="_blank"><img src="images/IG Icon Button.svg" width="36" height="36" alt="instagram Icon"/></a>
                <a href ="https://www.facebook.com/enhjinn.g" target="_blank"><img src="images/Linkedin Icon Button.svg" width="36" height="36" alt="linkedin Icon"/></a>
            </div> 
        </div> `;
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
    }

}

window.customElements.define('nc-usercard', NcUsercard);
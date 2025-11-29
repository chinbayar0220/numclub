class NcUserProfilePage extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                main {
                    background-color: var(--color-gray);
                }
                .main {
                    display: flex;
                    flex-direction: column;
                    padding-top: 0px;
                    padding-bottom: 64px;
                }
                .user_card {
                    display: flex;
                    flex-direction: row;
                    gap: 5%;
                    align-items: flex-start;
                    background-color: var(--color-white);
                    padding: 28px 90px;
                    width: flex;
                }
                .profile_picture{
                    flex: 1 1 auto;
                    border-radius: 50%;
                    border: 1px solid var(--color-gray); 
                    background-color: var(--color-gray)"
                    width: 20%;
                }
                .info {
                    display: flex;
                    flex-direction: column;
                    gap: 0px;
                    width: 60%;
                }
                .user_identity {
                    display: flex;
                    gap: 8px;
                }
                .url{
                    display:flex;
                    flex-direction: row;
                    gap:8px;
                    width: 10%;
                }
            </style>

            <div class="main">
                <nc-usercard></nc-usercard>

                <div class="club_requests" id="clubs">
                    <h2>Таны элсэх хүсэлт явуулсан клубүүд</h2>
                    <div class="requests">
                        <nc-clubrequestcard></nc-clubrequestcard>
                        <nc-clubrequestcard></nc-clubrequestcard>
                        <nc-clubrequestcard></nc-clubrequestcard>
                    </div>
                </div>

                <section class="events_section" id="events">
                    <h2>Эвентүүд</h2>
                    <section class="events">
                        <nc-eventcard button1=""></nc-eventcard>
                        <nc-eventcard></nc-eventcard>
                        <nc-eventcard></nc-eventcard>
                    </section>
                </section>

                <div class="club_requests">
                    <h2>Хадгалсан</h2>
                    <div class="requests">
                        <nc-clubrequestcard desc="Мэдээллийн технологийн чиглэлээр үйл ажиллагаа явуулдаг бөгөөд оюутнуудын мэдлэгийг дээшлүүлэх, практик ур чадвар олгох, инновац бүтээхэд чиглэсэн үйл ажиллагаа явуулдаг"></nc-clubrequestcard>
                        <nc-clubrequestcard desc="Мэдээллийн технологийн чиглэлээр үйл ажиллагаа явуулдаг бөгөөд оюутнуудын мэдлэгийг дээшлүүлэх, практик ур чадвар олгох, инновац бүтээхэд чиглэсэн үйл ажиллагаа явуулдаг"></nc-clubrequestcard>
                        <nc-clubrequestcard desc="Мэдээллийн технологийн чиглэлээр үйл ажиллагаа явуулдаг бөгөөд оюутнуудын мэдлэгийг дээшлүүлэх, практик ур чадвар олгох, инновац бүтээхэд чиглэсэн үйл ажиллагаа явуулдаг"></nc-clubrequestcard>
                    </div>
                </div>

                <section class="events_section">
                    <h2>Таны бүртгүүлсэн эвентүүд</h2>
                    <section class="events">
                        <nc-eventcard></nc-eventcard>
                        <nc-eventcard></nc-eventcard>
                        <nc-eventcard></nc-eventcard>
                    </section>
                </section>
            </div>
        `;
    }
}

window.customElements.define('nc-user-profile-page', NcUserProfilePage);

class NcClubProfilePage extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                body {
                    display: grid;
                    grid-template-areas:
                        "hd"
                        "main"
                        "ft";
                    grid-template-rows: 100px 1fr 272px;
                    border: 1px solid black;
                }

                header {
                    grid-area: hd;
                    font-family: inter;
                }

                main {
                    grid-area: main;
                    border: 1px solid green;
                    background-color: #F5F5F5;
                }

                footer {
                    grid-area: ft;
                    border: 1px solid red;
                    padding: 32px;
                    >img{padding-bottom: 24px;}
                }
                header{
                    display: flex;
                    align-items: center;
                    justify-content:space-between;
                    margin: 32px 100px 32px 96px;
                }
                header nav{
                    display: flex;
                    gap: 16px;
                    align-items: center;
                }
                header nav a{
                    text-decoration: none;
                    color: #1e1e1e;
                    cursor: pointer;
                    padding: 8px;
                }

                header nav a:hover{
                    background-color: #F5F5F5;
                    border-radius: 8px;
                }
                main h2{
                    margin: 0;
                }
                main>article{
                    display: flex;
                    flex-wrap: wrap;
                    padding: 64px 100px;
                    gap: 64px;
                    justify-content: space-between;
                    background-color: white;
                    h1{
                        font-size: 48px;
                        font-weight: 700;
                        font-family: inter;
                        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
                        margin: 0px 0px 16px 0px ;
                    }
                    .hero-card{
                        display: flex;
                        flex-wrap: wrap; 
                        gap: 8px;
                        p{  
                        border: 1px solid black;
                        background-color: #2c2c2c;
                        color: aliceblue;
                        border-radius: 8px;
                        padding: 6px 8px;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        margin: 0px;
                        font-family: inter;
                        }
                    }
                    .hero-card p span img{
                        padding: 0px;
                        margin-right: 8px;   

                    }
                    details{
                        border: 1px solid #D9D9D9;
                        border-radius: 8px;
                        background-color: #F5F5F5;
                        min-height: 54px;
                        margin-bottom: 18px;
                    }
                    .details{
                        margin: 25px 26px 0px 0px;
                        font-family: inter;
                        summary{
                            padding: 16px;
                            font-weight: 600;
                            font-size: 16px;
                            list-style: none;
                            display: flex;
                            justify-content: space-between;
                        }
                        p{
                            margin-top: 0px;
                            padding-left: 16px;
                            padding-right: 16px;
                            font-size: 16px;
                        }
                    }
                    .details summary img{
                        transition: transform 0.3s ease;
                    }
                    .details details[open] summary img {
                        transform: rotate(180deg);
                        }
                    details[open]{
                        background-color: white;
                    }
                }

                .club-logo img{
                    height: 250px;
                    width: 250px;
                    border-radius: 150px;
                }
                .hero{
                    max-width: 666px;
                    width: 100%;
                }
                #Uil-ajillagaa{
                    padding: 64px 100px;
                    font-family: inter;
                    font-weight: 600;
                    h2{
                        margin: 0px;
                        font-size: 24px;
                    }
                }
                #Uil-ajillagaa>div{
                    display: flex;
                    gap: 25px;
                    flex-wrap: wrap;
                    margin-top: 24px;
                    p{
                        display: flex;
                        border: 1px solid #D9D9D9;
                        background-color: white;
                        width: 340.33px;
                        height: 32px;
                        border-radius: 8px;
                        align-items: center;
                        padding: 24px;
                        margin: 0px;
                        font-size: 16px;
                        box-shadow:  0 4px 4px rgba(0, 0, 0, 0.2);
                    }
                }
                .gishuun-elseh{
                    padding: 64px 100px ;
                    font-family: inter;
                    details{
                        color: #757575;
                    }
                    button{
                        width: 98%;
                        height: 40px;
                        border-radius: 8px;
                        color: white;
                        background-color: #1e1e1e;
                        margin-top: 48px;
                    }
                }
                .events{
                    padding: 64px 100px;
                }
                .events>div{
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    padding-top: 24px;
                    gap: 24px;
                }
                .events header{
                    margin:0px;
                    h4{
                        font-size: 16px;
                        font-weight: 600;
                    }
                }
                .event-card{
                    padding:16px;
                    border: 1px solid #D9D9D9;
                    background-color: white;
                    border-radius: 8px;
                    >img{
                        width: 100%;
                    }
                label{
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 8px;
                    h4{
                        font-weight: 600px;
                        font-size: 20px;
                        margin: 0;
                    }
                }
                }
                .comment {
                    padding: 64px 100px;
                    font-family: inter;
                }

                .comment h2 {
                    font-weight: 600;
                    margin: 0;
                }

                .comment h3 {
                    margin: 24px 0 0;
                }

                .comment > p {
                    margin: 10px 0 0 0;
                    color: #757575;
                }

                .comment-cards {
                    margin-top: 48px;
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 24px;
                }

                .comment-cards article {
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    background-color: white;
                    border: 1px solid #D9D9D9;
                    border-radius: 8px;
                }

                .comment-cards article > img {
                    width: 116px;
                    height: 20px;
                }

                .comment-cards article #review h3 {
                    margin: 0 0 4px 0;
                    font-size: 24px;
                }

                .comment-cards article #review p {
                    margin: 0;
                }

                .comment-cards article #comment-tt {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .comment-cards article #comment-tt h5 {
                    margin: 0;
                    font-size: 14px;
                    font-weight: 600;
                    color: #757575;
                }

                .comment-cards article #comment-tt p {
                    margin: 2px 0 0;
                    font-size: 12px;
                    color: #B3B3B3;
                }

                .comment-cards article #comment-tt img {
                    border: 1px solid #D9D9D9;
                    border-radius: 50%;
                }


                @media (max-width: 1024px) {
                    .comment {
                        padding: 48px 32px;
                    }
                    .comment-cards {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                    .events {
                        padding: 48px 32px;
                    }
                    .events>div{
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                }

                @media (max-width: 640px) {
                    .comment {
                        padding: 32px 16px;
                    }
                    .comment-cards {
                        grid-template-columns: 1fr;
                    }
                }

            </style>

            <main>
                <article>
                    <div class="club-logo">
                        <img src="images/club_logo.svg" alt="clubs logo">
                    </div>
                    <div class="hero">
                        <section>
                            <h1>Hackum students club</h1>
                            <article class="hero-card">
                                <p><span><img src="images/Book.svg" alt="">МТЭС-МКУТ</span></p>
                                <p><span><img src="images/Book.svg" alt="">Мэргэжлийн</span></p>
                                <p><span><img src="images/Book.svg" alt="">Мэдээллийн технологи</span></p>
                                <p><span><img src="images/Book.svg" alt="">Hackum@gmail.com</span></p>
                                <p><span><img src="images/Book.svg" alt="">МТЭС МКУТ</span></p>
                                <p><span><img src="images/Book.svg" alt="">МТЭС МКУТ</span></p>
                            </article>
                        </section>
                        <div class="details">
                            <details>
                                <summary>Зорилго <img src="images/Chevron up.svg" alt=""></summary>
                                <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet laoreet ipsum. Quisque pulvinar turpis vel lobortis efficitur. Duis nec auctor magna. Nullam tempor ligula nisl, in ultricies nisl commodo et.</p>
                            </details>
                            <details>
                                <summary>Алсын караа <img src="images/Chevron up.svg" alt=""></summary>
                                <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet laoreet ipsum. Quisque pulvinar turpis vel lobortis efficitur. Duis nec auctor magna. Nullam tempor ligula nisl, in ultricies nisl commodo et.</p>
                            </details>
                        </div>
                    </div>
                    <aside>
                        <div>
                            <img src="images/FB Icon Button.svg" alt="">
                            <img src="images/youtubeIcon.svg" alt="">
                            <img src="images/IG Icon Button.svg" alt="">
                            <img src="images/Linkedin Icon Button.svg" alt="">
                        </div>
                        <article>
                            <h5>гишүүд төгсөгчид</h5>
                            <img src="images/Shape.svg" alt="">
                        </article>
                    </aside>
                </article>

                <section id="Uil-ajillagaa">
                    <h2>Үйл ажиллагаа</h2>
                    <div>
                        <p>Tech meetup</p>
                        <p>Work shop</p>
                        <p>Knowledge day</p>
                        <p>Hackathon</p>
                        <p>Pitch nigth</p>
                        <p>Quiz night</p>
                    </div>
                </section>

                <section class="gishuun-elseh">
                    <h2>Гишүүнээр элсэх</h2>
                    <details>
                        <summary>шалгуурууд</summary>
                        <p>zuunnayaas deesh undurtei biyiin zuv galbirtai urt huruutai uhaantai geh zergeer</p>
                    </details>
                    <button>Гишүүнээр элсэх</button>
                </section>

                <section class="events">
                    <h2>Эвентүүд</h2>
                    <p>Таньд санал болгох</p>
                    <div>
                        <nc-Cevent-card></nc-Cevent-card>
                        <nc-Cevent-card></nc-Cevent-card>
                        <nc-Cevent-card></nc-Cevent-card>
                    </div>
                </section>

                <section class="comment">
                    <h2>Сэтгэгдэл</h2>
                    <p>Төгсөгчид үлдээсэн сэтгэгдэл</p>
                    <div class="comment-cards">
                        <nc-Cfeed-Back></nc-Cfeed-Back>
                        <nc-Cfeed-Back></nc-Cfeed-Back>
                        <nc-Cfeed-Back></nc-Cfeed-Back>
                        <nc-Cfeed-Back></nc-Cfeed-Back>
                        <nc-Cfeed-Back></nc-Cfeed-Back>
                        <nc-Cfeed-Back></nc-Cfeed-Back>
                    </div>
                </section>
            </main>
        `;
    }
}

window.customElements.define('nc-club-profile-page', NcClubProfilePage);
